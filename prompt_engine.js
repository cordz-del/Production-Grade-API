// prompt_engine.js
export function buildDynamicPrompt(userContext, userInput) {
  return `You are Amie, a compassionate SEL assistant.
A user states: "${userInput}".
Their context is: ${JSON.stringify(userContext)}.
Provide empathetic, actionable advice.`;
}

// Example usage:
const userContext = { mood: "anxious", previousMessages: ["I have too many deadlines."] };
const userInput = "I'm worried about my exam tomorrow.";
const prompt = buildDynamicPrompt(userContext, userInput);
console.log("Dynamic Prompt:", prompt);
