import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yqffltbsrkzplajnckka.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZmZsdGJzcmt6cGxham5ja2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNjI0ODMsImV4cCI6MjA4NTczODQ4M30.pVOqYRdJYcz9sj-aMRUMsBqH9RMquBzCDFqWHKlTXKA';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
