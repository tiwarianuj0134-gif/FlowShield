// Vercel/Netlify serverless function - api/coach.ts
// This handles POST /api/coach and calls OpenAI securely server-side

import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("OPENAI_API_KEY is not set");
    return res.status(500).json({ error: "Server configuration error: OPENAI_API_KEY not set." });
  }

  const { message, userProfile, ivi, state, metrics, mode } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing required field: message" });
  }

  const systemPrompt = `You are FlowShield's Cognitive Coach for Logitech MX devices.
You ALWAYS base your answers strictly on the JSON state provided.
You help users understand why their Interaction Volatility Index (IVI) is high or low, and suggest concrete next actions.
If something is not present in the JSON, say you don't know instead of inventing details.
Be short, practical, and specific. Avoid generic productivity clichés.
You can reference: IVI score, state label, metrics like appSwitches, tabChurn, oscillations, current mode, and userProfile (role/tools).
IVI states: 0-25 = Deep Focus, 26-50 = Stable, 51-75 = Fragmented, 76-100 = Overloaded.
Keep responses concise (2-4 sentences max) and actionable.`;

  const userContent = `Here is the current FlowShield state JSON:
${JSON.stringify({ userProfile, ivi, state, metrics, mode }, null, 2)}

The user asked: "${message}"

Answer as FlowShield's Cognitive Coach.`;

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!openaiResponse.ok) {
      const errData = await openaiResponse.json().catch(() => ({}));
      console.error("OpenAI API error:", errData);
      return res.status(500).json({ error: `OpenAI error: ${openaiResponse.status}` });
    }

    const data = await openaiResponse.json();
    const reply = data.choices?.[0]?.message?.content ?? "No response from AI.";
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return res.status(500).json({ error: "AI error. Please try again." });
  }
}
