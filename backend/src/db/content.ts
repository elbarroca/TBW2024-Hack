import { Database } from "../types/db";
import { supabase } from "./client";
import { randomUUID } from 'crypto';

type Content = Database['public']['Tables']['content']['Row'];
type NewContent = Database['public']['Tables']['content']['Insert'];
type ContentCategory = Database['public']['Tables']['content_categories']['Row'];

export async function createContent(content: NewContent): Promise<Content | null> {
  const { data, error } = await supabase
    .from('content')
    .insert([content])
    .single();

  if (error) {
    console.error('Error creating content:', error);
    return null;
  }

  return data;
}

export async function getContentById(id: string): Promise<Content | null> {
  const { data, error } = await supabase
    .from('content')
    .select(`
      *,
      creator:creator_id(*),
      categories:content_categories(category)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching content:', error);
    return null;
  }

  return data;
}

export async function updateContent(
  id: string, 
  updates: Partial<Content>
): Promise<Content | null> {
  const { data, error } = await supabase
    .from('content')
    .update(updates)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error updating content:', error);
    return null;
  }

  return data;
}

export async function deleteContent(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('content')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting content:', error);
    return false;
  }

  return true;
}

export async function getContentByCreator(creatorId: string): Promise<Content[]> {
  const { data, error } = await supabase
    .from('content')
    .select(`
      *,
      categories:content_categories(category)
    `)
    .eq('creator_id', creatorId);

  if (error) {
    console.error('Error fetching creator content:', error);
    return [];
  }

  return data || [];
}

export async function addContentCategories(
  contentId: string, 
  categories: string[]
): Promise<boolean> {
  const categoryRecords = categories.map(category => ({
    content_id: contentId,
    category
  }));

  const { error } = await supabase
    .from('content_categories')
    .insert(categoryRecords);

  if (error) {
    console.error('Error adding content categories:', error);
    return false;
  }

  return true;
}

export async function uploadContentFile(
  file: File, 
  bucket = 'content'
): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${randomUUID()}.${fileExt}`;
  
  const { error: uploadError } = await supabase
    .storage
    .from(bucket)
    .upload(fileName, file);

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  const { data: { publicUrl } } = supabase
    .storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrl;
}

export async function searchContent(
  query: string,
  filters?: {
    type?: string[];
    categories?: string[];
    priceRange?: { min: number; max: number };
  }
): Promise<Content[]> {
  let queryBuilder = supabase
    .from('content')
    .select(`
      *,
      creator:creator_id(*),
      categories:content_categories(category)
    `)
    .ilike('title', `%${query}%`);

  if (filters?.type?.length) {
    queryBuilder = queryBuilder.in('type', filters.type);
  }

  if (filters?.priceRange) {
    queryBuilder = queryBuilder
      .gte('price', filters.priceRange.min)
      .lte('price', filters.priceRange.max);
  }

  const { data, error } = await queryBuilder;

  if (error) {
    console.error('Error searching content:', error);
    return [];
  }

  if (filters?.categories?.length) {
    return (data || []).filter(content => 
      content.categories?.some(cat => 
        filters.categories?.includes(cat.category)
      )
    );
  }

  return data || [];
} 