import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const authorization = request.headers.get("Authorization") || "";
  const accessToken = authorization.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!accessToken) return jsonResponse({ error: "Authentication required" }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return jsonResponse({ error: "Server auth configuration is missing" }, 500);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: authError } = await admin.auth.getUser(accessToken);
  if (authError || !userData.user) {
    return jsonResponse({ error: "Invalid or expired session" }, 401);
  }

  const userId = userData.user.id;
  const { data: profile, error: profileError } = await admin
    .from("profiles")
    .select("avatar_path")
    .eq("id", userId)
    .maybeSingle();
  if (profileError) return jsonResponse({ error: "Could not load profile for deletion" }, 500);

  const ownedAvatarPath = profile?.avatar_path;
  if (ownedAvatarPath && ownedAvatarPath.startsWith(`${userId}/`)) {
    const { error: photoError } = await admin.storage
      .from("profile-photos")
      .remove([ownedAvatarPath]);
    if (photoError) return jsonResponse({ error: "Could not remove the stored profile photo" }, 500);
  }

  const { error: deleteError } = await admin.auth.admin.deleteUser(userId);
  if (deleteError) return jsonResponse({ error: "Account deletion failed" }, 500);

  return jsonResponse({ success: true });
});
