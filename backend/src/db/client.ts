import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/db';
import { config } from '../lib/config';

export const supabase = createClient<Database>(config.SUPABASE_URL, config.SUPABASE_KEY);