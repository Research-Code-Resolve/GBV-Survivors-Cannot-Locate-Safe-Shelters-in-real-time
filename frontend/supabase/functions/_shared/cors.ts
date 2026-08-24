// Shared CORS headers for Edge Functions called directly from the
// browser (supabase.functions.invoke or fetch). Without these, the
// browser's preflight OPTIONS request fails before the real POST is
// ever sent, and every call errors out with a CORS message.
//
// For a production deploy, consider replacing "*" with your actual
// site origin(s) once they're known, e.g. "https://yourapp.com".
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
