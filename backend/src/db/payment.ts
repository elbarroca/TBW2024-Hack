import { supabase } from './client';
import { PaymentValidation, PaymentStatus } from '../types/payment';
import { Database } from '../types/db';

type PaymentRow = Database['public']['Tables']['payments']['Row'];
type PaymentInsert = Database['public']['Tables']['payments']['Insert'];

export async function createPaymentRecord(payment: PaymentValidation): Promise<PaymentRow | null> {
  if (!payment.user_id || !payment.course_id) {
    throw new Error('Missing user_id or course_id');
  }

  const { data, error } = await supabase
    .from('payments')
    .insert([{
      user_id: payment.user_id,
      course_id: payment.course_id,
      amount: Number(payment.amount),
      currency: payment.currency.toString(),
      payment_method: 'crypto',
      status: payment.status,
      signature: payment.signature,
      created_at: payment.timestamp.toISOString()
    } satisfies PaymentInsert])
    .select()
    .single();

  if (error) {
    console.error('Error creating payment record:', error);
    throw error;
  }

  return data;
}

export async function updatePaymentStatus(
  signature: string,
  status: PaymentStatus,
  transaction_hash?: string
): Promise<void> {
  const { error } = await supabase
    .from('payments')
    .update({ 
      status,
      ...(transaction_hash ? { transaction_hash } : {}),
      updated_at: new Date().toISOString()
    })
    .eq('signature', signature);

  if (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
}

export async function getPaymentBySignature(signature: string): Promise<PaymentRow | null> {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('signature', signature)
    .single();

  if (error) {
    console.error('Error fetching payment:', error);
    return null;
  }

  return data;
}

export async function getUserPayments(userId: string): Promise<PaymentRow[]> {
  const { data, error } = await supabase
    .from('payments')
    .select(`
      *,
      course:course_id(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user payments:', error);
    return [];
  }

  return data;
} 