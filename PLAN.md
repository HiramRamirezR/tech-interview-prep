# Speech Coach — Plan de Implementación

App para practicar respuestas de entrevistas técnicas con speech-to-text y calificación por IA (Groq + Llama).

---

## Fase 0: Setup del proyecto

- [ ] Crear carpeta `speech-coach/` dentro del repo con estructura inicial
- [ ] Agregar `netlify.toml` en la raíz (para desplegar frontend + funciones)
- [ ] Configurar variable de entorno `GROQ_API_KEY` en Netlify
- [ ] Agregar `.env` local (solo desarrollo) con la API key
- [ ] Actualizar `.gitignore` para ignorar `.env` y `node_modules/` si hacen falta

## Fase 1: Preguntas de entrevista

- [ ] Crear `speech-coach/questions/python-backend.json`
  - Preguntas típicas de Python Backend (técnicas + behavioral)
  - Incluir: pregunta, track, dificultad, respuesta modelo (opcional), tags
- [ ] Crear `speech-coach/questions/td-pipeline.json`
  - Preguntas para Junior TD Pipeline Production Developer
  - Misma estructura que python-backend.json
- [ ] Fusionar las preguntas que ya tienes con las que faltan (usar Groq para generar más)

## Fase 2: Frontend base

- [ ] Crear `speech-coach/index.html`
  - Selector de track (Python Backend / TD Pipeline)
  - Selector de modo (práctica libre / simulación)
  - Área de pregunta + respuesta
  - Botón de grabar con Web Speech API
  - Transcript en vivo mientras hablas
  - Botón "Calificar respuesta"
- [ ] Crear `speech-coach/css/styles.css`
  - Misma línea visual que la app actual o nueva identidad
- [ ] Crear `speech-coach/js/app.js`
  - Lógica de navegación entre tracks
  - Lógica de mostrar pregunta aleatoria / por tag
  - Integración con Web Speech API
  - Integración con Netlify Function para calificar

## Fase 3: Netlify Function (AI Grading)

- [ ] Crear `netlify/functions/grade.js`
  - Recibe: `{ question, answer, track }`
  - Llama a Groq API (Llama 3) con un prompt de evaluación
  - Devuelve: `{ score, feedback, strengths, improvements, modelAnswer }`
- [ ] Probar la function localmente con Netlify Dev o simulación

## Fase 4: Historial y progreso

- [ ] Guardar historial de prácticas en `localStorage`
  - Fecha, pregunta, respuesta transcrita, score, feedback
- [ ] Mostrar estadísticas básicas: sesiones hoy, racha, promedio de score por track
- [ ] Opción de repetir preguntas con bajo score (repetición espaciada simple)

## Fase 5: Modo simulación

- [ ] Temporizador tipo entrevista real (45 seg para pensar, 2-3 min para responder)
- [ ] Secuencia de 3-5 preguntas seguidas sin pausa
- [ ] Score final de la simulación con resumen de áreas débiles

## Fase 6: Mentor IA

- [ ] Botón "Prepárame una sesión" que elige preguntas según:
  - Tu track seleccionado
  - Preguntas que te han salido mal
  - Preguntas que no has practicado aún
  - Distribución equilibrada de temas
- [ ] Feedback narrativo al estilo "coach": no solo score, sino qué mejorar y cómo

---

## Estructura final del proyecto

```
tech-interview-prep/
├── index.html                      # App actual de coding
├── css/
├── js/
├── practice-python/               # Ejercicios actuales
├── speech-coach/                   # NUEVA app
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── app.js                  # Lógica principal
│   │   ├── questions.js            # Carga de preguntas
│   │   ├── recorder.js             # Web Speech API + MediaRecorder
│   │   ├── grader.js               # Llamada a Netlify Function
│   │   └── history.js              # Historial localStorage
│   └── questions/
│       ├── python-backend.json
│       └── td-pipeline.json
├── netlify.toml                    # Config Netlify
├── netlify/
│   └── functions/
│       └── grade.js                # Function para calificar con Groq
├── PLAN.md
└── .gitignore
```

## Tech Stack

| Componente | Tecnología |
|---|---|
| Frontend | HTML + CSS + JS vanilla |
| Speech-to-Text | Web Speech API (`SpeechRecognition`) |
| Audio (opcional) | `MediaRecorder` para guardar respuestas |
| AI Grading | Groq API (Llama 3) via Netlify Function |
| Persistencia | localStorage (fase 1-4), opcional: Netlify Blob |
| Despliegue | Netlify (frontend + functions todo en uno) |
