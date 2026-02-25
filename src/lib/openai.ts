// OpenAI client helper
// In production, calls go through /api/coach (serverless function)
// In development/static builds, calls OpenAI directly using VITE_OPENAI_API_KEY
// IMPORTANT: For production, always use the server-side route.

export interface CoachPayload {
  message: string;
  userProfile: {
    role: string;
    tools: string[];
    deepWorkLengthMinutes: number;
    interruptionSensitivity: string;
  };
  ivi: number;
  state: string;
  metrics: {
    appSwitchesLast10Min: number;
    tabChurnLast10Min: number;
    oscillationsLast10Min: number;
  };
  mode: string;
}

export interface CoachResponse {
  reply?: string;
  error?: string;
}

const SYSTEM_PROMPT = `You are FlowShield's Cognitive Coach for Logitech MX devices.
You ALWAYS base your answers strictly on the JSON state provided.
You help users understand why their Interaction Volatility Index (IVI) is high or low, and suggest concrete next actions.
If something is not present in the JSON, say you don't know instead of inventing details.
Be short, practical, and specific. Avoid generic productivity clichés.
You can reference: IVI score, state label, metrics like appSwitches, tabChurn, oscillations, current mode, and userProfile (role/tools).
IVI states: 0-25 = Deep Focus, 26-50 = Stable, 51-75 = Fragmented, 76-100 = Overloaded.
Keep responses concise (2-4 sentences max) and actionable.`;

async function callOpenAIDirectly(payload: CoachPayload): Promise<CoachResponse> {
  // Access Vite env variable (must be prefixed with VITE_)
  const apiKey = (import.meta as ImportMeta & { env: Record<string, string> }).env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return {
      error: "OpenAI API key not configured. Add VITE_OPENAI_API_KEY to your .env file.",
    };
  }

  const userContent = `Here is the current FlowShield state JSON:
${JSON.stringify(
  {
    userProfile: payload.userProfile,
    ivi: payload.ivi,
    state: payload.state,
    metrics: payload.metrics,
    mode: payload.mode,
  },
  null,
  2
)}

The user asked: "${payload.message}"

Answer as FlowShield's Cognitive Coach.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = (errData as { error?: { message?: string } })?.error?.message || `API error: ${response.status}`;
      return { error: errMsg };
    }

    const data = await response.json() as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = data.choices?.[0]?.message?.content ?? "No response from AI.";
    return { reply };
  } catch (err) {
    return { error: "Network error. Please check your connection." };
  }
}

export async function askCoach(payload: CoachPayload): Promise<CoachResponse> {
  // Try server-side route first (for production with serverless functions)
  try {
    const response = await fetch("/api/coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // If server route returns 404 (no serverless backend), fall back to direct call
    if (response.status === 404) {
      return callOpenAIDirectly(payload);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errTyped = errorData as { error?: string };
      // If server error, try direct call as fallback
      if (response.status >= 500) {
        return callOpenAIDirectly(payload);
      }
      return { error: errTyped.error || `Server error: ${response.status}` };
    }

    const data = await response.json() as CoachResponse;
    return data;
  } catch {
    // Network error (no server) - fall back to direct OpenAI call
    return callOpenAIDirectly(payload);
  }
}
