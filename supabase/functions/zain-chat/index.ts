const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Zain Adtani's website assistant. You help visitors learn about Zain's services, books, and background. Keep answers short (2-3 sentences max), friendly, and professional. Here is what you know:

SERVICES: Zain offers three services. (1) Done-for-you AI websites built in under two weeks using Lovable. (2) Book publishing help, guiding people from idea to published book on Amazon including Kindle, paperback, and audiobook. (3) Creator monetization, helping creators with audiences build digital products using AI with revenue splits.

BOOKS: Zain has a published coloring book on Amazon. He is working on two solo books: Think Drive Build and AI-fy Your Life.

BACKGROUND: Zain is a mechanical engineer (UTSA 2022), Eagle Scout, based in DFW Texas. He helps small businesses integrate AI and helps everyday people publish books.

CONTACT: Visitors can book a call at calendly.com/zkadtani or email zkadtani@gmail.com.

THE Z LETTER: A free weekly newsletter on AI tips and life lessons, available at thezletter.beehiiv.com.

If asked something you do not know, say: I am not sure about that, but you can reach Zain directly at zkadtani@gmail.com and he will get back to you.

Never make up information. Never discuss pricing specifics. If asked about pricing, say: Pricing depends on the project. Book a free call to discuss.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (response.status === 429) {
      return new Response(
        JSON.stringify({ error: "Rate limited, please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (response.status === 402) {
      return new Response(
        JSON.stringify({ error: "AI credits exhausted." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("zain-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
