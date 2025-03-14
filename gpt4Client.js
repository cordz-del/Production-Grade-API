// gpt4Client.js
import openai from 'openai';

export async function getGPT4Response(prompt) {
  const response = await openai.ChatCompletion.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are Amie, a compassionate SEL assistant." },
      { role: "user", content: prompt }
    ],
    max_tokens: 150,
    temperature: 0.7
  });
  return response.choices[0].message.content.trim();
}
