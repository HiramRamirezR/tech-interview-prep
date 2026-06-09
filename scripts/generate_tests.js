const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'js', 'data.js');
const BASE_DIR = path.join(ROOT, 'practice-python');

const src = fs.readFileSync(DATA_FILE, 'utf8');
const code = src.replace(/^const exercises =/, 'return ');
const getExercises = new Function(code);
const exercises = getExercises();

if (!exercises || !Array.isArray(exercises)) {
  console.error('Failed to parse exercises from data.js');
  process.exit(1);
}

console.log(`Found ${exercises.length} exercises\n`);

let created = 0;

for (const ex of exercises) {
  const id = String(ex.id).padStart(2, '0');
  const slug = ex.pattern;
  const dirName = `ex-${id}-${slug}`;
  const dirPath = path.join(BASE_DIR, dirName);

  fs.mkdirSync(dirPath, { recursive: true });

  const testPath = path.join(dirPath, 'test_solution.py');
  fs.writeFileSync(testPath, ex.testCode.trim() + '\n', 'utf8');

  const solPath = path.join(dirPath, 'solution.py');
  if (!fs.existsSync(solPath)) {
    fs.writeFileSync(solPath, '# Your solution here\n', 'utf8');
  }

  created++;
}

console.log(`Done. Created ${created} exercise directories.`);
