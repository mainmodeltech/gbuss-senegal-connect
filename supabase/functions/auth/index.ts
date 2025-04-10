
// Admin authentication edge function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface AdminLoginRequest {
  email: string;
  password: string;
}

serve(async (req: Request) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") || "",
    Deno.env.get("SUPABASE_ANON_KEY") || ""
  );

  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  // Handle OPTIONS request for CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== 'POST') {
      throw new Error('Expected POST request');
    }

    const { email, password } = await req.json() as AdminLoginRequest;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Authenticate the admin
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Verify if user has an admin profile
    const { data: profileData, error: profileError } = await supabaseClient
      .from('admin_profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError || !profileData || !profileData.is_active) {
      throw new Error('Unauthorized: Not an active admin user');
    }

    // Return user data and token
    return new Response(JSON.stringify({ 
      user: data.user,
      profile: profileData,
      session: data.session
    }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        ...corsHeaders 
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 
        "Content-Type": "application/json",
        ...corsHeaders 
      },
    });
  }
});
