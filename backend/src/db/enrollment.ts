import { Database } from "../types/db";
import { supabase } from "./client";

type Enrollment = Database['public']['Tables']['enrollments']['Row'];
type NewEnrollment = Database['public']['Tables']['enrollments']['Insert'];

export async function createEnrollment(enrollment: NewEnrollment): Promise<Enrollment | null> {
  const { data, error } = await supabase
    .from('enrollments')
    .insert([enrollment])
    .single();

  if (error) {
    console.error('Error creating enrollment:', error);
    return null;
  }

  return data;
}

export async function getEnrollmentById(id: string): Promise<Enrollment | null> {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      user:user_id(*),
      course:course_id(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching enrollment:', error);
    return null;
  }

  return data;
}

export async function getUserEnrollments(userId: string): Promise<Enrollment[]> {
  const { data, error } = await supabase
    .from('enrollments')
    .select(`
      *,
      course:course_id(*)
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user enrollments:', error);
    return [];
  }

  return data || [];
}

export async function updateEnrollmentProgress(
  enrollmentId: string, 
  progress: number
): Promise<boolean> {
  const { error } = await supabase
    .from('enrollments')
    .update({ 
      progress,
      last_accessed: new Date().toISOString(),
      ...(progress >= 100 ? { 
        status: 'completed',
        completed_at: new Date().toISOString()
      } : {})
    })
    .eq('id', enrollmentId);

  if (error) {
    console.error('Error updating enrollment progress:', error);
    return false;
  }

  return true;
}

export async function updateEnrollmentStatus(
  enrollmentId: string,
  status: 'active' | 'completed' | 'cancelled'
): Promise<boolean> {
  const { error } = await supabase
    .from('enrollments')
    .update({ 
      status,
      ...(status === 'completed' ? { completed_at: new Date().toISOString() } : {})
    })
    .eq('id', enrollmentId);

  if (error) {
    console.error('Error updating enrollment status:', error);
    return false;
  }

  return true;
} 