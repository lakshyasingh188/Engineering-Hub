// supabase.js

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔹 Apna Supabase URL aur Anon Key yaha paste kare
const SUPABASE_URL = "https://zbwduubkneapofdeyvro.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpid2R1dWJrbmVhcG9mZGV5dnJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4ODg1NjgsImV4cCI6MjA4OTQ2NDU2OH0.bcfvnzG8ZhuGeJn3zvK5h6sfftXVZmlYwEknojSuPE4";

// 🔹 Client create
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);