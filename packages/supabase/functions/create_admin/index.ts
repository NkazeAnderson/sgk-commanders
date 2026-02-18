// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { Database } from "../../../shared/src/database.types.ts";

console.log("create_admin function starting");

Deno.serve(async (req) => {
  // parse JSON body
  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  console.log(Deno.env.get("CREATE_ADMIN_PROTECTION_PASSWORD"));

  // protection password (accept header `x-protection-password` OR body.protectionPassword)
  const protectionHeader =
    req.headers.get("x-protection-password") ||
    req.headers.get("x-admin-password");
  const protectionPassword = protectionHeader ?? body?.protectionPassword;
  const expectedPassword =
    Deno.env.get("CREATE_ADMIN_PROTECTION_PASSWORD") ??
    Deno.env.get("ADMIN_PROTECTION_PASSWORD") ??
    "supersecretpassword";

  if (!expectedPassword) {
    return new Response(
      JSON.stringify({
        error: "Server misconfiguration: protection password not set",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (protectionPassword !== expectedPassword) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // required input
  const { email, password, name, phone, email_confirm = true } = body ?? {};
  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Missing required fields: email and password" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRole =
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
    Deno.env.get("SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRole) {
    return new Response(
      JSON.stringify({
        error:
          "Server misconfiguration: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // use service role for admin operations
  const supabase = createClient<Database>(supabaseUrl, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name: name ?? null,
        phone: phone ?? null,
        home_address: null,
        accepted_terms: true,
        email: email ?? null,
      },
      app_metadata: { is_admin: true },
      email_confirm,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // return created user (do not return password)
    return new Response(
      JSON.stringify({ message: "Admin user created", user: data }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
