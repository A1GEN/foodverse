import axios from "axios"

export const askAI = async (message) => {
  const key = import.meta.env.VITE_OPENROUTER_KEY
  if (!key) {
    console.error('OpenRouter API key not set (VITE_OPENROUTER_KEY)')
    return 'AI key not configured'
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const content = response?.data?.choices?.[0]?.message?.content
    return content || 'No answer from AI'
  } catch (error) {
    console.error('askAI error', error)
    return 'AI service error'
  }
}