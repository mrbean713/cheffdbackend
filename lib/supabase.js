// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with the correct environment variables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,  // Use NEXT_PUBLIC prefix
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // Use NEXT_PUBLIC prefix
);

export default supabase;
