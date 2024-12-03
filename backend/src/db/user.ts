import { Database } from "../types/db";
import { supabase } from "./client";
import { UserRole } from '../types/user';
import type { User, NewUser } from '../types/user';

type DbUser = Database['public']['Tables']['users']['Row'];
type DbNewUser = Database['public']['Tables']['users']['Insert'];

// Helper function to convert string role to UserRole enum
function mapRole(role: 'student' | 'instructor' | 'admin'): UserRole {
  switch (role) {
    case 'student':
      return UserRole.STUDENT;
    case 'instructor':
      return UserRole.INSTRUCTOR;
    case 'admin':
      return UserRole.ADMIN;
    default:
      return UserRole.STUDENT;
  }
}

// Convert DB user to our User type
export function mapDbUserToUser(dbUser: DbUser): User {
  return {
    ...dbUser,
    role: mapRole(dbUser.role)  // Convert string role to enum
  };
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data ? mapDbUserToUser(data) : null;
}

export async function createUser(user: NewUser): Promise<User> {
  const dbUser: DbNewUser = {
    id: user.id,
    role: user.role.toLowerCase() as 'student' | 'instructor' | 'admin',  // Convert enum to string
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    // Optional fields
    address: user.address ?? null,
    avatar_url: user.avatar_url ?? null,
    full_name: user.full_name ?? null,
    email: user.email ?? null,
    last_auth: user.last_auth ?? null,
    last_auth_status: user.last_auth_status ?? null,
    nonce: user.nonce ?? null,
    billing_address: user.billing_address ?? null,
    payment_method: user.payment_method ?? null
  };

  const { data, error } = await supabase
    .from('users')
    .insert(dbUser)
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  return mapDbUserToUser(data);
}

export async function updateNonce(address: string, nonce: string): Promise<void> {
  const { error } = await supabase
    .from('login_attempts')
    .upsert({ 
      address, 
      nonce, 
      ttl: new Date(Date.now() + 5 * 60 * 1000).toISOString() 
    });

  if (error) {
    console.error('Error updating nonce:', error);
    throw error;
  }
}

export async function getNonce(address: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('login_attempts')
    .select('nonce')
    .eq('address', address)
    .single();

  if (error || !data) {
    return null;
  }

  return data.nonce;
}
