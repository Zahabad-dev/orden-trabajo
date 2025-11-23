// Configuración de Supabase
const SUPABASE_URL = 'https://mclrbvefdfgsdzebqyxl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jbHJidmVmZGZnc2R6ZWJxeXhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NDE5MjIsImV4cCI6MjA3OTQxNzkyMn0.j_q2V0jN1D-08NPSUtsORE2iYJHTAoJFxgPJHkXq-Ew';

// Inicializar cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
