const History = {
  STORAGE_KEY: 'speech-coach-history',

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  },

  add(entry) {
    const history = this.getAll();
    history.push({
      ...entry,
      date: new Date().toISOString()
    });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  },

  getToday() {
    const today = new Date().toDateString();
    return this.getAll().filter(h => new Date(h.date).toDateString() === today);
  },

  getStreak() {
    const history = this.getAll();
    if (history.length === 0) return 0;
    const days = [...new Set(history.map(h => new Date(h.date).toDateString()))].sort();
    let streak = 1;
    for (let i = days.length - 1; i > 0; i--) {
      const curr = new Date(days[i]);
      const prev = new Date(days[i - 1]);
      const diff = (curr - prev) / (1000 * 60 * 60 * 24);
      if (diff === 1) streak++;
      else break;
    }
    return streak;
  },

  getAvgScore(track) {
    const history = track
      ? this.getAll().filter(h => h.track === track)
      : this.getAll();
    if (history.length === 0) return null;
    const sum = history.reduce((acc, h) => acc + h.score, 0);
    return Math.round(sum / history.length);
  },

  getByTrack(track) {
    return this.getAll().filter(h => h.track === track).reverse();
  },

  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
};
