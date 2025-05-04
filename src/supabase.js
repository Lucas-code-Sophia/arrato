// src/components/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://csljuwpfilkpbmkowasa.supabase.co'  // 🔁 remplace par ton URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbGp1d3BmaWxrcGJta293YXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNjg0ODUsImV4cCI6MjA2MTk0NDQ4NX0.3crZfnnPdf6wRqPEFBbXGOITySo0bh7_hxPouEXuxjs'              // 🔁 remplace par ta clé publique

export const supabase = createClient(supabaseUrl, supabaseKey)
