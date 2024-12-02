import { ContentType } from "./content"
import type { BillingAddress, PaymentMethod } from './user';

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
          nonce: string
          ttl: string
          created_at: string
        }
        Insert: {
          address: string
          nonce: string
          ttl: string
          created_at?: string
        }
        Update: {
          address?: string
          nonce?: string
          ttl?: string
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string;
          auth_user_id: string | null;
          address: string | null;
          avatar_url: string | null;
          full_name: string | null;
          email: string | null;
          role: 'student' | 'instructor' | 'admin';
          created_at: string;
          updated_at: string;
          last_auth: string | null;
          last_auth_status: string | null;
          nonce: string | null;
          billing_address: BillingAddress | null;
          payment_method: PaymentMethod | null;
        }
        Insert: {
          id: string;
          auth_user_id?: string | null;
          address?: string | null;
          avatar_url?: string | null;
          full_name?: string | null;
          email?: string | null;
          role: 'student' | 'instructor' | 'admin';
          created_at?: string;
          updated_at?: string;
          last_auth?: string | null;
          last_auth_status?: string | null;
          nonce?: string | null;
          billing_address?: BillingAddress | null;
          payment_method?: PaymentMethod | null;
        }
        Update: {
          id?: string;
          auth_user_id?: string | null;
          address?: string | null;
          avatar_url?: string | null;
          full_name?: string | null;
          email?: string | null;
          role?: 'student' | 'instructor' | 'admin';
          created_at?: string;
          updated_at?: string;
          last_auth?: string | null;
          last_auth_status?: string | null;
          nonce?: string | null;
          billing_address?: BillingAddress | null;
          payment_method?: PaymentMethod | null;
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
      content_purchases: {
        Row: {
          id: string;
          content_id: string;
          buyer_id: string;
          transaction_signature: string;
          price_paid: number;
          currency: string;
          purchased_at: string;
        };
        Insert: {
          id?: string;
          content_id: string;
          buyer_id: string;
          transaction_signature: string;
          price_paid: number;
          currency: string;
          purchased_at?: string;
        };
        Update: {
          id?: string;
          content_id?: string;
          buyer_id?: string;
          transaction_signature?: string;
          price_paid?: number;
          currency?: string;
          purchased_at?: string;
        };
      };
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_claims_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
      get_my_claims: {
        Args: Record<string, never>
        Returns: Json
      }
      get_my_claim: {
        Args: { claim: string }
        Returns: Json
      }
      get_claims: {
        Args: { uid: string }
        Returns: Json
      }
      get_claim: {
        Args: { uid: string; claim: string }
        Returns: Json
      }
      set_claim: {
        Args: { uid: string; claim: string; value: Json }
        Returns: string
      }
      delete_claim: {
        Args: { uid: string; claim: string }
        Returns: string
      }
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