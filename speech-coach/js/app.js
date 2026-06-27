(() => {
  'use strict';

  // --- State ---
  const state = {
    track: 'Python Backend',
    mode: 'practice',
    currentQuestion: null,
    usedQuestionIds: [],
    isRecording: false,
    transcript: '',
    gradingResult: null,
    chatHistory: [],
    isSendingChat: false,
    simulationQuestions: [],
    simulationIndex: 0,
    timerInterval: null,
    timerSeconds: 0,
    timerPhase: 'think',
    isGrading: false
  };

  // --- DOM refs ---
  const $ = id => document.getElementById(id);
  const trackSelect = $('trackSelect');
  const modeSelect = $('modeSelect');
  const newQuestionBtn = $('newQuestionBtn');
  const coachSessionBtn = $('coachSessionBtn');
  const questionText = $('questionText');
  const difficultyBadge = $('difficultyBadge');
  const typeBadge = $('typeBadge');
  const tagsContainer = $('tagsContainer');
  const recordBtn = $('recordBtn');
  const recordBtnText = $('recordBtnText');
  const recordingStatus = $('recordingStatus');
  const transcript = $('transcript');
  const clearBtn = $('clearBtn');
  const gradeBtn = $('gradeBtn');
  const resultPanel = $('resultPanel');
  const scoreDisplay = $('scoreDisplay');
  const feedbackText = $('feedbackText');
  const strengthsList = $('strengthsList');
  const improvementsList = $('improvementsList');
  const modelAnswerSection = $('modelAnswerSection');
  const modelAnswerText = $('modelAnswerText');
  const nextFromResultBtn = $('nextFromResultBtn');
  const timerPanel = $('timerPanel');
  const timerLabel = $('timerLabel');
  const timerValue = $('timerValue');
  const startTimerBtn = $('startTimerBtn');
  const sessionsToday = $('sessionsToday');
  const streakCount = $('streakCount');
  const avgScore = $('avgScore');
  const historyList = $('historyList');
  const chatPanel = $('chatPanel');
  const chatMessages = $('chatMessages');
  const chatInput = $('chatInput');
  const chatSendBtn = $('chatSendBtn');

  // --- Init Recorder ---
  Recorder.init();
  Recorder.onTranscript = (final, interim) => {
    state.transcript += final;
    transcript.value = state.transcript + (interim ? ` ${interim}` : '');
    transcript.scrollTop = transcript.scrollHeight;
  };
  Recorder.onStateChange = (recording) => {
    state.isRecording = recording;
    updateRecordBtn();
    if (!recording && state.transcript) {
      gradeBtn.disabled = false;
      clearBtn.disabled = false;
    }
  };

  // --- Render Question ---
  async function showNewQuestion() {
    const questions = await Questions.load(state.track);
    const question = Questions.getRandom(questions, state.usedQuestionIds);
    if (!question) {
      state.usedQuestionIds = [];
      return showNewQuestion();
    }
    state.currentQuestion = question;
    state.usedQuestionIds.push(question.id);
    state.transcript = '';
    state.gradingResult = null;
    state.chatHistory = [];
    transcript.value = '';
    gradeBtn.disabled = true;
    resultPanel.classList.remove('visible');
    resultPanel.style.display = 'none';
    chatPanel.classList.remove('visible');
    chatPanel.style.display = 'none';
    chatMessages.innerHTML = '';

    questionText.textContent = question.question;
    difficultyBadge.textContent = question.difficulty;
    difficultyBadge.dataset.difficulty = question.difficulty;
    difficultyBadge.style.display = 'inline';
    typeBadge.textContent = question.type;
    typeBadge.dataset.type = question.type;
    typeBadge.style.display = 'inline';

    tagsContainer.innerHTML = question.tags.map(t => `<span class="tag">${t}</span>`).join('');

    recordBtn.disabled = false;
  }

  // --- Recorder UI ---
  function updateRecordBtn() {
    if (state.isRecording) {
      recordBtn.classList.add('recording');
      recordBtnText.textContent = 'Detener grabación';
      recordingStatus.textContent = 'Grabando...';
      recordingStatus.classList.add('active');
    } else {
      recordBtn.classList.remove('recording');
      recordBtnText.textContent = 'Grabar respuesta';
      recordingStatus.textContent = '';
      recordingStatus.classList.remove('active');
    }
  }

  recordBtn.addEventListener('click', () => {
    if (!state.currentQuestion) return;
    Recorder.toggle();
  });

  // --- Clear ---
  clearBtn.addEventListener('click', () => {
    state.transcript = '';
    transcript.value = '';
    gradeBtn.disabled = true;
    clearBtn.disabled = true;
  });

  // --- Grading ---
  gradeBtn.addEventListener('click', async () => {
    if (state.isGrading || !state.currentQuestion || !state.transcript.trim()) return;
    state.isGrading = true;
    gradeBtn.disabled = true;
    gradeBtn.innerHTML = '<span class="loading"></span> Calificando...';

    try {
      const result = await Grader.grade(state.currentQuestion.question, state.transcript);
      showResult(result);
      History.add({
        questionId: state.currentQuestion.id,
        question: state.currentQuestion.question,
        track: state.track,
        answer: state.transcript,
        score: result.score,
        feedback: result.feedback
      });
      updateHistory();
    } catch (err) {
      feedbackText.textContent = `Error: ${err.message}`;
      resultPanel.classList.add('visible');
      resultPanel.style.display = 'block';
    } finally {
      state.isGrading = false;
      gradeBtn.innerHTML = 'Calificar respuesta';
      gradeBtn.disabled = false;
    }
  });

  function showResult(result) {
    scoreDisplay.textContent = result.score;
    feedbackText.textContent = result.feedback;

    strengthsList.innerHTML = (result.strengths || [])
      .map(s => `<li>${s}</li>`).join('');

    improvementsList.innerHTML = (result.improvements || [])
      .map(i => `<li>${i}</li>`).join('');

    if (result.modelAnswer) {
      modelAnswerText.textContent = result.modelAnswer;
      modelAnswerSection.style.display = 'block';
    } else {
      modelAnswerSection.style.display = 'none';
    }

    resultPanel.classList.add('visible');
    resultPanel.style.display = 'block';

    state.gradingResult = result;
    state.chatHistory = [];

    chatMessages.innerHTML = `<div class="chat-msg assistant">¿Algo que no haya quedado claro? Pregúntame sobre la evaluación o la respuesta modelo.</div>`;
    chatPanel.classList.add('visible');
    chatPanel.style.display = 'block';
  }

  // --- Chat ---
  async function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message || state.isSendingChat || !state.gradingResult) return;

    state.isSendingChat = true;
    chatSendBtn.disabled = true;
    chatInput.disabled = true;

    chatMessages.innerHTML += `<div class="chat-msg user">${escapeHtml(message)}</div>`;
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: state.currentQuestion?.question,
          answer: state.transcript,
          feedback: state.gradingResult.feedback,
          modelAnswer: state.gradingResult.modelAnswer,
          history: state.chatHistory,
          message
        })
      });

      if (!res.ok) throw new Error('Error al enviar mensaje');

      const data = await res.json();
      state.chatHistory.push({ role: 'user', content: message });
      state.chatHistory.push({ role: 'assistant', content: data.reply });

      chatMessages.innerHTML += `<div class="chat-msg assistant">${escapeHtml(data.reply)}</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch {
      chatMessages.innerHTML += `<div class="chat-msg assistant" style="color: var(--danger)">Error al conectar. Intenta de nuevo.</div>`;
    } finally {
      state.isSendingChat = false;
      chatSendBtn.disabled = false;
      chatInput.disabled = false;
      chatInput.focus();
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  chatSendBtn.addEventListener('click', sendChatMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });

  nextFromResultBtn.addEventListener('click', showNewQuestion);

  // --- Timer ---
  function startTimer(phase, seconds) {
    clearInterval(state.timerInterval);
    state.timerPhase = phase;
    state.timerSeconds = seconds;

    if (phase === 'think') {
      timerLabel.textContent = 'Tiempo de pensamiento';
    } else {
      timerLabel.textContent = 'Tiempo de respuesta';
    }

    updateTimerDisplay();
    state.timerInterval = setInterval(() => {
      state.timerSeconds--;
      updateTimerDisplay();
      if (state.timerSeconds <= 0) {
        clearInterval(state.timerInterval);
        if (phase === 'think') {
          startTimer('answer', 180);
        } else {
          timerLabel.textContent = '¡Tiempo!';
        }
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const m = String(Math.floor(state.timerSeconds / 60)).padStart(2, '0');
    const s = String(state.timerSeconds % 60).padStart(2, '0');
    timerValue.textContent = `${m}:${s}`;
  }

  startTimerBtn.addEventListener('click', () => {
    startTimer('think', 45);
    startTimerBtn.disabled = true;
  });

  // --- Events ---
  trackSelect.addEventListener('change', () => {
    state.track = trackSelect.value;
    state.usedQuestionIds = [];
    questionText.textContent = 'Selecciona un track y haz clic en "Nueva pregunta" para comenzar.';
    difficultyBadge.style.display = 'none';
    typeBadge.style.display = 'none';
    tagsContainer.innerHTML = '';
    recordBtn.disabled = true;
    gradeBtn.disabled = true;
    resultPanel.classList.remove('visible');
    resultPanel.style.display = 'none';
    chatPanel.classList.remove('visible');
    chatPanel.style.display = 'none';
    state.gradingResult = null;
    state.chatHistory = [];
    updateHistory();
    updateStats();
  });

  modeSelect.addEventListener('change', () => {
    state.mode = modeSelect.value;
    if (state.mode === 'simulation') {
      timerPanel.style.display = 'block';
    } else {
      timerPanel.style.display = 'none';
      clearInterval(state.timerInterval);
    }
  });

  newQuestionBtn.addEventListener('click', showNewQuestion);

  coachSessionBtn.addEventListener('click', async () => {
    const questions = await Questions.load(state.track);
    const history = History.getByTrack(state.track);

    const weak = Questions.getWeakQuestions(questions, history);
    const unpracticed = Questions.getUnpracticed(questions, history);
    const pool = [...new Set([...weak, ...unpracticed, ...questions])];

    const selected = [];
    const used = new Set();
    while (selected.length < 5 && pool.length > 0) {
      const q = Questions.getRandom(pool, [...used]);
      if (!q) break;
      selected.push(q);
      used.add(q.id);
    }

    if (selected.length === 0) {
      questionText.textContent = 'No hay preguntas disponibles para esta sesión.';
      return;
    }

    state.simulationQuestions = selected;
    state.simulationIndex = 0;
    state.usedQuestionIds = [];
    showSimulationQuestion();
  });

  function showSimulationQuestion() {
    if (state.simulationIndex >= state.simulationQuestions.length) {
      questionText.textContent = '¡Simulación completada! Revisa tu historial para ver los resultados.';
      recordBtn.disabled = true;
      gradeBtn.disabled = true;
      return;
    }
    const q = state.simulationQuestions[state.simulationIndex];
    state.currentQuestion = q;
    state.transcript = '';
    transcript.value = '';
    gradeBtn.disabled = true;
    resultPanel.classList.remove('visible');
    resultPanel.style.display = 'none';
    chatPanel.classList.remove('visible');
    chatPanel.style.display = 'none';
    state.gradingResult = null;
    state.chatHistory = [];

    questionText.textContent = q.question;
    difficultyBadge.textContent = q.difficulty;
    difficultyBadge.dataset.difficulty = q.difficulty;
    difficultyBadge.style.display = 'inline';
    typeBadge.textContent = q.type;
    typeBadge.dataset.type = q.type;
    typeBadge.style.display = 'inline';
    tagsContainer.innerHTML = q.tags.map(t => `<span class="tag">${t}</span>`).join('');

    recordBtn.disabled = false;

    if (state.mode === 'simulation') {
      startTimer('think', 45);
      startTimerBtn.disabled = true;
    }
  }

  // --- History ---
  function updateHistory() {
    const items = History.getByTrack(state.track);
    historyList.innerHTML = items.slice(0, 20).map(h => {
      const scoreClass = h.score >= 80 ? 'high' : h.score >= 60 ? 'medium' : 'low';
      const date = new Date(h.date).toLocaleDateString();
      return `<div class="history-item">
        <span class="h-score ${scoreClass}">${h.score}</span>
        ${h.question.slice(0, 60)}...
        <span class="h-date">${date}</span>
      </div>`;
    }).join('');
  }

  function updateStats() {
    sessionsToday.textContent = History.getToday().length;
    streakCount.textContent = History.getStreak();
    const avg = History.getAvgScore(state.track);
    avgScore.textContent = avg !== null ? avg : '-';
  }

  function renderAll() {
    updateHistory();
    updateStats();
  }

  renderAll();
})();
