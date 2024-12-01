import type { BaseModel } from './db';
import type { User } from './user';
import type { Course } from './course';

export type EnrollmentStatus = 'active' | 'completed' | 'cancelled';

export interface Enrollment extends BaseModel {
  user_id: string;
  course_id: string;
  status: EnrollmentStatus;
  progress: number;
  payment_id: string | null;
  enrolled_at: string;
  completed_at: string | null;
  last_accessed: string | null;
  user?: User;
  course?: Course;
}

export type NewEnrollment = Omit<Enrollment, keyof BaseModel>;

export interface EnrollmentParams {
  id: string;
}

export interface UpdateEnrollmentProgressRequest {
  progress: number;
}

export interface UpdateEnrollmentStatusRequest {
  status: EnrollmentStatus;
}

export interface EnrollmentWithDetails extends Enrollment {
  user: User;
  course: Course;
}

export interface EnrollmentStats {
  total_enrollments: number;
  completed_courses: number;
  in_progress_courses: number;
  average_progress: number;
} 