import { Elysia, t } from "elysia";
import { verifyAuth } from "../middleware/auth";
import {
  createCourse,
  getCourseWithModules,
  updateCourse,
  addModuleToCourse,
  addLessonToModule,
  updateModuleOrder,
  updateLessonOrder,
  publishCourse,
  deleteCourse
} from "../db/course";
import type { RequestWithUser } from "../types/content";

// Add handler context type
interface HandlerContext {
  request: RequestWithUser;
}

const courseSchema = t.Object({
  title: t.String(),
  description: t.String(),
  price: t.String(),
  currency: t.String(),
  duration: t.Number(),
  level: t.Union([
    t.Literal('beginner'),
    t.Literal('intermediate'),
    t.Literal('advanced')
  ]),
  categories: t.Array(t.String()),
  thumbnail_url: t.Optional(t.String())
});

const moduleSchema = t.Object({
  title: t.String(),
  description: t.String(),
  order_number: t.Number()
});

const lessonSchema = t.Object({
  title: t.String(),
  description: t.String(),
  content_type: t.String(),
  content_url: t.String(),
  duration: t.Number(),
  order_number: t.Number()
});

// Define the course input type
interface CourseInput {
  title: string;
  description: string;
  price: string;
  currency: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  categories: string[];
  thumbnail_url?: string;
}

export const courseRoutes = new Elysia({ prefix: '/courses' })
  .post("/",
    async ({ body, request }: { body: CourseInput, request: RequestWithUser }) => {
        if (!request.user) throw new Error('Unauthorized');
        
        const course = await createCourse({
          ...body as CourseInput,
          instructor_id: request.user.id,
          created_at: new Date().toISOString()
        });
        return { course, status: 201 };
      },
      {
        body: courseSchema,
        beforeHandle: ({ request }: HandlerContext) => {
          if (!request.user?.role || !['instructor', 'admin'].includes(request.user.role)) {
            throw new Error('Unauthorized');
          }
          //return checkPermission('create', 'courses');
        }
      })

    .get("/:id",
      async ({ params }) => {
        const course = await getCourseWithModules(params.id);
        if (!course) {
          return { error: "Course not found", status: 404 };
        }
        return { course, status: 200 };
      },
      {
        //beforeHandle: ({ request }: HandlerContext) => checkPermission('read', 'courses')
      })

    .put("/:id",
      async ({ params, body, request }: { params: { id: string }, body: CourseInput, request: RequestWithUser }) => {
        const course = await getCourseWithModules(params.id);
        if (!course) {
          return { error: "Course not found", status: 404 };
        }

        if (course.instructor_id !== request.user?.id && request.user?.role !== 'admin') {
          return { error: "Unauthorized", status: 403 };
        }

        const updated = await updateCourse(params.id, body as Partial<CourseInput>);
        return { course: updated, status: 200 };
      },
      {
        body: courseSchema,
        beforeHandle: ({ request }: HandlerContext) => {
          if (!request.user?.role || !['instructor', 'admin'].includes(request.user.role)) {
            throw new Error('Unauthorized');
          }
          //return checkPermission('update', 'courses');
        }
      })

    .post("/:id/publish",
      async ({ params, request }: { params: { id: string }, request: RequestWithUser }) => {
        const course = await getCourseWithModules(params.id);
        if (!course) {
          return { error: "Course not found", status: 404 };
        }

        if (course.instructor_id !== request.user?.id && request.user?.role !== 'admin') {
          return { error: "Unauthorized", status: 403 };
        }

        const success = await publishCourse(params.id);
        return { success, status: 200 };
      },
      {
        beforeHandle: ({ request }: HandlerContext) => {
          if (!request.user?.role || !['instructor', 'admin'].includes(request.user.role)) {
            throw new Error('Unauthorized');
          }
          //return checkPermission('update', 'courses');
        }
      })
