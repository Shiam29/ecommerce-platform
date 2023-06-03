import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojrecgvwozpmhtbesver.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcmVjZ3Z3b3pwbWh0YmVzdmVyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NTY5NTczMSwiZXhwIjoyMDAxMjcxNzMxfQ.MTupLM0uFdvKn7ChQ77QAW136h0mCf1TsBTh2zP4tsE';

export const supabase = createClient(supabaseUrl, supabaseKey)