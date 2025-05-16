import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

// Get environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // Parse the request body
    const body = await req.json();
    const { inquiry_id } = body;

    if (!inquiry_id) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Supabase client with service role key for admin access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch the inquiry details
    const { data: inquiry, error: inquiryError } = await supabase
      .from("inquiries")
      .select("*")
      .eq("id", inquiry_id)
      .single();

    if (inquiryError || !inquiry) {
      return new Response(
        JSON.stringify({ error: "Inquiry not found", details: inquiryError }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // In a real application, you would send an actual email here
    // For this demo, we'll simulate it by adding a log and updating the inquiry status
    console.log(`Email would be sent for inquiry ID: ${inquiry_id}`);
    console.log("Inquiry details:", inquiry);

    // Update the inquiry status to 'contacted'
    const { error: updateError } = await supabase
      .from("inquiries")
      .update({ status: "contacted" })
      .eq("id", inquiry_id);

    if (updateError) {
      return new Response(
        JSON.stringify({
          error: "Failed to update inquiry status",
          details: updateError,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email notification sent and inquiry updated",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});