// src/components/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://csljuwpfilkpbmkowasa.supabase.co'  // 🔁 remplace par ton URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbGp1d3BmaWxrcGJta293YXNhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjM2ODQ4NSwiZXhwIjoyMDYxOTQ0NDg1fQ.psy8td8BuWI43ZGbZtXYPAm5L-Nx7OTJh9tk7GBSVPE'              // 🔁 remplace par ta clé publique

export const supabase = createClient(supabaseUrl, supabaseKey)
