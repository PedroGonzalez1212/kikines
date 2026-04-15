// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://zqoljybuhtqzpybnxtag.supabase.co'
const SUPABASE_KEY = 'sb_publishable_xhVoRf1nI1_HnDvktmPtfQ_e5wOiZ8e'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)