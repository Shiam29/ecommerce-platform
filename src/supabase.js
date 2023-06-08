import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojrecgvwozpmhtbesver.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcmVjZ3Z3b3pwbWh0YmVzdmVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU2OTU3MzEsImV4cCI6MjAwMTI3MTczMX0.T2rzzDZ4iQA5_7x5oXiEbHwIDUpODK2tUP_7gd7EttI";

export const supabase = createClient(supabaseUrl, supabaseKey)