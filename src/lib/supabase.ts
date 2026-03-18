import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rjyyyuizsfrqpjogwfse.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqeXl5dWl6c2ZycXBqb2d3ZnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTk0NjQsImV4cCI6MjA4OTA3NTQ2NH0.ePkNJTbNgRMkFqMaCBQDLoVlHkX-IOm6tDgXQN4GFGU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
