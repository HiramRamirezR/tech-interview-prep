// ===== State =====
let currentTicket = null;
let returnToLibrary = false;
let timerInterval = null;
let timerSeconds = 0;
let whiteboardActive = false;
let hintsRevealed = 0;
let modelSolutionVisible = false;

const COMPLEXITY = {
  1: { time: "O(n)", space: "O(n)" },
  2: { time: "O(n)", space: "O(n)" },
  3: { time: "O(n)", space: "O(1)" },
  4: { time: "O(n)", space: "O(1)" },
  5: { time: "O(n)", space: "O(n)" },
  6: { time: "O(n)", space: "O(1)" },
  7: { time: "O(n log n)", space: "O(n)" },
  8: { time: "O(n)", space: "O(k)" },
  9: { time: "O(n)", space: "O(n)" },
  10: { time: "O(n)", space: "O(n)" },
  11: { time: "O(n)", space: "O(n)" },
  12: { time: "O(n)", space: "O(n)" },
  13: { time: "O(n log n)", space: "O(1)" },
  14: { time: "O(n log n)", space: "O(n)" },
  15: { time: "O(n)", space: "O(1)" },
  16: { time: "O(n)", space: "O(1)" },
  17: { time: "O(n)", space: "O(n)" },
  18: { time: "O(n)", space: "O(1)" },
  19: { time: "O(n)", space: "O(1)" },
  20: { time: "O(n)", space: "O(1)" },
  21: { time: "O(n)", space: "O(1)" },
  22: { time: "O(n)", space: "O(n)" },
  23: { time: "O(n)", space: "O(1)" },
  24: { time: "O(n log n)", space: "O(1)" },
  25: { time: "O(n log n)", space: "O(1)" },
  26: { time: "O(log n)", space: "O(1)" },
  27: { time: "O(1)", space: "O(1)" },
  28: { time: "O(n)", space: "O(n)" },
  29: { time: "O(n)", space: "O(1)" },
  30: { time: "O(n)", space: "O(1)" },
  31: { time: "O(n)", space: "O(1)" },
  32: { time: "O(n)", space: "O(n)" },
  33: { time: "O(n)", space: "O(1)" },
  34: { time: "O(log n)", space: "O(1)" },
  35: { time: "O(n)", space: "O(1)" },
  36: { time: "O(n)", space: "O(1)" },
  37: { time: "O(n)", space: "O(n)" },
  38: { time: "O(n)", space: "O(n)" },
  39: { time: "O(n)", space: "O(1)" },
  40: { time: "O(n)", space: "O(1)" },
  41: { time: "O(mn)", space: "O(mn)" },
  42: { time: "O(n\u00b2)", space: "O(1)" },
  43: { time: "O(n\u00b2)", space: "O(1)" },
  44: { time: "O(n)", space: "O(1)" },
  45: { time: "O(log n)", space: "O(1)" },
  46: { time: "O(n)", space: "O(n)" },
  47: { time: "O(n)", space: "O(n)" },
  48: { time: "O(\u221an)", space: "O(1)" },
  49: { time: "O(n)", space: "O(n)" }
};

const EDGE_CASES = {
  "Strings": [
    "Empty string \"\"",
    "Single character",
    "All uppercase / all lowercase characters",
    "String with spaces",
    "Very long string"
  ],
  "Arrays": [
    "Empty array []",
    "Single element array",
    "All identical elements",
    "Negative numbers",
    "Array with one element vs many"
  ],
  "Hash Maps": [
    "Empty dictionary {}",
    "All keys are the same hash",
    "Key does not exist",
    "Very large dataset"
  ],
  "Sorting": [
    "Already sorted array",
    "Reverse sorted array",
    "Empty array",
    "Single element",
    "All identical elements"
  ],
  "Two Pointers": [
    "Empty list",
    "Single element",
    "No valid pair exists",
    "All elements are the same value"
  ],
  "Sliding Window": [
    "Window size larger than array",
    "Window size of 1",
    "All negative numbers",
    "Empty array"
  ],
  "Recursion & Iteration": [
    "n = 0 or n = 1",
    "Negative input (if applicable)",
    "Very large input (stack overflow risk)",
    "Base case not handled"
  ],
  "Logic": [
    "Empty input",
    "Boundary values (0, 1, max)",
    "All-true / all-false scenario",
    "Single element input"
  ],
  "DP & Recursion": [
    "Empty input",
    "Single element",
    "All same values",
    "Large input (optimization needed)"
  ],
  "Searching": [
    "Target not in list",
    "Empty list",
    "Target is first / last element",
    "Duplicate values"
  ],
  "Stacks": [
    "Empty stack (pop on empty)",
    "Single element push/pop",
    "Nested structures",
    "Unmatched closing bracket"
  ],
  "Logic & Math": [
    "Input is 0 or 1",
    "Negative numbers",
    "Large inputs",
    "Edge of integer bounds"
  ]
};

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
  document.getElementById('back-btn').addEventListener('click', () => {
    if (returnToLibrary) showLibrary(); else showDashboard();
  });
  document.getElementById('library-btn').addEventListener('click', showLibrary);
  document.getElementById('back-to-dashboard-from-lib').addEventListener('click', showDashboard);
  document.getElementById('show-reference-btn').addEventListener('click', toggleModelSolution);

  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      AppState.resetAll();
      location.reload();
    }
  });

  document.getElementById('tickets-container').addEventListener('click', (e) => {
    const btn = e.target.closest('.start-ticket-btn');
    if (!btn) return;
    const ticketId = btn.dataset.ticketId;
    const tickets = AppState.getTicketsForToday();
    const ticket = tickets ? tickets.find(t => t.ticketId === ticketId) : null;
    if (ticket) showExerciseFromTicket(ticket);
  });
  document.getElementById('library-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.library-card');
    if (!card) return;
    const id = parseInt(card.dataset.exId);
    if (!id) return;
    const ex = exercises.find(e => e.id === id);
    if (!ex) return;
    if (!AppState.isLevelUnlocked(ex.level)) return;
    showExerciseById(id);
  });

  // Populate pattern filter
  const patternFilter = document.getElementById('lib-pattern-filter');
  const groups = new Set(exercises.map(ex => ex.patternGroup));
  groups.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = g;
    patternFilter.appendChild(opt);
  });

  document.getElementById('lib-search').addEventListener('input', renderLibraryGrid);
  document.getElementById('lib-level-filter').addEventListener('change', renderLibraryGrid);
  document.getElementById('lib-pattern-filter').addEventListener('change', renderLibraryGrid);
});

// ===== Navigation =====
function showDashboard() {
  stopTimer();
  whiteboardActive = false;
  hintsRevealed = 0;
  currentTicket = null;
  returnToLibrary = false;
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('exercise-detail').classList.add('hidden');
  document.getElementById('library').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  Dashboard.render();
  document.getElementById('exercise-detail').classList.remove('whiteboard');
  document.getElementById('whiteboard-toggle').classList.remove('active');
  document.getElementById('whiteboard-toggle').textContent = 'Whiteboard Mode';
}

function showLibrary() {
  stopTimer();
  whiteboardActive = false;
  hintsRevealed = 0;
  currentTicket = null;
  returnToLibrary = false;
  document.getElementById('welcome-screen').classList.add('hidden');
  document.getElementById('exercise-detail').classList.add('hidden');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('library').classList.remove('hidden');
  renderLibraryGrid();
}

function renderLibraryGrid() {
  if (!exercises || !exercises.length) {
    document.getElementById('library-grid').innerHTML = '<div class="weekend-msg">No exercises loaded.</div>';
    return;
  }
  const searchVal = document.getElementById('lib-search').value.toLowerCase().trim();
  const levelVal = document.getElementById('lib-level-filter').value;
  const patternVal = document.getElementById('lib-pattern-filter').value;
  const grid = document.getElementById('library-grid');
  grid.innerHTML = '';
  const filtered = exercises.filter(ex => {
    if (levelVal !== 'all' && ex.level !== levelVal) return false;
    if (patternVal !== 'all' && ex.patternGroup !== patternVal) return false;
    if (searchVal) {
      const inTitle = ex.title.toLowerCase().includes(searchVal);
      const inDesc = ex.description.toLowerCase().includes(searchVal);
      const inPattern = ex.pattern.toLowerCase().includes(searchVal);
      const inGroup = ex.patternGroup.toLowerCase().includes(searchVal);
      if (!inTitle && !inDesc && !inPattern && !inGroup) return false;
    }
    return true;
  });
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="weekend-msg">No exercises match your filters.</div>';
    return;
  }
  filtered.forEach(ex => {
    const level = ex.level;
    const unlocked = AppState.isLevelUnlocked(level);
    const completed = AppState.isCompleted(ex.id);
    let stateClass = 'available';
    let stateLabel = 'Start';
    if (!unlocked) { stateClass = 'locked'; stateLabel = 'Locked'; }
    else if (completed) { stateClass = 'completed'; stateLabel = 'Review'; }
    const stars = '\u2605'.repeat(ex.difficulty) + '\u2606'.repeat(3 - ex.difficulty);
    const card = document.createElement('div');
    card.className = 'library-card ' + stateClass + ' level-' + level;
    card.dataset.exId = ex.id;
    const shortDesc = ex.description.length > 80 ? ex.description.slice(0, 80) + '...' : ex.description;
    card.innerHTML = `
      <div class="lib-card-top">
        <span class="lib-badge level-${level}">${level.charAt(0).toUpperCase() + level.slice(1)}</span>
        <span class="lib-stars">${stars}</span>
      </div>
      <div class="lib-card-body">
        <h3>${ex.title}</h3>
        <p>${shortDesc}</p>
      </div>
      <div class="lib-card-footer">
        <span class="lib-pattern">${ex.pattern}</span>
        <span class="lib-status ${stateClass}">${stateLabel}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function showExerciseFromTicket(ticket) {
  returnToLibrary = false;
  currentTicket = ticket;
  const ex = exercises.find(e => e.id === ticket.exerciseId);
  if (!ex) return;
  _enterExercise(ex, {
    title: ticket.title,
    desc: ticket.context,
    showTicket: true,
    ticketId: ticket.ticketId,
    ticketType: ticket.type,
    estimateMin: ticket.estimateMinutes
  });
}

function showExerciseById(id) {
  returnToLibrary = true;
  currentTicket = null;
  const ex = exercises.find(e => e.id === id);
  if (!ex) return;
  _enterExercise(ex, {
    title: ex.title,
    desc: ex.description,
    showTicket: false,
    estimateMin: ex.difficulty === 1 ? 10 : ex.difficulty === 2 ? 15 : 22
  });
}

function _enterExercise(ex, opts) {
  stopTimer();
  whiteboardActive = false;
  hintsRevealed = 0;
  modelSolutionVisible = false;
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('library').classList.add('hidden');
  document.getElementById('exercise-detail').classList.remove('hidden');
  document.getElementById('exercise-detail').classList.remove('whiteboard');
  document.getElementById('whiteboard-toggle').textContent = 'Whiteboard Mode';
  document.getElementById('whiteboard-toggle').classList.remove('active');

  document.getElementById('back-btn').textContent = returnToLibrary ? '\u2190 Back to Library' : '\u2190 Back to Dashboard';

  document.getElementById('ex-category').textContent = ex.category;
  document.getElementById('ex-title').textContent = opts.title;
  document.getElementById('ex-description').textContent = opts.desc;
  document.getElementById('ex-context-label').textContent = returnToLibrary ? 'Description' : 'Ticket Context';

  const showTicket = opts.showTicket && opts.ticketId;
  document.getElementById('ex-ticket-id').textContent = showTicket ? opts.ticketId : '';
  document.getElementById('ex-ticket-id').className = 'ticket-id-badge' + (showTicket ? '' : ' hidden-badge');
  document.getElementById('ex-ticket-type').textContent = showTicket ? (opts.ticketType === 'review' ? 'Review' : 'New') : '';
  document.getElementById('ex-ticket-type').className = 'ticket-type-badge ' + (opts.ticketType || '') + (showTicket ? '' : ' hidden-badge');

  const stars = '\u2605'.repeat(ex.difficulty) + '\u2606'.repeat(3 - ex.difficulty);
  document.getElementById('ex-difficulty').textContent = LEVEL_CONFIG[ex.level].icon + ' ' + stars;
  document.getElementById('ex-difficulty').className = 'difficulty ' + LEVEL_CONFIG[ex.level].class;

  document.getElementById('test-code').textContent = ex.testCode;

  const saved = AppState.getSolution(ex.id);
  document.getElementById('user-solution').value = saved;
  document.getElementById('save-status').textContent = '';

  const cx = COMPLEXITY[ex.id];
  if (cx && saved) {
    const badge = document.getElementById('complexity-badge');
    badge.textContent = 'Time: ' + cx.time + ' \u00B7 Space: ' + cx.space;
    badge.className = 'complexity-badge';
  } else {
    document.getElementById('complexity-badge').className = 'complexity-badge hidden';
  }

  document.getElementById('model-solution-section').classList.add('hidden');
  document.getElementById('model-solution-content').textContent = ex.modelSolution;
  document.getElementById('show-reference-btn').classList.add('hidden');

  renderHints(ex.hints);
  renderEdgeCases(ex.patternGroup);
  resetTimerDisplay();
  document.getElementById('timer-toggle').textContent = 'Start Timer (' + opts.estimateMin + ' min)';
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

// ===== Edge Cases =====
function renderEdgeCases(patternGroup) {
  const list = document.getElementById('ex-edge-cases');
  const cases = EDGE_CASES[patternGroup];
  list.innerHTML = '';
  if (!cases) return;
  cases.forEach(c => {
    const li = document.createElement('li');
    li.textContent = c;
    list.appendChild(li);
  });
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

  const cx = COMPLEXITY[ex.id];
  if (cx) {
    const badge = document.getElementById('complexity-badge');
    badge.textContent = 'Time: ' + cx.time + ' \u00B7 Space: ' + cx.space;
    badge.className = 'complexity-badge';
  }

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
