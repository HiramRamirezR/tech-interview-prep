const Questions = {
  cache: {},
  async load(track) {
    const filename = track === 'Python Backend' ? 'python-backend.json' : 'td-pipeline.json';
    if (this.cache[filename]) return this.cache[filename];
    const res = await fetch(`questions/${filename}`);
    const data = await res.json();
    this.cache[filename] = data;
    return data;
  },
  getRandom(questions, excludeIds = []) {
    const available = questions.filter(q => !excludeIds.includes(q.id));
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  },
  getByTags(questions, tags) {
    return questions.filter(q => q.tags.some(t => tags.includes(t)));
  },
  getWeakQuestions(questions, history) {
    const weakIds = history
      .filter(h => h.score < 60)
      .map(h => h.questionId);
    return questions.filter(q => weakIds.includes(q.id));
  },
  getUnpracticed(questions, history) {
    const practicedIds = new Set(history.map(h => h.questionId));
    return questions.filter(q => !practicedIds.has(q.id));
  }
};
