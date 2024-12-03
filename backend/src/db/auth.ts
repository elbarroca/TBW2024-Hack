import { LoginAttempt, SignInAttempt } from "../types/auth";
import { supabase } from "./client";

export async function saveLoginAttempt(attempt: SignInAttempt): Promise<void> {
  const { error } = await supabase
    .from('login_attempts')
    .upsert({
      address: attempt.address,
      nonce: attempt.nonce,
      ttl: attempt.ttl
    });

  if (error) {
    console.error('Error saving login attempt:', error);
    throw error;
  }
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

export async function validateLoginAttempt(address: string, nonce: string): Promise<boolean> {
  const attempt = await getLoginAttempt(address);
  if (!attempt) return false;

  const ttl = new Date(attempt.ttl!).getTime();
  const now = Date.now();

  return attempt.nonce === nonce && ttl > now;
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