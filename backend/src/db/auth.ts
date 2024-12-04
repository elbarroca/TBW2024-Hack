import { supabase } from './client';
import type { LoginAttempt } from '../types/auth';
import { User, UserRole } from '../types/user';
import { createToken } from '../lib/auth';

export async function createLoginAttempt(
  address: string, 
  nonce: string
): Promise<boolean> {
  const ttl = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  const created_at = new Date().toISOString();

  const { error } = await supabase
    .from('login_attempts')
    .upsert({
      address,
      nonce,
      ttl,
      created_at
    });

  if (error) {
    console.error('Error creating login attempt:', error);
    return false;
  }

  return true;
}

export async function getLoginAttempt(address: string): Promise<LoginAttempt | null> {
  const { data, error } = await supabase
    .from('login_attempts')
    .select('*')
    .eq('address', address)
    .single();

  if (error) {
    console.error('Error fetching login attempt:', error);
    return null;
  }

  return data;
}

export async function validateLoginAttempt(
  address: string, 
  nonce: string
): Promise<boolean> {
  const attempt = await getLoginAttempt(address);
  if (!attempt) return false;

  const ttl = new Date(attempt.ttl || '');
  const now = new Date();

  return attempt.nonce === nonce && now < ttl;
}

export async function clearLoginAttempt(address: string): Promise<void> {
  const { error } = await supabase
    .from('login_attempts')
    .delete()
    .eq('address', address);

  if (error) {
    console.error('Error clearing login attempt:', error);
    throw error;
  }
}

export async function getUserRole(userId: string): Promise<UserRole> {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user role:', error);
    return 'student'; // Default to student role
  }

  return data?.role || 'student';
}

async function getOrCreateUser(address: string): Promise<User> {
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('address', address)
    .single();

  if (existingUser) {
    return {
      ...existingUser,
      role: existingUser.role as UserRole
    };
  }

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw fetchError;
  } else if (!existingUser) {
    // Create new user if doesn't exist
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: `${address}@email.com`,
        user_metadata: { address },
    });
    
    if (authError) throw authError;

    let { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('address', address)
        .single();

    if (error) throw error;
    if (!data) throw new Error('User not found');
    
    return data as User;
  }

  throw fetchError;
}

export async function getUser(address: string): Promise<{ user: User, accessToken: string }> {
  const user = await getOrCreateUser(address);
  const accessToken = createToken(user);
  await supabase.rpc('set_claim', { uid: user.id, claim: 'userrole', value: 'student' });

  return { user, accessToken };
} 