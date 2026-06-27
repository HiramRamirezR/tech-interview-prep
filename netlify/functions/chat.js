const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { question, answer, feedback, modelAnswer, history, message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'message is required' })
      };
    }

    const systemPrompt = `Eres un coach técnico experto ayudando a un candidato a mejorar sus respuestas de entrevista.

Contexto de la entrevista:
- Pregunta: "${question || 'N/A'}"
- Respuesta del candidato: "${answer || 'N/A'}"
- Feedback de la evaluación: "${feedback || 'N/A'}"
${modelAnswer ? `- Respuesta modelo: "${modelAnswer}"` : ''}

Tu rol es:
- Explicar conceptos que el candidato no entienda
- Dar ejemplos concretos y prácticos
- Ayudar a estructurar mejores respuestas
- Ser paciente y didáctico
- NO responder por el candidato, sino enseñarle a responder mejor
- Responder siempre en Español`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(history || []),
      { role: 'user', content: message }
    ];

    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.7,
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
    const reply = data.choices[0].message.content.trim();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
