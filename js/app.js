// ===== State =====
let currentTicket = null;
let timerInterval = null;
let timerSeconds = 0;
let whiteboardActive = false;
let hintsRevealed = 0;
let modelSolutionVisible = false;

const LEVEL_CONFIG = {
  entry: { label: 'Entry', icon: '\u2B50', class: 'level-entry', next: 'junior' },
  junior: { label: 'Junior', icon: '\u2B50\u2B50', class: 'level-junior', next: 'mid' },
  mid: { label: 'Mid', icon: '\u2B50\u2B50\u2B50', class: 'level-mid', next: null }
};

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  showDashboard();
  updateGlobalProgress();
  document.getElementById('save-btn').addEventListener('click', saveSolution);
  document.getElementById('copy-btn').addEventListener('click', copyTests);
  document.getElementById('whiteboard-toggle').addEventListener('click', toggleWhiteboard);
  document.getElementById('timer-toggle').addEventListener('click', toggleTimer);
  document.getElementById('reveal-hint-btn').addEventListener('click', revealNextHint);
  document.getElementById('back-to-dashboard').addEventListener('click', showDashboard);
  document.getElementById('show-reference-btn').addEventListener('click', toggleModelSolution);
  document.getElementById('tickets-container').addEventListener('click', (e) => {
    const btn = e.target.closest('.start-ticket-btn');
    if (!btn) return;
    const ticketId = btn.dataset.ticketId;
    const tickets = AppState.getTicketsForToday();
    const ticket = tickets ? tickets.find(t => t.ticketId === ticketId) : null;
    if (ticket) showExercise(ticket);
  });
});

// ===== Navigation =====
function showDashboard() {
  stopTimer();
  whiteboardActive = false;
  hintsRevealed = 0;
  currentTicket = null;
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('exercise-detail').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  Dashboard.render();
  document.getElementById('exercise-detail').classList.remove('whiteboard');
  document.getElementById('whiteboard-toggle').classList.remove('active');
  document.getElementById('whiteboard-toggle').textContent = 'Whiteboard Mode';
}

function showExercise(ticket) {
  currentTicket = ticket;
  const ex = exercises.find(e => e.id === ticket.exerciseId);
  if (!ex) return;
  stopTimer();
  whiteboardActive = false;
  hintsRevealed = 0;
  modelSolutionVisible = false;
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('exercise-detail').classList.remove('hidden');
  document.getElementById('exercise-detail').classList.remove('whiteboard');
  document.getElementById('whiteboard-toggle').textContent = 'Whiteboard Mode';
  document.getElementById('whiteboard-toggle').classList.remove('active');

  document.getElementById('ex-category').textContent = ex.category;
  document.getElementById('ex-title').textContent = ticket.title;
  document.getElementById('ex-ticket-id').textContent = ticket.ticketId;
  document.getElementById('ex-ticket-type').textContent = ticket.type === 'review' ? 'Review' : 'New';
  document.getElementById('ex-ticket-type').className = 'ticket-type-badge ' + ticket.type;
  document.getElementById('ex-description').textContent = ticket.context;

  const stars = '\u2605'.repeat(ex.difficulty) + '\u2606'.repeat(3 - ex.difficulty);
  document.getElementById('ex-difficulty').textContent = LEVEL_CONFIG[ex.level].icon + ' ' + stars;
  document.getElementById('ex-difficulty').className = 'difficulty ' + LEVEL_CONFIG[ex.level].class;

  document.getElementById('test-code').textContent = ex.testCode;

  const saved = AppState.getSolution(ex.id);
  document.getElementById('user-solution').value = saved;
  document.getElementById('save-status').textContent = '';

  document.getElementById('model-solution-section').classList.add('hidden');
  document.getElementById('model-solution-content').textContent = ex.modelSolution;
  document.getElementById('show-reference-btn').classList.add('hidden');

  renderHints(ex.hints);
  resetTimerDisplay();
  document.getElementById('timer-toggle').textContent = 'Start Timer (' + ticket.estimateMinutes + ' min)';
  document.getElementById('timer-toggle').classList.remove('active');
  document.getElementById('timer-display').style.display = 'none';
}

// ===== Hints =====
function renderHints(hints) {
  const list = document.getElementById('ex-hints');
  list.innerHTML = '';
  hintsRevealed = 0;
  if (hints.length === 0) {
    document.getElementById('reveal-hint-btn').style.display = 'none';
    return;
  }
  const first = document.createElement('li');
  first.textContent = '\u{1F4A1} ' + hints[0];
  list.appendChild(first);
  hintsRevealed = 1;
  document.getElementById('reveal-hint-btn').style.display = hintsRevealed < hints.length ? 'inline-block' : 'none';
}

function revealNextHint() {
  if (!currentTicket) return;
  const ex = exercises.find(e => e.id === currentTicket.exerciseId);
  if (!ex || hintsRevealed >= ex.hints.length) return;
  const list = document.getElementById('ex-hints');
  const li = document.createElement('li');
  li.textContent = '\u{1F4A1} ' + ex.hints[hintsRevealed];
  list.appendChild(li);
  hintsRevealed++;
  document.getElementById('reveal-hint-btn').style.display = hintsRevealed < ex.hints.length ? 'inline-block' : 'none';
}

// ===== Whiteboard =====
function toggleWhiteboard() {
  whiteboardActive = !whiteboardActive;
  const detail = document.getElementById('exercise-detail');
  const btn = document.getElementById('whiteboard-toggle');
  if (whiteboardActive) {
    detail.classList.add('whiteboard');
    btn.textContent = 'Exit Whiteboard';
    btn.classList.add('active');
  } else {
    detail.classList.remove('whiteboard');
    btn.textContent = 'Whiteboard Mode';
    btn.classList.remove('active');
  }
}

// ===== Timer =====
function toggleTimer() {
  if (timerInterval) { stopTimer(); return; }
  if (!currentTicket) return;
  timerSeconds = currentTicket.estimateMinutes * 60;
  document.getElementById('timer-display').style.display = 'block';
  document.getElementById('timer-toggle').textContent = 'Stop Timer';
  document.getElementById('timer-toggle').classList.add('active');
  document.getElementById('ex-hints').style.display = 'none';
  document.getElementById('reveal-hint-btn').style.display = 'none';
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay();
    if (timerSeconds <= 0) {
      stopTimer();
      document.getElementById('timer-display').classList.add('expired');
      document.getElementById('save-status').textContent = "Time's up! Save what you have.";
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  document.getElementById('ex-hints').style.display = '';
  if (currentTicket) {
    const ex = exercises.find(e => e.id === currentTicket.exerciseId);
    if (ex && hintsRevealed < ex.hints.length) {
      document.getElementById('reveal-hint-btn').style.display = 'inline-block';
    }
  }
  document.getElementById('timer-toggle').textContent = 'Start Timer';
  document.getElementById('timer-toggle').classList.remove('active');
  document.getElementById('timer-display').classList.remove('expired');
}

function updateTimerDisplay() {
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  document.getElementById('timer-countdown').textContent =
    String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function resetTimerDisplay() {
  stopTimer();
  document.getElementById('timer-display').style.display = 'none';
  document.getElementById('timer-display').classList.remove('expired');
}

// ===== Copy =====
function copyTests() {
  const text = document.getElementById('test-code').textContent;
  const done = () => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy Tests'; }, 1500);
  };
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(done);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    done();
  }
}

// ===== Save =====
function saveSolution() {
  if (!currentTicket) return;
  const ex = exercises.find(e => e.id === currentTicket.exerciseId);
  if (!ex) return;
  const code = document.getElementById('user-solution').value.trim();
  if (!code) {
    document.getElementById('save-status').textContent = 'Write a solution first!';
    return;
  }
  const isNewCompletion = !AppState.isCompleted(ex.id);
  AppState.saveSolution(ex.id, code);
  AppState.markCompleted(ex.id);
  AppState.markTicketCompleted(currentTicket.ticketId);
  if (isNewCompletion) {
    AppState.addToHistory({
      date: AppState.getTodayStr(),
      exerciseId: ex.id,
      pattern: ex.pattern,
      ticketId: currentTicket.ticketId
    });
  }
  const tickets = AppState.getTicketsForToday();
  const allDone = tickets && tickets.every(t => AppState.isTicketCompleted(t.ticketId));
  if (allDone) {
    AppState.setStreak(AppState.getStreak() + 1);
  }

  document.getElementById('save-status').textContent = 'Saved! \u2705';
  document.getElementById('model-solution-content').textContent = ex.modelSolution;
  document.getElementById('show-reference-btn').classList.remove('hidden');
  document.getElementById('model-solution-section').classList.add('hidden');
  modelSolutionVisible = false;
  updateGlobalProgress();
}

// ===== Model Solution Toggle =====
function toggleModelSolution() {
  modelSolutionVisible = !modelSolutionVisible;
  const section = document.getElementById('model-solution-section');
  const btn = document.getElementById('show-reference-btn');
  if (modelSolutionVisible) {
    section.classList.remove('hidden');
    btn.textContent = 'Hide Reference';
  } else {
    section.classList.add('hidden');
    btn.textContent = 'Show Reference Solution';
  }
}

// ===== Progress =====
function updateGlobalProgress() {
  document.getElementById('global-progress').textContent =
    AppState.getCompletedCount() + '/' + exercises.length;
}
