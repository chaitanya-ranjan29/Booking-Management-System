
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://bxbsrlxqwzpstymxxhgs.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4YnNybHhxd3pwc3R5bXh4aGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NDQ5NjYsImV4cCI6MjAxNDIyMDk2Nn0.oXrOMPqtcHaC9tsF0eMSYG-9NYykzD5jFmK6bLW2kwI"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;