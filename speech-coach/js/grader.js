const Grader = {
  async grade(question, answer) {
    const res = await fetch('/api/grade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer })
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Error calificando: ${err}`);
    }
    return res.json();
  }
};
