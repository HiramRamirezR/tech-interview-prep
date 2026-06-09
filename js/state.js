const AppState = {
  _prefix: 'dojo_',

  _key(key) {
    return this._prefix + key;
  },

  getTodayStr() {
    return new Date().toISOString().split('T')[0];
  },

  _todayStr() {
    return this.getTodayStr();
  },

  // === Solutions ===
  getSolution(id) {
    return localStorage.getItem(this._key('sol_' + id)) || '';
  },

  saveSolution(id, code) {
    localStorage.setItem(this._key('sol_' + id), code);
  },

  isCompleted(id) {
    return localStorage.getItem(this._key('done_' + id)) === 'true';
  },

  markCompleted(id) {
    localStorage.setItem(this._key('done_' + id), 'true');
  },

  resetExercise(id) {
    localStorage.removeItem(this._key('sol_' + id));
    localStorage.removeItem(this._key('done_' + id));
    const history = this.getHistory().filter(h => h.exerciseId !== id);
    localStorage.setItem(this._key('history'), JSON.stringify(history));
  },

  // === Progress ===
  getCompletedCount() {
    return exercises.filter(ex => this.isCompleted(ex.id)).length;
  },

  getCompletedByLevel(level) {
    return exercises.filter(ex => ex.level === level && this.isCompleted(ex.id)).length;
  },

  getTotalByLevel(level) {
    return exercises.filter(ex => ex.level === level).length;
  },

  getCompletedExerciseIds() {
    return [...new Set(this.getHistory().map(h => h.exerciseId))];
  },

  // === Tickets ===
  getTicketsForToday() {
    const date = localStorage.getItem(this._key('tickets_date'));
    if (date !== this._todayStr()) return null;
    const raw = localStorage.getItem(this._key('tickets'));
    return raw ? JSON.parse(raw) : null;
  },

  saveTicketsForToday(tickets) {
    localStorage.setItem(this._key('tickets'), JSON.stringify(tickets));
    localStorage.setItem(this._key('tickets_date'), this._todayStr());
  },

  markTicketCompleted(ticketId) {
    localStorage.setItem(this._key('tkt_done_' + ticketId), 'true');
  },

  isTicketCompleted(ticketId) {
    return localStorage.getItem(this._key('tkt_done_' + ticketId)) === 'true';
  },

  // === History ===
  addToHistory(entry) {
    const history = this.getHistory();
    history.push(entry);
    localStorage.setItem(this._key('history'), JSON.stringify(history));
  },

  getHistory() {
    const raw = localStorage.getItem(this._key('history'));
    return raw ? JSON.parse(raw) : [];
  },

  // === Streak & Company ===
  getStreak() {
    return parseInt(localStorage.getItem(this._key('streak')) || '0');
  },

  setStreak(n) {
    localStorage.setItem(this._key('streak'), String(n));
    if (n > this.getLongestStreak()) {
      this.setLongestStreak(n);
    }
  },

  getLastWorkDay() {
    return localStorage.getItem(this._key('last_work'));
  },

  setLastWorkDay(d) {
    localStorage.setItem(this._key('last_work'), d);
  },

  getCompanyStatus() {
    return localStorage.getItem(this._key('status')) || 'afloat';
  },

  setCompanyStatus(s) {
    localStorage.setItem(this._key('status'), s);
  },

  getLongestStreak() {
    return parseInt(localStorage.getItem(this._key('longest_streak')) || '0');
  },

  setLongestStreak(n) {
    localStorage.setItem(this._key('longest_streak'), String(n));
  },

  // === Avatar ===
  getAvatar() {
    const count = this.getCompletedCount();
    if (count < 5) return { emoji: '\u{1F423}', title: 'Junior Dev', level: 1 };
    if (count < 10) return { emoji: '\u{1F425}', title: 'Mid Dev', level: 2 };
    if (count < 15) return { emoji: '\u{1F414}', title: 'Senior Dev', level: 3 };
    if (count < 20) return { emoji: '\u{1F985}', title: 'Team Lead', level: 4 };
    return { emoji: '\u{1F409}', title: 'Architect', level: 5 };
  },

  resetAll() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(this._prefix));
    keys.forEach(k => localStorage.removeItem(k));
  },

  isLevelUnlocked(level) {
    if (level === 'entry') return true;
    const prevLevel = level === 'junior' ? 'entry' : 'junior';
    const prevTotal = exercises.filter(ex => ex.level === prevLevel).length;
    const prevDone = exercises.filter(ex => ex.level === prevLevel && this.isCompleted(ex.id)).length;
    return prevDone >= prevTotal;
  },

  getDayCount() {
    const history = this.getHistory();
    if (history.length === 0) return 0;
    const days = new Set(history.map(h => h.date));
    return days.size;
  }
};
