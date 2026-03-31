const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

export async function generatePostContent(apiKey, prompt) {
  const systemPrompt = `Eres el community manager de Eve Nuts, una marca de cremas de frutos secos premium (Crema de Maní, Choco Avellana, Crema de Pistacho). Tu trabajo es generar contenido para posts de Instagram.

La voz de la marca es: cercana, divertida, natural, premium pero accesible. Slogan: "Snackea con conciencia".

Responde SIEMPRE en formato JSON con esta estructura exacta (sin markdown, solo JSON puro):
{
  "headline": "Titulo corto y llamativo (max 5 palabras)",
  "subtitle": "Descripcion o frase secundaria (max 15 palabras)",
  "cta": "Texto del boton de accion (max 4 palabras)",
  "badge": "Texto del badge como NUEVO, -20%, 2x1, etc (max 6 caracteres, vacio si no aplica)",
  "caption": "Caption para Instagram con emojis y hashtags (2-3 lineas)"
}`

  const res = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error: ${res.status}`)
  }

  const data = await res.json()
  const text = data.content?.[0]?.text || ''

  try {
    return JSON.parse(text)
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) return JSON.parse(jsonMatch[0])
    throw new Error('No se pudo parsear la respuesta de Claude')
  }
}
