import { Database } from "../types/db";
import { supabase } from "./client";

type User = Database['public']['Tables']['users']['Row'];
type NewUser = Database['public']['Tables']['users']['Insert'];

export async function getUserById(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

export async function createUser(user: NewUser): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }

  return data;
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
