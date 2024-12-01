import { Elysia, t } from "elysia";
import { 
  createContent, 
  getContentById, 
  updateContent, 
  deleteContent,
  uploadContentFile,
  addContentCategories
} from "../db/content";
import type { CreateContentRequest, ContentParams, RequestWithUser } from "../types/content";
import { verifyAuth } from "../middleware/auth";

const createContentSchema = t.Object({
  title: t.String(),
  description: t.String(),
  type: t.Union([
    t.Literal('video'),
    t.Literal('text'),
    t.Literal('article'),
    t.Literal('ebook'),
    t.Literal('research_paper'),
    t.Literal('file')
  ]),
  price: t.Number(),
  currency: t.String(),
  categories: t.Optional(t.Array(t.String())),
  metadata: t.Optional(t.Record(t.String(), t.Any()))
});

export const contentRoutes = new Elysia()
  .use(verifyAuth)
  .group("/content", app => app
    .post("/upload", async ({ body, request }: { 
      body: CreateContentRequest, 
      request: RequestWithUser 
    }) => {
      try {
        const userId = request.user?.id;
        if (!userId) {
          return { error: "Unauthorized", status: 401 };
        }

        // Upload file and get URL
        const fileUrl = await uploadContentFile(body.file);
        let thumbnailUrl = null;
        if (body.thumbnail) {
          thumbnailUrl = await uploadContentFile(body.thumbnail, 'thumbnails');
        }

        // Create content record
        const contentData = {
          title: body.title,
          description: body.description,
          creator_id: userId,
          type: body.type,
          file_url: fileUrl,
          thumbnail_url: thumbnailUrl,
          price: body.price,
          currency: body.currency,
          metadata: body.metadata || null,
          published: false
        };

        const content = await createContent(contentData);
        if (!content) {
          return { error: "Failed to create content", status: 500 };
        }

        // Add categories if provided
        if (body.categories?.length) {
          await addContentCategories(content.id, body.categories);
        }

        return { content, status: 201 };
      } catch (error: any) {
        return { error: error.message, status: 500 };
      }
    }, {
      body: createContentSchema
    })

    .get("/:id", async ({ params }: { params: ContentParams }) => {
      try {
        const content = await getContentById(params.id);
        if (!content) {
          return { error: "Content not found", status: 404 };
        }
        return { content, status: 200 };
      } catch (error: any) {
        return { error: error.message, status: 500 };
      }
    })

    .delete("/:id", async ({ 
      params, 
      request 
    }: { 
      params: ContentParams, 
      request: RequestWithUser 
    }) => {
      try {
        const content = await getContentById(params.id);
        if (!content) {
          return { error: "Content not found", status: 404 };
        }

        if (content.creator_id !== request.user?.id && request.user?.role !== 'admin') {
          return { error: "Unauthorized", status: 403 };
        }

        const success = await deleteContent(params.id);
        if (!success) {
          return { error: "Failed to delete content", status: 500 };
        }

        return { status: 200 };
      } catch (error: any) {
        return { error: error.message, status: 500 };
      }
    })
  );
