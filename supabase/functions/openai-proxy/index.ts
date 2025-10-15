import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

// Your OpenAI API key is now a secure environment variable in your Supabase project.
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

serve(async (req) => {
  // Handle CORS preflight requests.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!OPENAI_API_KEY) {
      throw new Error('Missing OPENAI_API_KEY in Supabase environment variables.')
    }

    // Forward the client's request to the OpenAI API.
    const { model, messages, ...rest } = await req.json()

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        messages,
        ...rest,
      }),
    })

    // Relay the response (or error) back to the client.
    const responseBody = await res.text()
    return new Response(responseBody, {
      status: res.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})