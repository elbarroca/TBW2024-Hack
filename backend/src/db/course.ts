import { Database } from "../types/db";
import { supabase } from "./client";

type Course = Database['public']['Tables']['courses']['Row'];
type NewCourse = Database['public']['Tables']['courses']['Insert'];
type Module = Database['public']['Tables']['modules']['Row'];
type Lesson = Database['public']['Tables']['lessons']['Row'];
type NewModule = Database['public']['Tables']['modules']['Insert'];
type NewLesson = Database['public']['Tables']['lessons']['Insert'];

export async function createCourse(course: NewCourse): Promise<Course | null> {
  const { data, error } = await supabase
    .from('courses')
    .insert([course])
    .single();

  if (error) {
    console.error('Error creating course:', error);
    return null;
  }

  return data;
}

export async function getCourseWithModules(courseId: string) {
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select(`
      *,
      instructor:instructor_id(*),
      modules:modules(
        *,
        lessons:lessons(*)
      )
    `)
    .eq('id', courseId)
    .single();

  if (courseError) {
    console.error('Error fetching course:', courseError);
    return null;
  }

  return course;
}

export async function updateCourse(courseId: string, updates: Partial<Course>): Promise<Course | null> {
  const { data, error } = await supabase
    .from('courses')
    .update(updates)
    .eq('id', courseId)
    .single();

  if (error) {
    console.error('Error updating course:', error);
    return null;
  }

  return data;
}

export async function addModuleToCourse(courseId: string, module: Omit<NewModule, 'course_id'>): Promise<Module | null> {
  const { data, error } = await supabase
    .from('modules')
    .insert([{ ...module, course_id: courseId }])
    .single();

  if (error) {
    console.error('Error adding module:', error);
    return null;
  }

  return data;
}

export async function addLessonToModule(moduleId: string, lesson: Omit<NewLesson, 'module_id'>): Promise<Lesson | null> {
  const { data, error } = await supabase
    .from('lessons')
    .insert([{ ...lesson, module_id: moduleId }])
    .single();

  if (error) {
    console.error('Error adding lesson:', error);
    return null;
  }

  return data;
}

export async function updateModuleOrder(moduleId: string, newOrder: number): Promise<boolean> {
  const { error } = await supabase
    .from('modules')
    .update({ order_number: newOrder })
    .eq('id', moduleId);

  if (error) {
    console.error('Error updating module order:', error);
    return false;
  }

  return true;
}

export async function updateLessonOrder(lessonId: string, newOrder: number): Promise<boolean> {
  const { error } = await supabase
    .from('lessons')
    .update({ order_number: newOrder })
    .eq('id', lessonId);

  if (error) {
    console.error('Error updating lesson order:', error);
    return false;
  }

  return true;
}

export async function getInstructorCourses(instructorId: string): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('instructor_id', instructorId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching instructor courses:', error);
    return [];
  }

  return data || [];
}

export async function publishCourse(courseId: string): Promise<boolean> {
  // Validate course is ready for publishing
  const course = await getCourseWithModules(courseId);
  if (!course || !course.modules?.length) {
    return false;
  }

  const hasEmptyModules = course.modules.some(module => !module.lessons?.length);
  if (hasEmptyModules) {
    return false;
  }

  // Publish course
  const { error } = await supabase
    .from('courses')
    .update({ published: true, updated_at: new Date().toISOString() })
    .eq('id', courseId);

  if (error) {
    console.error('Error publishing course:', error);
    return false;
  }

  return true;
}

export async function deleteCourse(courseId: string): Promise<boolean> {
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', courseId);

  if (error) {
    console.error('Error deleting course:', error);
    return false;
  }

  return true;
} 