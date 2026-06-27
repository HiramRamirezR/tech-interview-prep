const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { question, answer } = JSON.parse(event.body);

    if (!question || !answer) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'question and answer are required' })
      };
    }

    const prompt = `Eres un entrevistador técnico experto evaluando una respuesta de entrevista.

Pregunta: "${question}"
Respuesta del candidato: "${answer}"

Evalúa la respuesta y devuelve un JSON con esta estructura exacta (sin markdown, solo JSON):
{
  "score": <número del 0 al 100>,
  "feedback": "<feedback detallado en 2-3 oraciones>",
  "strengths": ["<fortaleza 1>", "<fortaleza 2>", ...],
  "improvements": ["<mejora 1>", "<mejora 2>", ...],
  "modelAnswer": "<respuesta modelo ideal o null si no aplica>"
}

Sé objetivo y constructivo. Si la respuesta está vacía o es muy corta, asigna un score bajo.`;

    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'Eres un evaluador técnico experto. Siempre respondes en Español con JSON válido.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return {
        statusCode: 502,
        body: JSON.stringify({ error: `Groq API error: ${errText}` })
      };
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();

    // Parse JSON from response (handle possible markdown wrapping)
    let result;
    try {
      result = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No se pudo parsear la respuesta de Groq');
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
