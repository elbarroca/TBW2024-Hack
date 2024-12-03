import { Database } from "../types/db";
import { supabase } from "./client";

type ProgressTracking = Database['public']['Tables']['progress_tracking']['Row'];
type NewProgressTracking = Database['public']['Tables']['progress_tracking']['Insert'];

export async function createProgressTracking(
  progress: NewProgressTracking
): Promise<ProgressTracking | null> {
  const { data, error } = await supabase
    .from('progress_tracking')
    .insert([progress])
    .single();

  if (error) {
    console.error('Error creating progress tracking:', error);
    return null;
  }

  return data;
}

export async function getEnrollmentProgress(
  enrollmentId: string
): Promise<ProgressTracking[]> {
  const { data, error } = await supabase
    .from('progress_tracking')
    .select('*')
    .eq('enrollment_id', enrollmentId);

  if (error) {
    console.error('Error fetching progress:', error);
    return [];
  }

  return data || [];
}

export async function updateLessonProgress(
  enrollmentId: string,
  lessonId: string,
  progress: number,
  lastPosition?: number
): Promise<boolean> {
  const progressData: NewProgressTracking = {
    enrollment_id: enrollmentId,
    lesson_id: lessonId,
    progress_percentage: progress,
    last_position: lastPosition !== undefined ? lastPosition : null,
    status: progress >= 100 ? 'completed' : 'in_progress',
    completed_at: progress >= 100 ? new Date().toISOString() : null
  };

  const { error } = await supabase
    .from('progress_tracking')
    .upsert(progressData, {
      onConflict: 'enrollment_id,lesson_id'
    });

  if (error) {
    console.error('Error updating lesson progress:', error);
    return false;
  }

  return true;
}

export async function getLessonProgress(
  enrollmentId: string,
  lessonId: string
): Promise<ProgressTracking | null> {
  const { data, error } = await supabase
    .from('progress_tracking')
    .select('*')
    .eq('enrollment_id', enrollmentId)
    .eq('lesson_id', lessonId)
    .single();

  if (error) {
    console.error('Error fetching lesson progress:', error);
    return null;
  }

  return data;
}

export async function getModuleProgress(
  enrollmentId: string,
  moduleId: string
): Promise<ProgressTracking[]> {
  const { data, error } = await supabase
    .from('progress_tracking')
    .select(`
      *,
      lesson:lesson_id(
        module_id
      )
    `)
    .eq('enrollment_id', enrollmentId)
    .eq('lesson.module_id', moduleId);

  if (error) {
    console.error('Error fetching module progress:', error);
    return [];
  }

  return data || [];
} 