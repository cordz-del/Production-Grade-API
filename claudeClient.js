// claudeClient.js
export async function getClaudeResponse(prompt) {
  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set.");
  }
  const url = "https://api.anthropic.com/v1/complete";
  const data = {
    prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
    model: "claude-v1",
    max_tokens_to_sample: 150,
    temperature: 0.7,
    stop_sequences: ["\n\nHuman:"]
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`Claude API error: ${response.statusText}`);
  }
  const result = await response.json();
  return result.completion.trim();
}
