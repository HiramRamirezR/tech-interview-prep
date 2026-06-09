const exercises = [
    {
        id: 1,
        category: "Fundamentals",
        title: "Advanced String Manipulation",
        description: "Create a function called 'camel_to_snake' that receives a camelCase string (e.g., 'myVariableExample') and converts it to snake_case (e.g., 'my_variable_example').",
        hints: [
            "You can use regular expressions (re module) to detect uppercase letters.",
            "Remember to convert the entire final result to lowercase."
        ],
        testCode: `import pytest
from solution import camel_to_snake

def test_basic_conversion():
    assert camel_to_snake("camelCase") == "camel_case"

def test_multiple_words():
    assert camel_to_snake("thisIsATestString") == "this_is_a_test_string"

def test_single_word():
    assert camel_to_snake("hello") == "hello"`
    },
    {
        id: 2,
        category: "Fundamentals",
        title: "Conditional List Comprehensions",
        description: "Write a function 'filter_and_square' that receives a list of integers. It should return a new list with the squares of numbers that are divisible by 3 but not by 2.",
        hints: [
            "Use a list comprehension with multiple conditions.",
            "Order: [expression for item in list if condition1 if condition2]"
        ],
        testCode: `from solution import filter_and_square

def test_basic_filtering():
    input_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    # 3 and 9 are odd and divisible by 3. Squares: 9, 81
    assert filter_and_square(input_list) == [9, 81]

def test_empty_result():
    assert filter_and_square([2, 4, 8]) == []

def test_negative_numbers():
    assert filter_and_square([-3, -6, 9]) == [9, 81]`
    },
    {
        id: 3,
        category: "Fundamentals",
        title: "Dictionaries & Frequency Counting",
        description: "Create a function 'word_frequency' that takes a text string and returns a dictionary where keys are words (lowercase) and values are their occurrence count.",
        hints: [
            "Use split() to get the words.",
            "You can use a simple for loop or collections.Counter."
        ],
        testCode: `from solution import word_frequency

def test_basic_count():
    text = "the cat and the dog"
    result = word_frequency(text)
    assert result["the"] == 2
    assert result["cat"] == 1

def test_case_insensitive():
    text = "Python python PYTHON"
    assert word_frequency(text)["python"] == 3

def test_punctuation_handling():
    text = "hello world hello"
    assert word_frequency(text)["hello"] == 2`
    },
    {
        id: 4,
        category: "Fundamentals",
        title: "Custom Error Handling",
        description: "Create a function 'divide_numbers' that takes two parameters. It must raise a custom 'DivisionByZeroError' if the divisor is 0, and 'InvalidTypeError' if either parameter is not a number (int or float).",
        hints: [
            "Define your exception classes inheriting from Exception.",
            "Use isinstance() to check data types."
        ],
        testCode: `import pytest
from solution import divide_numbers, DivisionByZeroError, InvalidTypeError

def test_valid_division():
    assert divide_numbers(10, 2) == 5.0

def test_zero_division():
    with pytest.raises(DivisionByZeroError):
        divide_numbers(10, 0)

def test_invalid_type():
    with pytest.raises(InvalidTypeError):
        divide_numbers("10", 2)`
    },
    {
        id: 5,
        category: "Fundamentals",
        title: "Generators & Iterators",
        description: "Implement a generator called 'fibonacci_gen' that produces an infinite Fibonacci sequence. Then, create a function 'get_first_n_fib' that uses that generator to return a list with the first N numbers.",
        hints: [
            "Use the yield keyword in the generator.",
            "Remember that generators maintain their state between calls."
        ],
        testCode: `from solution import get_first_n_fib

def test_first_5_fib():
    assert get_first_n_fib(5) == [0, 1, 1, 2, 3]

def test_first_1_fib():
    assert get_first_n_fib(1) == [0]

def test_first_7_fib():
    assert get_first_n_fib(7) == [0, 1, 1, 2, 3, 5, 8]`
    }
];

// --- APP LOGIC ---
let currentExerciseId = null;

document.addEventListener('DOMContentLoaded', () => {
    renderExerciseList();
    loadProgress();
});

function renderExerciseList() {
    const listContainer = document.getElementById('exercise-list');
    listContainer.innerHTML = '';
    exercises.forEach(ex => {
        const div = document.createElement('div');
        div.className = 'exercise-item';
        div.textContent = `${ex.id}. ${ex.title}`;
        div.onclick = () => loadExercise(ex.id);
        if (localStorage.getItem(`ex_${ex.id}_completed`) === 'true') {
            div.classList.add('completed');
        }
        listContainer.appendChild(div);
    });
}

function loadExercise(id) {
    currentExerciseId = id;
    const ex = exercises.find(e => e.id === id);
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('exercise-detail').classList.remove('hidden');
    document.getElementById('ex-category').textContent = ex.category;
    document.getElementById('ex-title').textContent = ex.title;
    document.getElementById('ex-description').textContent = ex.description;
    document.getElementById('test-code').textContent = ex.testCode;

    const hintsList = document.getElementById('ex-hints');
    hintsList.innerHTML = '';
    ex.hints.forEach(hint => {
        const li = document.createElement('li');
        li.textContent = hint;
        hintsList.appendChild(li);
    });

    const savedSolution = localStorage.getItem(`ex_${currentExerciseId}_solution`) || '';
    document.getElementById('user-solution').value = savedSolution;
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Tests copied! Create a test_solution.py file in your local folder.');
    });
}

function saveSolution() {
    if (!currentExerciseId) return;
    const code = document.getElementById('user-solution').value;
    localStorage.setItem(`ex_${currentExerciseId}_solution`, code);
    localStorage.setItem(`ex_${currentExerciseId}_completed`, 'true');
    document.getElementById('save-status').textContent = 'Progress Saved! ✅';
    setTimeout(() => document.getElementById('save-status').textContent = '', 2000);
    renderExerciseList();
    updateGlobalProgress();
}

function loadProgress() {
    updateGlobalProgress();
}

function updateGlobalProgress() {
    const completed = exercises.filter(ex =>
        localStorage.getItem(`ex_${ex.id}_completed`) === 'true'
    ).length;
    document.getElementById('global-progress').textContent = `${completed}/${exercises.length}`;
}