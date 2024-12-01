import { ContentType } from "./content"

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      login_attempts: {
        Row: {
          address: string
          nonce: string | null
          ttl: string | null
          created_at: string
        }
        Insert: {
          address: string
          nonce?: string | null
          ttl?: string | null
          created_at?: string
        }
        Update: {
          address?: string
          nonce?: string | null
          ttl?: string | null
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          address: string | null
          avatar_url: string | null
          full_name: string | null
          email: string
          role: 'student' | 'instructor' | 'admin'
          created_at: string
          updated_at: string
          last_auth: string | null
          last_auth_status: string | null
          nonce: string | null
          billing_address: Json | null
          payment_method: Json | null
        }
        Insert: {
          id?: string
          address?: string | null
          avatar_url?: string | null
          full_name?: string | null
          email: string
          role?: 'student' | 'instructor' | 'admin'
          created_at?: string
          updated_at?: string
          last_auth?: string | null
          last_auth_status?: string | null
          nonce?: string | null
          billing_address?: Json | null
          payment_method?: Json | null
        }
        Update: {
          id?: string
          address?: string | null
          avatar_url?: string | null
          full_name?: string | null
          email?: string
          role?: 'student' | 'instructor' | 'admin'
          created_at?: string
          updated_at?: string
          last_auth?: string | null
          last_auth_status?: string | null
          nonce?: string | null
          billing_address?: Json | null
          payment_method?: Json | null
        }
      }
      content: {
        Row: {
          id: string;
          title: string;
          description: string;
          creator_id: string;
          type: ContentType;
          file_url: string;
          thumbnail_url: string | null;
          price: number;
          currency: string;
          metadata: Json | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          creator_id: string;
          type: ContentType;
          file_url: string;
          thumbnail_url?: string | null;
          price: number;
          currency: string;
          metadata?: Json | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          creator_id?: string;
          type?: ContentType;
          file_url?: string;
          thumbnail_url?: string | null;
          price?: number;
          currency?: string;
          metadata?: Json | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      content_categories: {
        Row: {
          content_id: string;
          category: string;
        };
        Insert: {
          content_id: string;
          category: string;
        };
        Update: {
          content_id?: string;
          category?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          instructor_id: string;
          price: string;
          currency: string;
          duration: number;
          level: 'beginner' | 'intermediate' | 'advanced';
          categories: string[];
          thumbnail_url: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          instructor_id: string;
          price: string;
          currency: string;
          duration: number;
          level: 'beginner' | 'intermediate' | 'advanced';
          categories: string[];
          thumbnail_url?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          instructor_id?: string;
          price?: string;
          currency?: string;
          duration?: number;
          level?: 'beginner' | 'intermediate' | 'advanced';
          categories?: string[];
          thumbnail_url?: string | null;
          published?: boolean;
          updated_at?: string;
        };
      };
      modules: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          description: string;
          order_number: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          description: string;
          order_number: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          course_id?: string;
          title?: string;
          description?: string;
          order_number?: number;
          updated_at?: string;
        };
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          title: string;
          description: string;
          content_type: string;
          content_url: string;
          duration: number;
          order_number: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          module_id: string;
          title: string;
          description: string;
          content_type: string;
          content_url: string;
          duration: number;
          order_number: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          module_id?: string;
          title?: string;
          description?: string;
          content_type?: string;
          content_url?: string;
          duration?: number;
          order_number?: number;
          updated_at?: string;
        };
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          status: 'active' | 'completed' | 'cancelled';
          progress: number;
          payment_id: string | null;
          enrolled_at: string;
          completed_at: string | null;
          last_accessed: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          status?: 'active' | 'completed' | 'cancelled';
          progress?: number;
          payment_id?: string | null;
          enrolled_at?: string;
          completed_at?: string | null;
          last_accessed?: string | null;
        };
        Update: Partial<Omit<Database['public']['Tables']['enrollments']['Row'], 'id'>>;
      };
      progress_tracking: {
        Row: {
          id: string;
          enrollment_id: string;
          lesson_id: string;
          status: 'not_started' | 'in_progress' | 'completed';
          progress_percentage: number;
          last_position: number | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          enrollment_id: string;
          lesson_id: string;
          status: 'not_started' | 'in_progress' | 'completed';
          progress_percentage: number;
          last_position: number | null;
          completed_at: string | null;
        };
        Update: Partial<Database['public']['Tables']['progress_tracking']['Insert']>;
      };
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export interface BaseModel {
  id: string;
  created_at: string;
  updated_at: string;
} 