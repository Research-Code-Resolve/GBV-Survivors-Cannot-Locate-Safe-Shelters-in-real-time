// Supabase Edge Function: staff-signup
//
// Why this exists: signup cannot be a plain client-side call to
// supabase.auth.signUp() because there'd be nothing stopping anyone
// from calling that directly and creating an account with read access
// to survivor reports. This function is the one place the access
// code is checked, using the service_role key, which never reaches
// the browser.
//
// Deploy with: supabase functions deploy staff-signup
// Requires these secrets set on the Supabase project (not in .env,
// these are server-side only):
//   supabase secrets set SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=...

import { createClient } from "npm:@supabase/supabase-js@2";
import { encodeHex } from "https://deno.land/std@0.224.0/encoding/hex.ts";
import { corsHeaders } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

async function sha256Hex(input) {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return encodeHex(new Uint8Array(hashBuffer));
}

Deno.serve(async (req) => {
  // Browsers send an OPTIONS preflight before the real POST for any
  // cross-origin request with a JSON body / auth header. Without this
  // branch, the preflight gets a non-2xx response and the browser
  // blocks the actual request with a CORS error -- the request never
  // even reaches the logic below.
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: jsonHeaders,
    });
  }

  try {
    const { email, password, accessCode } = await req.json();

    if (!email || !password || !accessCode) {
      return new Response(
        JSON.stringify({ error: "Email, password, and access code are required." }),
        { status: 400, headers: jsonHeaders }
      );
    }

    if (password.length < 8) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 8 characters." }),
        { status: 400, headers: jsonHeaders }
      );
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // Check the access code against the hashed value. Because this
    // runs with the service_role key on the server, staff_access_codes
    // (which has no RLS policies at all) is reachable here even
    // though it's completely unreachable from the browser.
    const codeHash = await sha256Hex(accessCode.trim());

    const { data: codeRow, error: codeError } = await admin
      .from("staff_access_codes")
      .select("id, used_at")
      .eq("code_hash", codeHash)
      .maybeSingle();

    if (codeError || !codeRow) {
      return new Response(
        JSON.stringify({ error: "Invalid access code." }),
        { status: 401, headers: jsonHeaders }
      );
    }

    if (codeRow.used_at) {
      return new Response(
        JSON.stringify({ error: "This access code has already been used." }),
        { status: 401, headers: jsonHeaders }
      );
    }

    // Create the auth user.
    const { data: userData, error: createError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) {
      return new Response(
        JSON.stringify({ error: createError.message }),
        { status: 400, headers: jsonHeaders }
      );
    }

    const userId = userData.user.id;

    // Mark them as staff -- this is what actually grants read access
    // to reports, via the RLS policy on public.reports.
    const { error: profileError } = await admin
      .from("staff_profiles")
      .insert({ id: userId, email });

    if (profileError) {
      // Roll back the auth user so we don't leave an orphaned account
      // with no staff profile and no way to log in usefully.
      await admin.auth.admin.deleteUser(userId);
      return new Response(
        JSON.stringify({ error: "Could not create staff profile. Please try again." }),
        { status: 500, headers: jsonHeaders }
      );
    }

    // Mark the access code as used so it can't be reused.
    await admin
      .from("staff_access_codes")
      .update({ used_at: new Date().toISOString(), used_by: userId })
      .eq("id", codeRow.id);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unexpected error. Please try again." }),
      { status: 500, headers: jsonHeaders }
    );
  }
});
