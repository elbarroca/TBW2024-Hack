import { Elysia } from 'elysia';
import { Permission } from '../types/permissions';
import { auth } from '../middleware/auth';
import { 
  createCourse, 
  updateCourse, 
  deleteCourse, 
  publishCourse,
  getCourseWithModules 
} from '../db/course';
import { RequestUser } from '../types/request';

export const courseRoutes = new Elysia()
  .use(auth)
  .post(
    '/courses', 
    async ({ body, user }: { body: any, user: RequestUser }) => {
      const course = await createCourse({
        ...body,
        instructor_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      return course;
    },
  )
  .put(
    '/courses/:id', 
    async ({ params, body, user }: { 
      params: { id: string }, 
      body: any, 
      user: RequestUser 
    }) => {
      const course = await getCourseWithModules(params.id);
      if (!course) throw new Error('Course not found');

      if (course.instructor_id !== user.id && user.role !== 'admin') {
        throw new Error('Not authorized to update this course');
      }

      const updatedCourse = await updateCourse(params.id, {
        ...body,
        updated_at: new Date().toISOString()
      });

      return updatedCourse;
    },
  )
  .delete(
    '/courses/:id', 
    async ({ params, user }: { 
      params: { id: string }, 
      user: RequestUser 
    }) => {
      const course = await getCourseWithModules(params.id);
      if (!course) throw new Error('Course not found');

      if (course.instructor_id !== user.id && user.role !== 'admin') {
        throw new Error('Not authorized to delete this course');
      }

      const success = await deleteCourse(params.id);
      return { success };
    },
  )
  .post(
    '/courses/:id/publish', 
    async ({ params, user }: { 
      params: { id: string }, 
      user: RequestUser 
    }) => {
      const course = await getCourseWithModules(params.id);
      if (!course) throw new Error('Course not found');

      if (course.instructor_id !== user.id && user.role !== 'admin') {
        throw new Error('Not authorized to publish this course');
      }

      const success = await publishCourse(params.id);
      return { success };
    },
  );