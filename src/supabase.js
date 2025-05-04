import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://csljuwpfilkpbmkowasa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbGp1d3BmaWxrcGJta293YXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MjYxNjMsImV4cCI6MjAyMDQwMjE2M30.0000000000000000000000000000000000000000'
export const supabase = createClient(supabaseUrl, supabaseKey)