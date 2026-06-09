const Dashboard = {
  _statusConfig: {
    afloat: { emoji: '\u{1F7E2}', label: 'Afloat' },
    risk: { emoji: '\u{1F7E1}', label: 'At Risk' },
    crisis: { emoji: '\u{1F534}', label: 'In Crisis' }
  },

  _weekdayName(date) {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
  },

  render() {
    const today = new Date();
    const isWorkDay = Scheduler._isWorkDay(today);
    const tickets = Scheduler.ensureTodayTickets();

    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('exercise-detail').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');

    const avatar = AppState.getAvatar();
    document.getElementById('avatar-emoji').textContent = avatar.emoji;
    document.getElementById('player-title').textContent = avatar.title;
    document.getElementById('player-exercises').textContent = AppState.getCompletedCount() + ' exercises';

    const status = AppState.getCompanyStatus();
    const sc = this._statusConfig[status] || this._statusConfig.afloat;
    document.getElementById('company-status').textContent = sc.emoji + ' ' + sc.label;
    document.getElementById('company-status').className = 'status-badge status-' + status;

    document.getElementById('streak-count').textContent = AppState.getStreak();
    document.getElementById('day-number').textContent = AppState.getDayCount() + 1;
    document.getElementById('day-name').textContent = this._weekdayName(today);

    const container = document.getElementById('tickets-container');
    container.innerHTML = '';

    if (!isWorkDay) {
      container.innerHTML = '<div class="weekend-msg">Weekend — the company breathes. Come back on Monday.</div>';
    } else if (!tickets || tickets.length === 0) {
      container.innerHTML = '<div class="weekend-msg">All projects shipped! Only maintenance remains. Check back tomorrow.</div>';
    } else {
      tickets.forEach(t => this._renderTicket(t, container));
    }

    this._renderPatternProgress(document.getElementById('pattern-progress'));
  },

  _renderTicket(ticket, container) {
    const done = AppState.isTicketCompleted(ticket.ticketId);
    const card = document.createElement('div');
    card.className = 'ticket-card' + (done ? ' completed' : '');
    card.innerHTML = `
      <div class="ticket-header">
        <span class="ticket-id">${ticket.ticketId}</span>
        <span class="ticket-type ${ticket.type}">${ticket.type === 'review' ? '\u{1F501} Review' : '\u{1F195} New'}</span>
        <span class="ticket-estimate">~${ticket.estimateMinutes} min</span>
      </div>
      <h3 class="ticket-title">${ticket.title}</h3>
      <p class="ticket-context">${ticket.context}</p>
      <div class="ticket-meta">
        <span class="pattern-badge">${ticket.pattern}</span>
        <span class="ticket-status ${done ? 'done' : 'pending'}">${done ? 'Done' : 'Pending'}</span>
      </div>
      <button class="start-ticket-btn" data-ticket-id="${ticket.ticketId}" ${done ? 'disabled' : ''}>
        ${done ? 'Completed' : 'Start Ticket \u2192'}
      </button>
    `;
    container.appendChild(card);
  },

  _renderPatternProgress(container) {
    const groups = {};
    exercises.forEach(ex => {
      const g = ex.patternGroup;
      if (!groups[g]) groups[g] = { total: 0, done: 0 };
      groups[g].total++;
      if (AppState.isCompleted(ex.id)) groups[g].done++;
    });
    container.innerHTML = '';
    Object.entries(groups).forEach(([name, data]) => {
      const pct = data.total > 0 ? Math.round((data.done / data.total) * 100) : 0;
      const bar = document.createElement('div');
      bar.className = 'pattern-bar';
      bar.innerHTML = `
        <div class="pattern-row">
          <span class="pattern-name">${name}</span>
          <span class="pattern-count">${data.done}/${data.total}</span>
        </div>
        <div class="pattern-track">
          <div class="pattern-fill" style="width:${pct}%"></div>
        </div>
      `;
      container.appendChild(bar);
    });
  }
};
