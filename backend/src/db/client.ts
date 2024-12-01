import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/db';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);