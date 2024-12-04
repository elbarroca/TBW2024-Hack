import { Database } from "../types/db";
import { supabase } from "./client";
import { UserRole } from "../types/user";

type Course = Database['public']['Tables']['courses']['Row'];
type NewCourse = Database['public']['Tables']['courses']['Insert'];
type Module = Database['public']['Tables']['modules']['Row'];
type Lesson = Database['public']['Tables']['lessons']['Row'];
type NewModule = Database['public']['Tables']['modules']['Insert'];
type NewLesson = Database['public']['Tables']['lessons']['Insert'];

interface CourseInstructor {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
}

interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

export interface CourseWithRelations extends Course {
  instructor: CourseInstructor;
  modules: ModuleWithLessons[];
}

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

export async function getCourseWithModules(courseId: string): Promise<CourseWithRelations | null> {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      instructor:users!instructor_id(
        id,
        full_name,
        avatar_url,
        role
      ),
      modules:modules(
        *,
        lessons:lessons(*)
      )
    `)
    .eq('id', courseId)
    .single();

  if (error) {
    console.error('Error fetching course:', error);
    return null;
  }

  if (data) {
    const instructor = Array.isArray(data.instructor) ? data.instructor[0] : data.instructor;
    
    const courseWithRelations: CourseWithRelations = {
      ...data,
      instructor: instructor as CourseInstructor,
      modules: data.modules as ModuleWithLessons[]
    };
    return courseWithRelations;
  }

  return null;
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
  const course = await getCourseWithModules(courseId);
  if (!course || !course.modules?.length) {
    return false;
  }

  const hasEmptyModules = course.modules.some(module => !module.lessons?.length);
  if (hasEmptyModules) {
    return false;
  }

  const { error } = await supabase
    .from('courses')
    .update({ 
      published: true, 
      updated_at: new Date().toISOString(),
      last_updated: new Date().toISOString()
    })
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

export const createCourseTag = async (courseId: string, tag: string) => {
  const { data, error } = await supabase
    .from('course_tags')
    .insert([{
      course_id: courseId,
      tag
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating course tag:', error);
    return null;
  }

  return data;
};

export const deleteCourseTagsByCourseId = async (courseId: string) => {
  const { data, error } = await supabase
    .from('course_tags')
    .delete()
    .eq('course_id', courseId)
    .select();

  if (error) {
    console.error('Error deleting course tags:', error);
    return null;
  }

  return data;
}; 