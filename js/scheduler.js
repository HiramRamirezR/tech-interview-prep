const Scheduler = {
  _isWorkDay(date) {
    const day = date.getDay();
    return day >= 1 && day <= 6;
  },

  _workDaysBetween(d1, d2) {
    let count = 0;
    const current = new Date(d1);
    current.setDate(current.getDate() + 1);
    while (current <= d2) {
      if (this._isWorkDay(current)) count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  },

  _missedWorkDays() {
    const lastWorkDay = AppState.getLastWorkDay();
    if (!lastWorkDay) return 0;
    const today = new Date();
    const between = this._workDaysBetween(new Date(lastWorkDay), today);
    return Math.max(0, between - 1);
  },

  _checkCompanyStatus() {
    const lastWorkDay = AppState.getLastWorkDay();
    if (!lastWorkDay) return 'afloat';
    const today = new Date();
    if (!this._isWorkDay(today)) return AppState.getCompanyStatus();
    const missed = this._missedWorkDays();
    if (missed <= 0) return 'afloat';
    if (missed === 1) return 'risk';
    return 'crisis';
  },

  _pickReview(excludeIds) {
    const history = AppState.getHistory();
    if (history.length === 0) return null;
    const today = new Date();
    const candidates = [];
    const seen = new Set();
    for (const entry of history) {
      if (seen.has(entry.exerciseId)) continue;
      if (excludeIds && excludeIds.includes(entry.exerciseId)) continue;
      const entryDate = new Date(entry.date);
      const workDays = this._workDaysBetween(entryDate, today);
      if (workDays === 1 || workDays === 3 || workDays === 7) {
        candidates.push(entry);
        seen.add(entry.exerciseId);
      }
    }
    if (candidates.length === 0) return null;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    const ex = exercises.find(e => e.id === pick.exerciseId);
    if (!ex || !ex.variants || ex.variants.length === 0) return null;
    const usedTickets = history.filter(h => h.exerciseId === ex.id).map(h => h.ticketId);
    const available = ex.variants.filter(v => !usedTickets.includes(v.ticketId));
    const variant = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : ex.variants[0];
    const estimate = ex.difficulty === 1 ? 10 : ex.difficulty === 2 ? 15 : 22;
    return {
      ticketId: variant.ticketId,
      exerciseId: ex.id,
      title: variant.title,
      context: variant.context,
      type: 'review',
      pattern: ex.pattern,
      patternGroup: ex.patternGroup,
      estimateMinutes: estimate
    };
  },

  _pickNew(excludeIds) {
    const completed = AppState.getCompletedExerciseIds();
    const used = new Set([...completed, ...(excludeIds || [])]);
    const levels = ['entry', 'junior', 'mid'];
    for (const level of levels) {
      const available = exercises.filter(ex => ex.level === level && !used.has(ex.id));
      if (available.length > 0) {
        const pick = available[0];
        const variant = pick.variants && pick.variants.length > 0 ? pick.variants[0] : null;
        const estimate = pick.difficulty === 1 ? 10 : pick.difficulty === 2 ? 15 : 22;
        return {
          ticketId: variant ? variant.ticketId : 'NEW-' + pick.id,
          exerciseId: pick.id,
          title: variant ? variant.title : pick.title,
          context: variant ? variant.context : pick.description,
          type: 'new',
          pattern: pick.pattern,
          patternGroup: pick.patternGroup,
          estimateMinutes: estimate
        };
      }
    }
    return null;
  },

  _generate() {
    const status = this._checkCompanyStatus();
    AppState.setCompanyStatus(status);
    const lastWorkDay = AppState.getLastWorkDay();
    if (lastWorkDay) {
      const missed = this._missedWorkDays();
      if (missed > 0) AppState.setStreak(0);
    }
    const tickets = [];
    const usedExerciseIds = [];

    while (tickets.length < 5) {
      const review = this._pickReview(usedExerciseIds);
      if (review) {
        tickets.push(review);
        usedExerciseIds.push(review.exerciseId);
        continue;
      }
      const nextNew = this._pickNew(usedExerciseIds);
      if (!nextNew) break;
      tickets.push(nextNew);
      usedExerciseIds.push(nextNew.exerciseId);
    }

    return tickets;
  },

  ensureTodayTickets() {
    const existing = AppState.getTicketsForToday();
    if (existing) return existing;
    if (!this._isWorkDay(new Date())) return null;
    const tickets = this._generate();
    AppState.saveTicketsForToday(tickets);
    AppState.setLastWorkDay(AppState.getTodayStr());
    return tickets;
  }
};
