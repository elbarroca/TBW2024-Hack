import { Elysia, t } from "elysia";
import { 
  createEnrollment, 
  getEnrollmentById, 
  getUserEnrollments,
  updateEnrollmentProgress,
  updateEnrollmentStatus 
} from "../db/enrollment";
import { Database } from "../types/db";
import { verifyAuth } from "../middleware/auth";
import type { RequestWithUser } from "../types/content";

// Schema definitions
const progressSchema = t.Object({
  progress: t.Number({ minimum: 0, maximum: 100 })
});

const statusSchema = t.Object({
  status: t.Union([
    t.Literal('active'),
    t.Literal('completed'),
    t.Literal('cancelled')
  ])
});

const enrollmentSchema = t.Object({
  user_id: t.String(),
  course_id: t.String(),
  payment_id: t.Optional(t.String())
});

const enrollmentRoutes = new Elysia({ prefix: '/enrollments' })
  .get("/enrollments/:id", async ({ params, request }: { 
    params: { id: string }, 
    request: RequestWithUser 
  }) => {
    const { id } = params;
    const enrollment = await getEnrollmentById(id);

    if (!enrollment) {
      return { error: "Enrollment not found", status: 404 };
    }

    // Check if user has access to this enrollment
    if (enrollment.user_id !== request.user?.id && request.user?.role !== 'admin') {
      return { error: "Unauthorized", status: 403 };
    }

    return { enrollment, status: 200 };
  })

  .get("/users/:userId/enrollments", async ({ 
    params, 
    request 
  }: { 
    params: { userId: string }, 
    request: RequestWithUser 
  }) => {
    // Check if user is requesting their own enrollments or is admin
    if (params.userId !== request.user?.id && request.user?.role !== 'admin') {
      return { error: "Unauthorized", status: 403 };
    }

    const enrollments = await getUserEnrollments(params.userId);
    return { enrollments, status: 200 };
  })

  .post("/enrollments", async ({ 
    body, 
    request 
  }: { 
    body: Database['public']['Tables']['enrollments']['Insert'],
    request: RequestWithUser 
  }) => {
    if (!request.user) {
      return { error: "Unauthorized", status: 401 };
    }

    const enrollment = await createEnrollment({
      ...body,
      user_id: request.user.id
    });

    if (!enrollment) {
      return { error: "Failed to create enrollment", status: 400 };
    }
    return { enrollment, status: 201 };
  }, {
    body: enrollmentSchema
  })

  .patch("/enrollments/:id/progress", async ({ 
    params, 
    body, 
    request 
  }: { 
    params: { id: string }, 
    body: { progress: number },
    request: RequestWithUser 
  }) => {
    const enrollment = await getEnrollmentById(params.id);
    if (!enrollment) {
      return { error: "Enrollment not found", status: 404 };
    }

    if (enrollment.user_id !== request.user?.id) {
      return { error: "Unauthorized", status: 403 };
    }
    
    const success = await updateEnrollmentProgress(params.id, body.progress);
    
    if (!success) {
      return { error: "Failed to update progress", status: 400 };
    }
    return { status: 200 };
  }, {
    body: progressSchema
  })

  .patch("/enrollments/:id/status", async ({ 
    params, 
    body, 
    request 
  }: { 
    params: { id: string }, 
    body: { status: 'active' | 'completed' | 'cancelled' },
    request: RequestWithUser 
  }) => {
    const enrollment = await getEnrollmentById(params.id);
    if (!enrollment) {
      return { error: "Enrollment not found", status: 404 };
    }

    // Only admin can change status
    if (request.user?.role !== 'admin') {
      return { error: "Unauthorized", status: 403 };
    }
    
    const success = await updateEnrollmentStatus(params.id, body.status);
    
    if (!success) {
      return { error: "Failed to update status", status: 400 };
    }
    return { status: 200 };
  }, {
    body: statusSchema
  });

export default enrollmentRoutes;