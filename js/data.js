const exercises = [
  // ==================== ENTRY LEVEL ====================
  {
    id: 1, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "string-manipulation", patternGroup: "Strings",
    category: "Strings", title: "CamelCase to Snake_Case",
    description: "Create a function 'camel_to_snake' that converts a camelCase string to snake_case.",
    hints: [
      "Iterate character by character and detect uppercase letters.",
      "Insert an underscore before each uppercase letter (except the first), then lowercase everything."
    ],
    testCode: `from solution import camel_to_snake

def test_basic():
    assert camel_to_snake("camelCase") == "camel_case"

def test_complex():
    assert camel_to_snake("myVariableName") == "my_variable_name"

def test_single():
    assert camel_to_snake("hello") == "hello"`,
    modelSolution: `def camel_to_snake(text):
    result = ""
    for i, char in enumerate(text):
        if char.isupper() and i > 0:
            result += "_"
        result += char.lower()
    return result`,
    variants: [
      {
        ticketId: "TKT-001",
        title: "CSS Class Converter",
        context: "The design team uses camelCase in CSS classes but the build system expects snake_case. Convert them."
      },
      {
        ticketId: "TKT-002",
        title: "API Response Normalizer",
        context: "Our API returns camelCase fields but the legacy database stores snake_case. Write a converter."
      }
    ]
  },
  {
    id: 2, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "string-manipulation", patternGroup: "Strings",
    category: "Strings", title: "Palindrome Checker",
    description: "Create 'is_palindrome' that checks if a string is a palindrome, ignoring spaces, punctuation, and case.",
    hints: [
      "Clean the string first: lowercase and remove non-alphanumeric characters.",
      "A string equals its reverse if it's a palindrome."
    ],
    testCode: `from solution import is_palindrome

def test_simple():
    assert is_palindrome("racecar") is True

def test_with_spaces():
    assert is_palindrome("A man a plan a canal Panama") is True

def test_false():
    assert is_palindrome("hello") is False

def test_mixed_case():
    assert is_palindrome("RaceCar") is True`,
    modelSolution: `def is_palindrome(text):
    cleaned = ""
    for ch in text.lower():
        if ch.isalnum():
            cleaned += ch
    return cleaned == cleaned[::-1]`,
    variants: [
      {
        ticketId: "TKT-003",
        title: "DNA Sequence Analyzer",
        context: "Bioinformatics team needs to check if DNA sequences are palindromic (ignoring case)."
      },
      {
        ticketId: "TKT-004",
        title: "Log Mirror Detection",
        context: "Detect mirrored log entries — entries that read the same forwards and backwards."
      }
    ]
  },
  {
    id: 3, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "string-manipulation", patternGroup: "Strings",
    category: "Strings", title: "URL Slug Generator",
    description: "Create 'generate_slug' that turns a title into a URL-friendly slug: lowercase, hyphens instead of spaces, remove special characters.",
    hints: [
      "Convert to lowercase and replace spaces with hyphens first.",
      "Use regex or a loop to remove any character that isn't a letter, digit, or hyphen."
    ],
    testCode: `from solution import generate_slug

def test_basic():
    assert generate_slug("Hello World") == "hello-world"

def test_special_chars():
    assert generate_slug("Python 3.9 is Great!") == "python-39-is-great"

def test_multiple_spaces():
    assert generate_slug("  Extra   spaces  ") == "extra-spaces"`,
    modelSolution: `import re

def generate_slug(title):
    slug = title.lower().strip()
    slug = re.sub(r'\\s+', '-', slug)
    slug = re.sub(r'[^a-z0-9-]', '', slug)
    return slug`,
    variants: [
      {
        ticketId: "TKT-005",
        title: "Blog URL Builder",
        context: "The CMS needs to convert article titles into clean, URL-friendly slugs for the blog."
      },
      {
        ticketId: "TKT-006",
        title: "Product Page Router",
        context: "E-commerce product names need to be converted to clean URLs for the product pages."
      }
    ]
  },
  {
    id: 4, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "array-basics", patternGroup: "Arrays",
    category: "Arrays", title: "Find Maximum in List",
    description: "Create 'find_max' that takes a list of numbers and returns the largest number. Return None if the list is empty.",
    hints: [
      "Initialize a variable with the first element, then loop comparing each element.",
      "Handle the empty list case upfront."
    ],
    testCode: `from solution import find_max

def test_basic():
    assert find_max([3, 1, 4, 1, 5]) == 5

def test_negatives():
    assert find_max([-5, -2, -10]) == -2

def test_single():
    assert find_max([42]) == 42

def test_empty():
    assert find_max([]) is None`,
    modelSolution: `def find_max(numbers):
    if not numbers:
        return None
    max_val = numbers[0]
    for n in numbers:
        if n > max_val:
            max_val = n
    return max_val`,
    variants: [
      {
        ticketId: "TKT-007",
        title: "Sales Report Parser",
        context: "Find the highest sales figure from a monthly report dataset."
      },
      {
        ticketId: "TKT-008",
        title: "Temperature Monitor",
        context: "Find the peak temperature reading from a sensor array."
      }
    ]
  },
  {
    id: 5, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "hash-map", patternGroup: "Hash Maps",
    category: "Strings", title: "Character Frequency",
    description: "Create 'char_frequency' that takes a string and returns a dictionary with the count of each character.",
    hints: [
      "Initialize an empty dict and loop through each character.",
      "Use dict.get(char, 0) to safely increment counts."
    ],
    testCode: `from solution import char_frequency

def test_basic():
    result = char_frequency("hello")
    assert result == {'h': 1, 'e': 1, 'l': 2, 'o': 1}

def test_empty():
    assert char_frequency("") == {}

def test_spaces():
    result = char_frequency("a a")
    assert result['a'] == 2
    assert result[' '] == 1`,
    modelSolution: `def char_frequency(text):
    freq = {}
    for char in text:
        freq[char] = freq.get(char, 0) + 1
    return freq`,
    variants: [
      {
        ticketId: "TKT-009",
        title: "Password Strength Meter",
        context: "Count how many times each character type appears in a password to evaluate strength."
      },
      {
        ticketId: "TKT-010",
        title: "Data Compressor Analyzer",
        context: "Analyze character frequency in log files to identify compression opportunities."
      }
    ]
  },
  {
    id: 6, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "string-manipulation", patternGroup: "Strings",
    category: "Strings", title: "Reverse String",
    description: "Create 'reverse_string' that returns the reverse of a given string. Do not use [::-1] slicing — practice the manual approach.",
    hints: [
      "Build a new string character by character from the end to the start.",
      "Use a loop that goes backwards with range(len(s)-1, -1, -1)."
    ],
    testCode: `from solution import reverse_string

def test_basic():
    assert reverse_string("hello") == "olleh"

def test_palindrome():
    assert reverse_string("racecar") == "racecar"

def test_empty():
    assert reverse_string("") == ""

def test_single():
    assert reverse_string("a") == "a"`,
    modelSolution: `def reverse_string(text):
    result = ""
    for i in range(len(text) - 1, -1, -1):
        result += text[i]
    return result`,
    variants: [
      {
        ticketId: "TKT-011",
        title: "Message Encoder",
        context: "Implement a simple message obfuscation by reversing each string before sending."
      },
      {
        ticketId: "TKT-012",
        title: "Palindrome Helper",
        context: "Internal utility: reverse strings for the palindrome detection module."
      }
    ]
  },

  // ==================== JUNIOR LEVEL ====================
  {
    id: 7, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "string-formatting", patternGroup: "Strings",
    category: "Strings", title: "Phone Number Formatter",
    description: "Create 'format_phone' that takes a 10-digit string and returns '(XXX) XXX-XXXX'. Raise ValueError if input is not exactly 10 digits.",
    hints: [
      "Use string slicing: digits[:3], digits[3:6], digits[6:].",
      "Validate length and that all characters are digits before formatting."
    ],
    testCode: `from solution import format_phone
import pytest

def test_format():
    assert format_phone("5551234567") == "(555) 123-4567"

def test_invalid_length():
    with pytest.raises(ValueError):
        format_phone("123")

def test_non_digit():
    with pytest.raises(ValueError):
        format_phone("555123456a")`,
    modelSolution: `def format_phone(digits):
    if len(digits) != 10 or not digits.isdigit():
        raise ValueError("Input must be exactly 10 digits")
    return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}"`,
    variants: [
      {
        ticketId: "TKT-013",
        title: "Customer Formatter",
        context: "Format raw customer phone numbers from the database into readable (XXX) XXX-XXXX format."
      },
      {
        ticketId: "TKT-014",
        title: "SMS Gateway Integration",
        context: "Normalize phone numbers before sending them to the SMS API. Must be exactly 10 digits."
      }
    ]
  },
  {
    id: 8, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "regex", patternGroup: "Strings",
    category: "Strings", title: "Email Extractor",
    description: "Create 'extract_emails' that finds all valid email addresses in a given text string using regex.",
    hints: [
      "Use re.findall() with a pattern for common email formats.",
      "Start with r'\\b[\\w.+-]+@[\\w-]+\\.[\\w.-]+\\b' as your pattern."
    ],
    testCode: `from solution import extract_emails

def test_extraction():
    text = "Contact us at support@example.com or sales@test.org"
    result = extract_emails(text)
    assert "support@example.com" in result
    assert len(result) == 2

def test_no_emails():
    assert extract_emails("Hello world") == []

def test_edge():
    text = "My email is first.last@sub.domain.co"
    result = extract_emails(text)
    assert "first.last@sub.domain.co" in result`,
    modelSolution: `import re

def extract_emails(text):
    pattern = r'\\b[\\w.+-]+@[\\w-]+\\.[\\w.-]+\\b'
    return re.findall(pattern, text)`,
    variants: [
      {
        ticketId: "TKT-015",
        title: "User Import Script",
        context: "Extract email addresses from a large CSV import to validate user data."
      },
      {
        ticketId: "TKT-016",
        title: "Email Campaign Builder",
        context: "Parse email addresses from raw marketing text to build a campaign recipient list."
      }
    ]
  },
  {
    id: 9, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "hash-map", patternGroup: "Hash Maps",
    category: "Arrays", title: "Two Sum",
    description: "Create 'two_sum' that takes a list of integers and a target integer. Return the indices of the two numbers that add up to the target. Each input has exactly one solution.",
    hints: [
      "Use a dictionary to store each number's index as you iterate.",
      "For each number, check if target - num already exists in the dictionary."
    ],
    testCode: `from solution import two_sum

def test_basic():
    result = two_sum([2, 7, 11, 15], 9)
    assert result == [0, 1]

def test_unordered():
    result = two_sum([3, 2, 4], 6)
    assert result == [1, 2]

def test_negative():
    result = two_sum([-1, -2, -3, -4], -5)
    assert result == [1, 3]`,
    modelSolution: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return []`,
    variants: [
      {
        ticketId: "TKT-017",
        title: "Payment Processor",
        context: "Find two transactions in a list that add up to a specific total amount."
      },
      {
        ticketId: "TKT-018",
        title: "Inventory Check",
        context: "Given product IDs and a target sum, find the two items whose IDs add up to it."
      }
    ]
  },
  {
    id: 10, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "string-manipulation", patternGroup: "Strings",
    category: "Strings", title: "Valid Anagram",
    description: "Create 'is_anagram' that checks if two strings are anagrams (same letters, different order), ignoring case and spaces.",
    hints: [
      "Remove spaces and lowercase both strings.",
      "Compare sorted versions or use a character counter."
    ],
    testCode: `from solution import is_anagram

def test_basic():
    assert is_anagram("listen", "silent") is True

def test_not_anagram():
    assert is_anagram("hello", "world") is False

def test_with_spaces():
    assert is_anagram("The Eyes", "They See") is True

def test_empty():
    assert is_anagram("", "") is True`,
    modelSolution: `def is_anagram(s1, s2):
    clean = lambda s: sorted(s.lower().replace(" ", ""))
    return clean(s1) == clean(s2)`,
    variants: [
      {
        ticketId: "TKT-019",
        title: "Document Comparator",
        context: "Check if two documents contain the same words regardless of order."
      },
      {
        ticketId: "TKT-020",
        title: "Password Validator",
        context: "Verify if two password attempts are anagrams for an additional security check."
      }
    ]
  },
  {
    id: 11, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "iteration", patternGroup: "Recursion & Iteration",
    category: "Recursion", title: "Fibonacci",
    description: "Create 'fibonacci' that returns the n-th Fibonacci number (0-indexed: fib(0) = 0, fib(1) = 1). Use iteration, not recursion.",
    hints: [
      "Start with a, b = 0, 1 and update them in a loop.",
      "For n < 2, return n directly."
    ],
    testCode: `from solution import fibonacci

def test_base():
    assert fibonacci(0) == 0
    assert fibonacci(1) == 1

def test_small():
    assert fibonacci(5) == 5

def test_larger():
    assert fibonacci(10) == 55

def test_sequence():
    assert fibonacci(7) == 13`,
    modelSolution: `def fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b`,
    variants: [
      {
        ticketId: "TKT-021",
        title: "Task Scheduler",
        context: "Calculate task distribution using Fibonacci-based intervals in the scheduler."
      },
      {
        ticketId: "TKT-022",
        title: "Growth Calculator",
        context: "Model population growth patterns using the Fibonacci sequence."
      }
    ]
  },
  {
    id: 12, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "two-pointers", patternGroup: "Arrays",
    category: "Arrays", title: "Remove Duplicates (Sorted)",
    description: "Create 'remove_duplicates' that takes a sorted list and removes duplicates in-place, returning the new length. The first k elements should hold the unique values.",
    hints: [
      "Use two pointers: one for the current position, one for the write position.",
      "Compare each element with the previous one; if different, write it forward."
    ],
    testCode: `from solution import remove_duplicates

def test_basic():
    nums = [1, 1, 2]
    k = remove_duplicates(nums)
    assert k == 2
    assert nums[:k] == [1, 2]

def test_no_dups():
    nums = [1, 2, 3]
    k = remove_duplicates(nums)
    assert k == 3

def test_all_same():
    nums = [5, 5, 5]
    k = remove_duplicates(nums)
    assert k == 1
    assert nums[:k] == [5]

def test_empty():
    assert remove_duplicates([]) == 0`,
    modelSolution: `def remove_duplicates(nums):
    if not nums:
        return 0
    write_idx = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1]:
            nums[write_idx] = nums[i]
            write_idx += 1
    return write_idx`,
    variants: [
      {
        ticketId: "TKT-023",
        title: "Email List Cleaner",
        context: "Clean up a sorted list of email addresses by removing duplicates before the campaign."
      },
      {
        ticketId: "TKT-024",
        title: "Log Deduplicator",
        context: "Remove consecutive duplicate error entries from a sorted server log."
      }
    ]
  },
  {
    id: 13, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "conditionals", patternGroup: "Logic",
    category: "Logic", title: "FizzBuzz",
    description: "Create 'fizzbuzz' that takes a positive integer n and returns a list of strings. For each number 1 to n: 'FizzBuzz' if divisible by 15, 'Fizz' if by 3, 'Buzz' if by 5, otherwise the number as a string.",
    hints: [
      "Check divisibility by 15 first, then 3 and 5.",
      "Build the result list incrementally with .append()."
    ],
    testCode: `from solution import fizzbuzz

def test_basic():
    assert fizzbuzz(5) == ["1", "2", "Fizz", "4", "Buzz"]

def test_fizzbuzz():
    result = fizzbuzz(15)
    assert result[14] == "FizzBuzz"

def test_first():
    assert fizzbuzz(1) == ["1"]

def test_multiple_of_three():
    result = fizzbuzz(3)
    assert result[2] == "Fizz"`,
    modelSolution: `def fizzbuzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result`,
    variants: [
      {
        ticketId: "TKT-025",
        title: "Report Generator",
        context: "Generate a numbered report with conditional labels based on each entry's properties."
      },
      {
        ticketId: "TKT-026",
        title: "Inventory Labeler",
        context: "Label inventory items based on quantity thresholds using conditional logic."
      }
    ]
  },
  {
    id: 14, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "hash-map", patternGroup: "Hash Maps",
    category: "Dicts", title: "Word Frequency",
    description: "Create 'word_frequency' that takes a string and returns a dictionary with the count of each word (case-insensitive, split by whitespace).",
    hints: [
      "Use .lower().split() to get normalized words.",
      "Iterate with dict.get(word, 0) + 1 to count."
    ],
    testCode: `from solution import word_frequency

def test_basic():
    result = word_frequency("hello world hello")
    assert result == {"hello": 2, "world": 1}

def test_case():
    result = word_frequency("Hello hello")
    assert result == {"hello": 2}

def test_empty():
    assert word_frequency("") == {}`,
    modelSolution: `def word_frequency(text):
    words = text.lower().split()
    freq = {}
    for word in words:
        freq[word] = freq.get(word, 0) + 1
    return freq`,
    variants: [
      {
        ticketId: "TKT-027",
        title: "Trend Analyzer",
        context: "Find trending words by counting frequency in customer feedback submissions."
      },
      {
        ticketId: "TKT-028",
        title: "Search Engine Indexer",
        context: "Count word frequencies across crawled pages for the search index."
      }
    ]
  },

  // ==================== MID LEVEL ====================
  {
    id: 15, level: "mid", difficulty: 3, timeLimit: 45,
    pattern: "array-manipulation", patternGroup: "Arrays",
    category: "Arrays", title: "Rotate Array",
    description: "Create 'rotate' that takes a list and integer k, and rotates the list to the right by k steps in-place. Modify the original list and return it.",
    hints: [
      "k may be larger than the list length; use k %= len(nums).",
      "Slicing trick: nums[:] = nums[-k:] + nums[:-k]."
    ],
    testCode: `from solution import rotate

def test_basic():
    nums = [1, 2, 3, 4, 5]
    result = rotate(nums, 2)
    assert result == [4, 5, 1, 2, 3]

def test_k_larger_than_len():
    nums = [1, 2, 3]
    result = rotate(nums, 5)
    assert result == [2, 3, 1]

def test_no_rotation():
    nums = [1, 2]
    result = rotate(nums, 0)
    assert result == [1, 2]

def test_single():
    assert rotate([1], 3) == [1]`,
    modelSolution: `def rotate(nums, k):
    if not nums:
        return nums
    k = k % len(nums)
    if k == 0:
        return nums
    nums[:] = nums[-k:] + nums[:-k]
    return nums`,
    variants: [
      {
        ticketId: "TKT-029",
        title: "Queue Shifter",
        context: "Rotate items in a processing queue by a given number of positions."
      },
      {
        ticketId: "TKT-030",
        title: "Schedule Rotator",
        context: "Rotate employee shifts in a weekly schedule by the requested offset."
      }
    ]
  },
  {
    id: 16, level: "mid", difficulty: 3, timeLimit: 45,
    pattern: "sliding-window", patternGroup: "Strings",
    category: "Strings", title: "Longest Substring Without Repeats",
    description: "Create 'length_of_longest_substring' that takes a string and returns the length of the longest substring without repeating characters.",
    hints: [
      "Use a sliding window with two pointers (left and right).",
      "Track character positions in a dict; when a repeat is found, move the left pointer."
    ],
    testCode: `from solution import length_of_longest_substring

def test_basic():
    assert length_of_longest_substring("abcabcbb") == 3

def test_all_unique():
    assert length_of_longest_substring("abcdef") == 6

def test_same_char():
    assert length_of_longest_substring("aaaa") == 1

def test_empty():
    assert length_of_longest_substring("") == 0

def test_with_spaces():
    assert length_of_longest_substring("ab c ab") == 4`,
    modelSolution: `def length_of_longest_substring(s):
    seen = {}
    start = max_len = 0
    for i, char in enumerate(s):
        if char in seen and seen[char] >= start:
            start = seen[char] + 1
        seen[char] = i
        max_len = max(max_len, i - start + 1)
    return max_len`,
    variants: [
      {
        ticketId: "TKT-031",
        title: "Session Tracker",
        context: "Find the longest continuous user session without repeated page visits."
      },
      {
        ticketId: "TKT-032",
        title: "Stream Analyzer",
        context: "Find the longest segment of unique characters in a real-time data stream."
      }
    ]
  },
  {
    id: 17, level: "mid", difficulty: 3, timeLimit: 45,
    pattern: "dynamic-programming", patternGroup: "DP & Recursion",
    category: "DP", title: "Climbing Stairs",
    description: "Create 'climb_stairs' that takes n steps. You can climb 1 or 2 steps at a time. Return the number of distinct ways to reach the top.",
    hints: [
      "This is the Fibonacci sequence in disguise.",
      "The number of ways to reach step i is ways(i-1) + ways(i-2)."
    ],
    testCode: `from solution import climb_stairs

def test_basic():
    assert climb_stairs(2) == 2
    assert climb_stairs(3) == 3

def test_larger():
    assert climb_stairs(5) == 8

def test_one():
    assert climb_stairs(1) == 1

def test_four():
    assert climb_stairs(4) == 5`,
    modelSolution: `def climb_stairs(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
    variants: [
      {
        ticketId: "TKT-033",
        title: "Staircase Calculator",
        context: "Game dev needs to calculate how many ways a character can climb a staircase (1 or 2 steps at a time)."
      },
      {
        ticketId: "TKT-034",
        title: "Upgrade Path Finder",
        context: "Software has version upgrades that jump 1 or 2 versions — count distinct upgrade paths."
      }
    ]
  },
  {
    id: 18, level: "mid", difficulty: 3, timeLimit: 45,
    pattern: "divide-conquer", patternGroup: "Sorting",
    category: "Sorting", title: "Merge Sort",
    description: "Create 'merge_sort' that implements the merge sort algorithm and returns a new sorted list. Also create a helper 'merge' that merges two sorted lists.",
    hints: [
      "Base case: a list of 0 or 1 elements is already sorted.",
      "Split the list in half, recursively sort each half, then merge."
    ],
    testCode: `from solution import merge_sort

def test_basic():
    assert merge_sort([3, 1, 4, 1, 5]) == [1, 1, 3, 4, 5]

def test_reversed():
    assert merge_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]

def test_empty():
    assert merge_sort([]) == []

def test_single():
    assert merge_sort([1]) == [1]

def test_duplicates():
    assert merge_sort([2, 2, 2]) == [2, 2, 2]`,
    modelSolution: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr[:]
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    variants: [
      {
        ticketId: "TKT-035",
        title: "Data Pipeline Sorter",
        context: "Implement the sorting stage of a data pipeline processing large datasets."
      },
      {
        ticketId: "TKT-036",
        title: "Leaderboard Builder",
        context: "Sort player scores for the game leaderboard using a stable sort algorithm."
      }
    ]
  },
  {
    id: 19, level: "mid", difficulty: 3, timeLimit: 45,
    pattern: "binary-search", patternGroup: "Searching",
    category: "Searching", title: "Binary Search",
    description: "Create 'binary_search' that takes a sorted list of numbers and a target. Return the index of the target or -1 if not found.",
    hints: [
      "Maintain left and right pointers that narrow the search range.",
      "Calculate mid = (left + right) // 2 and compare with the target."
    ],
    testCode: `from solution import binary_search

def test_found():
    assert binary_search([1, 3, 5, 7, 9], 5) == 2

def test_not_found():
    assert binary_search([1, 3, 5, 7, 9], 4) == -1

def test_first():
    assert binary_search([1, 3, 5], 1) == 0

def test_last():
    assert binary_search([1, 3, 5], 5) == 2

def test_empty():
    assert binary_search([], 1) == -1`,
    modelSolution: `def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    variants: [
      {
        ticketId: "TKT-037",
        title: "User Lookup Service",
        context: "Find users by their ID in a sorted database using an efficient search."
      },
      {
        ticketId: "TKT-038",
        title: "Price Checker",
        context: "Efficiently find products by price in a sorted product catalog."
      }
    ]
  },
  {
    id: 20, level: "mid", difficulty: 3, timeLimit: 45,
    pattern: "stack", patternGroup: "Stacks",
    category: "Stack", title: "Valid Parentheses",
    description: "Create 'is_valid_parentheses' that takes a string containing '()', '{}', '[]' and returns True if brackets are correctly matched and nested.",
    hints: [
      "Use a stack (Python list) to track opening brackets.",
      "When you see a closing bracket, check it matches the last opening bracket."
    ],
    testCode: `from solution import is_valid_parentheses

def test_simple():
    assert is_valid_parentheses("()") is True

def test_all_types():
    assert is_valid_parentheses("()[]{}") is True

def test_nested():
    assert is_valid_parentheses("({[]})") is True

def test_invalid():
    assert is_valid_parentheses("(]") is False

def test_unclosed():
    assert is_valid_parentheses("(") is False

def test_empty():
    assert is_valid_parentheses("") is True`,
    modelSolution: `def is_valid_parentheses(s):
    pairs = {')': '(', '}': '{', ']': '['}
    stack = []
    for char in s:
        if char in pairs.values():
            stack.append(char)
        elif char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
    return len(stack) == 0`,
    variants: [
      {
        ticketId: "TKT-039",
        title: "Code Linter",
        context: "Validate that source files have balanced brackets before running the build."
      },
      {
        ticketId: "TKT-040",
        title: "Expression Parser",
        context: "Validate mathematical expressions by checking bracket matching and nesting."
      }
    ]
  },
  {
    id: 21, level: "mid", difficulty: 3, timeLimit: 45,
    pattern: "hash-map", patternGroup: "Hash Maps",
    category: "Strings", title: "First Non-Repeating Character",
    description: "Create 'first_non_repeating' that takes a string and returns the index of the first non-repeating character, or -1 if none exists.",
    hints: [
      "First pass: count character frequencies using a dict or Counter.",
      "Second pass: find the first character with count == 1."
    ],
    testCode: `from solution import first_non_repeating

def test_basic():
    assert first_non_repeating("leetcode") == 0

def test_repeat():
    assert first_non_repeating("aabbcc") == -1

def test_middle():
    assert first_non_repeating("loveleetcode") == 2

def test_single():
    assert first_non_repeating("a") == 0

def test_empty():
    assert first_non_repeating("") == -1`,
    modelSolution: `def first_non_repeating(s):
    from collections import Counter
    freq = Counter(s)
    for i, char in enumerate(s):
        if freq[char] == 1:
            return i
    return -1`,
    variants: [
      {
        ticketId: "TKT-041",
        title: "Stream Processor",
        context: "Find the first unique character in a real-time data stream."
      },
      {
        ticketId: "TKT-042",
        title: "Cache Analyzer",
        context: "Find the first non-repeating request pattern in server logs to optimize caching."
      }
    ]
  },
  {
    id: 22, level: "mid", difficulty: 3, timeLimit: 45,
    pattern: "math", patternGroup: "Logic & Math",
    category: "Logic", title: "Missing Number",
    description: "Create 'missing_number' that takes a list of n distinct numbers from 0 to n and returns the one missing from the range.",
    hints: [
      "Calculate the expected sum of 0..n using n*(n+1)//2.",
      "Subtract the actual sum of the list; the difference is the missing number."
    ],
    testCode: `from solution import missing_number

def test_basic():
    assert missing_number([3, 0, 1]) == 2

def test_missing_first():
    assert missing_number([1, 2, 3]) == 0

def test_missing_last():
    assert missing_number([0, 1, 2]) == 3

def test_single():
    assert missing_number([0]) == 1

def test_unsorted():
    assert missing_number([9,6,4,2,3,5,7,0,1]) == 8`,
    modelSolution: `def missing_number(nums):
    n = len(nums)
    expected = n * (n + 1) // 2
    actual = sum(nums)
    return expected - actual`,
    variants: [
      {
        ticketId: "TKT-043",
        title: "Inventory Auditor",
        context: "Find the missing product ID in a range of sequential inventory numbers."
      },
      {
        ticketId: "TKT-044",
        title: "Sequence Validator",
        context: "Validate a sequence of check-in IDs and report the missing entry."
      }
    ]
  },
  {
    id: 23, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "array-basics", patternGroup: "Arrays",
    category: "Arrays", title: "Find Minimum",
    description: "Create 'find_min' that takes a list of numbers and returns the smallest number. Return None if the list is empty.",
    hints: [
      "Track the smallest value seen so far as you iterate.",
      "Handle the empty list case upfront."
    ],
    testCode: `from solution import find_min

def test_basic():
    assert find_min([3, 1, 4, 1, 5]) == 1

def test_negatives():
    assert find_min([-5, -2, -10]) == -10

def test_single():
    assert find_min([42]) == 42

def test_empty():
    assert find_min([]) is None`,
    modelSolution: `def find_min(numbers):
    if not numbers:
        return None
    min_val = numbers[0]
    for n in numbers:
        if n < min_val:
            min_val = n
    return min_val`,
    variants: [
      {
        ticketId: "TKT-045",
        title: "Expense Reporter",
        context: "Find the lowest expense in a monthly report to identify the cheapest cost."
      },
      {
        ticketId: "TKT-046",
        title: "Sensor Monitor",
        context: "Find the minimum temperature reading from a network of sensors."
      }
    ]
  },
  {
    id: 24, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "string-formatting", patternGroup: "Strings",
    category: "Strings", title: "Title Case Converter",
    description: "Create 'to_title_case' that converts a string to title case (first letter of each word capitalized, rest lowercase).",
    hints: [
      "Split the string into words, transform each word, then join them back.",
      "Use .capitalize() on each word after splitting."
    ],
    testCode: `from solution import to_title_case

def test_basic():
    assert to_title_case("hello world") == "Hello World"

def test_already_title():
    assert to_title_case("Hello World") == "Hello World"

def test_mixed_case():
    assert to_title_case("hELLO wORLD") == "Hello World"

def test_single():
    assert to_title_case("python") == "Python"`,
    modelSolution: `def to_title_case(text):
    return ' '.join(word.capitalize() for word in text.split())`,
    variants: [
      {
        ticketId: "TKT-047",
        title: "Name Formatter",
        context: "Format user names from all-caps database entries into proper title case."
      },
      {
        ticketId: "TKT-048",
        title: "Article Title Cleaner",
        context: "Clean up article titles from the CMS so every word starts with a capital letter."
      }
    ]
  },
  {
    id: 25, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "regex", patternGroup: "Strings",
    category: "Strings", title: "Validate URL",
    description: "Create 'is_valid_url' that checks if a string is a valid HTTPS URL (starts with https:// and has a domain).",
    hints: [
      "Use re.match() with a pattern that checks for https:// followed by a domain.",
      "A basic pattern: r'^https://[\\\\w.-]+\\.[a-z]{2,}/?.*$'"
    ],
    testCode: `from solution import is_valid_url

def test_valid():
    assert is_valid_url("https://example.com") is True

def test_with_path():
    assert is_valid_url("https://site.com/page") is True

def test_invalid_protocol():
    assert is_valid_url("http://example.com") is False

def test_no_domain():
    assert is_valid_url("https://") is False

def test_not_url():
    assert is_valid_url("hello world") is False`,
    modelSolution: `import re

def is_valid_url(url):
    pattern = r'^https://[\\w.-]+\\.[a-z]{2,}/?.*$'
    return bool(re.match(pattern, url))`,
    variants: [
      {
        ticketId: "TKT-049",
        title: "Link Validator",
        context: "Validate all external links in a markdown document before deploying the site."
      },
      {
        ticketId: "TKT-050",
        title: "Web Scraper Filter",
        context: "Filter out invalid URLs from a crawled list before saving to the database."
      }
    ]
  },
  {
    id: 26, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "iteration", patternGroup: "Recursion & Iteration",
    category: "Recursion", title: "Factorial",
    description: "Create 'factorial' that takes a non-negative integer n and returns n! (n factorial). 0! = 1. Use iteration, not recursion.",
    hints: [
      "Initialize result = 1, then multiply by each number from 1 to n.",
      "Handle n = 0 as a special case returning 1."
    ],
    testCode: `from solution import factorial

def test_zero():
    assert factorial(0) == 1

def test_one():
    assert factorial(1) == 1

def test_small():
    assert factorial(5) == 120

def test_larger():
    assert factorial(10) == 3628800`,
    modelSolution: `def factorial(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result`,
    variants: [
      {
        ticketId: "TKT-051",
        title: "Combination Calculator",
        context: "Calculate combinations nCr using factorial for a statistics module."
      },
      {
        ticketId: "TKT-052",
        title: "Permutation Generator",
        context: "Compute factorial values for a permutation algorithm in the math library."
      }
    ]
  },
  {
    id: 27, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "two-pointers", patternGroup: "Arrays",
    category: "Arrays", title: "Merge Sorted Arrays",
    description: "Create 'merge_sorted' that takes two sorted lists and merges them into a single sorted list (not in-place).",
    hints: [
      "Use two pointers, one for each list, comparing elements as you go.",
      "When one list is exhausted, append all remaining elements from the other."
    ],
    testCode: `from solution import merge_sorted

def test_basic():
    assert merge_sorted([1, 3, 5], [2, 4, 6]) == [1, 2, 3, 4, 5, 6]

def test_empty_first():
    assert merge_sorted([], [1, 2]) == [1, 2]

def test_empty_second():
    assert merge_sorted([1, 2], []) == [1, 2]

def test_duplicates():
    assert merge_sorted([1, 1, 2], [1, 3]) == [1, 1, 1, 2, 3]`,
    modelSolution: `def merge_sorted(a, b):
    result = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            result.append(a[i])
            i += 1
        else:
            result.append(b[j])
            j += 1
    result.extend(a[i:])
    result.extend(b[j:])
    return result`,
    variants: [
      {
        ticketId: "TKT-053",
        title: "Report Merger",
        context: "Merge two sorted monthly sales reports into one combined sorted report."
      },
      {
        ticketId: "TKT-054",
        title: "Log Aggregator",
        context: "Merge sorted log entries from two servers into a single chronological log."
      }
    ]
  },
  {
    id: 28, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "conditionals", patternGroup: "Logic",
    category: "Logic", title: "Leap Year Checker",
    description: "Create 'is_leap_year' that returns True if a given year is a leap year. A year is a leap year if divisible by 400, or divisible by 4 but not by 100.",
    hints: [
      "Check divisibility by 400 first (year % 400 == 0).",
      "Then check divisible by 4 but not by 100."
    ],
    testCode: `from solution import is_leap_year

def test_divisible_by_400():
    assert is_leap_year(2000) is True

def test_divisible_by_4_not_100():
    assert is_leap_year(2024) is True

def test_divisible_by_100_not_400():
    assert is_leap_year(1900) is False

def test_not_leap():
    assert is_leap_year(2023) is False`,
    modelSolution: `def is_leap_year(year):
    return year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)`,
    variants: [
      {
        ticketId: "TKT-055",
        title: "Calendar Generator",
        context: "Determine leap years for a dynamic calendar generation feature."
      },
      {
        ticketId: "TKT-056",
        title: "Payroll Calculator",
        context: "Adjust payroll calculations for February in leap years."
      }
    ]
  },
  {
    id: 29, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "array-manipulation", patternGroup: "Arrays",
    category: "Arrays", title: "Move Zeroes",
    description: "Create 'move_zeroes' that takes a list and moves all zeroes to the end while preserving the order of non-zero elements. Modify the list in-place.",
    hints: [
      "Use a write pointer to track where the next non-zero element should go.",
      "After moving all non-zero elements to the front, fill the rest with zeroes."
    ],
    testCode: `from solution import move_zeroes

def test_basic():
    nums = [0, 1, 0, 3, 12]
    move_zeroes(nums)
    assert nums == [1, 3, 12, 0, 0]

def test_no_zeroes():
    nums = [1, 2, 3]
    move_zeroes(nums)
    assert nums == [1, 2, 3]

def test_all_zeroes():
    nums = [0, 0, 0]
    move_zeroes(nums)
    assert nums == [0, 0, 0]

def test_single():
    nums = [0]
    move_zeroes(nums)
    assert nums == [0]`,
    modelSolution: `def move_zeroes(nums):
    write_idx = 0
    for n in nums:
        if n != 0:
            nums[write_idx] = n
            write_idx += 1
    for i in range(write_idx, len(nums)):
        nums[i] = 0`,
    variants: [
      {
        ticketId: "TKT-057",
        title: "Data Cleaner",
        context: "Move all null placeholder values to the end of a dataset for cleaner processing."
      },
      {
        ticketId: "TKT-058",
        title: "Queue Optimizer",
        context: "Shift all zero-priority tasks to the end of the processing queue."
      }
    ]
  },
  {
    id: 30, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "sliding-window", patternGroup: "Strings",
    category: "Arrays", title: "Max Sum Subarray",
    description: "Create 'max_sum_subarray' that takes a list of integers and a window size k. Return the maximum sum of any contiguous subarray of size k.",
    hints: [
      "Calculate the sum of the first window (first k elements).",
      "Slide the window: subtract the element leaving and add the element entering."
    ],
    testCode: `from solution import max_sum_subarray

def test_basic():
    assert max_sum_subarray([2, 1, 5, 1, 3, 2], 3) == 9

def test_small():
    assert max_sum_subarray([1, 2], 1) == 2

def test_negative():
    assert max_sum_subarray([-1, -2, -3], 2) == -3

def test_single_window():
    assert max_sum_subarray([1, 2, 3], 3) == 6`,
    modelSolution: `def max_sum_subarray(nums, k):
    if len(nums) < k:
        return None
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum`,
    variants: [
      {
        ticketId: "TKT-059",
        title: "Sales Analyzer",
        context: "Find the best 7-day sales window in a year of daily transaction data."
      },
      {
        ticketId: "TKT-060",
        title: "Traffic Monitor",
        context: "Identify the busiest hour window in server traffic logs."
      }
    ]
  },
  {
    id: 31, level: "mid", difficulty: 3, timeLimit: 45,
    pattern: "dynamic-programming", patternGroup: "DP & Recursion",
    category: "DP", title: "Min Cost Climbing Stairs",
    description: "Create 'min_cost_climbing' that takes a list 'cost' where cost[i] is the cost of step i. You can climb 1 or 2 steps at a time. Return the minimum cost to reach the top, starting from step 0 or 1.",
    hints: [
      "Start from the top and work backwards, or build up from the bottom.",
      "The cost to reach step i is cost[i] + min(cost[i-1], cost[i-2])."
    ],
    testCode: `from solution import min_cost_climbing

def test_basic():
    assert min_cost_climbing([10, 15, 20]) == 15

def test_longer():
    assert min_cost_climbing([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) == 6

def test_two_steps():
    assert min_cost_climbing([5, 10]) == 5

def test_three():
    assert min_cost_climbing([1, 2, 3]) == 2`,
    modelSolution: `def min_cost_climbing(cost):
    n = len(cost)
    if n <= 2:
        return min(cost)
    a, b = cost[0], cost[1]
    for i in range(2, n):
        a, b = b, cost[i] + min(a, b)
    return min(a, b)`,
    variants: [
      {
        ticketId: "TKT-061",
        title: "Cloud Cost Optimizer",
        context: "Find the minimum cost path to migrate services across server tiers."
      },
      {
        ticketId: "TKT-062",
        title: "Game Level Designer",
        context: "Calculate the minimum health cost to reach the end of a level with two-path moves."
      }
    ]
  },
  {
    id: 32, level: "mid", difficulty: 3, timeLimit: 45,
    pattern: "divide-conquer", patternGroup: "Sorting",
    category: "Sorting", title: "Quick Sort",
    description: "Create 'quick_sort' that implements quicksort using the last element as the pivot. Return a new sorted list.",
    hints: [
      "Pick the last element as the pivot, partition the array around it.",
      "Recursively sort the left (smaller) and right (larger) partitions."
    ],
    testCode: `from solution import quick_sort

def test_basic():
    assert quick_sort([3, 1, 4, 1, 5]) == [1, 1, 3, 4, 5]

def test_reversed():
    assert quick_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]

def test_empty():
    assert quick_sort([]) == []

def test_single():
    assert quick_sort([1]) == [1]`,
    modelSolution: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr[:]
    pivot = arr[-1]
    left = [x for x in arr[:-1] if x <= pivot]
    right = [x for x in arr[:-1] if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)`,
    variants: [
      {
        ticketId: "TKT-063",
        title: "File Sorter",
        context: "Sort a large batch of files by their timestamps before archival."
      },
      {
        ticketId: "TKT-064",
        title: "Score Ranking",
        context: "Sort player scores using quicksort for the tournament ranking system."
      }
    ]
  },
  {
    id: 33, level: "mid", difficulty: 3, timeLimit: 45,
    pattern: "binary-search", patternGroup: "Searching",
    category: "Searching", title: "First Bad Version",
    description: "Create 'first_bad_version' that takes n (total versions) and a function 'is_bad(v)' that checks if a version is bad. Return the first bad version index (1-indexed). Minimize calls to is_bad.",
    hints: [
      "Use binary search to find the boundary between good and bad versions.",
      "When mid is bad, the first bad version is at or before mid; otherwise it's after."
    ],
    testCode: `from solution import first_bad_version

def test_first():
    assert first_bad_version(5, lambda v: v >= 4) == 4

def test_first_is_bad():
    assert first_bad_version(3, lambda v: v >= 1) == 1

def test_middle():
    assert first_bad_version(10, lambda v: v >= 6) == 6

def test_last():
    assert first_bad_version(5, lambda v: v >= 5) == 5`,
    modelSolution: `def first_bad_version(n, is_bad):
    left, right = 1, n
    while left < right:
        mid = (left + right) // 2
        if is_bad(mid):
            right = mid
        else:
            left = mid + 1
    return left`,
    variants: [
      {
        ticketId: "TKT-065",
        title: "Deploy Rollback",
        context: "Find the exact deployment that introduced a bug using a binary search on versions."
      },
      {
        ticketId: "TKT-066",
        title: "Test Suite Analyzer",
        context: "Find the first failing test commit in a CI pipeline using binary search."
      }
    ]
  },
  {
    id: 34, level: "mid", difficulty: 3, timeLimit: 45,
    pattern: "stack", patternGroup: "Stacks",
    category: "Stack", title: "Min Stack",
    description: "Create a class 'MinStack' with push, pop, top, and get_min methods. get_min must return the minimum element in O(1) time.",
    hints: [
      "Store each value together with the current minimum at that point.",
      "Use a second stack or store tuples (value, min_so_far)."
    ],
    testCode: `from solution import MinStack

def test_basic():
    s = MinStack()
    s.push(3)
    s.push(5)
    assert s.get_min() == 3
    s.push(2)
    s.push(1)
    assert s.get_min() == 1
    s.pop()
    assert s.get_min() == 2

def test_single():
    s = MinStack()
    s.push(42)
    assert s.get_min() == 42`,
    modelSolution: `class MinStack:
    def __init__(self):
        self.stack = []

    def push(self, val):
        current_min = val if not self.stack else min(val, self.stack[-1][1])
        self.stack.append((val, current_min))

    def pop(self):
        self.stack.pop()

    def top(self):
        return self.stack[-1][0]

    def get_min(self):
        return self.stack[-1][1]`,
    variants: [
      {
        ticketId: "TKT-067",
        title: "Transaction Tracker",
        context: "Track the minimum transaction value in a financial processing pipeline."
      },
      {
        ticketId: "TKT-068",
        title: "Sensor Dashboard",
        context: "Maintain a running minimum of sensor readings with push/pop for sliding windows."
      }
    ]
  },
  {
    id: 35, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "math", patternGroup: "Logic & Math",
    category: "Logic", title: "Count Primes",
    description: "Create 'count_primes' that takes a positive integer n and returns the number of prime numbers less than n. Use the Sieve of Eratosthenes.",
    hints: [
      "Create a boolean list from 0 to n-1, initially all True.",
      "Start from 2, mark multiples as False. Count the True values remaining."
    ],
    testCode: `from solution import count_primes

def test_small():
    assert count_primes(10) == 4

def test_larger():
    assert count_primes(20) == 8

def test_zero():
    assert count_primes(0) == 0

def test_one():
    assert count_primes(2) == 0`,
    modelSolution: `def count_primes(n):
    if n < 2:
        return 0
    is_prime = [True] * n
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n ** 0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, n, i):
                is_prime[j] = False
    return sum(is_prime)`,
    variants: [
      {
        ticketId: "TKT-069",
        title: "Encryption Helper",
        context: "Count prime numbers in a range for RSA key generation parameters."
      },
      {
        ticketId: "TKT-070",
        title: "Math Library Module",
        context: "Implement prime counting for a math utility library used by the team."
      }
    ]
  },
  {
    id: 36, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "iteration", patternGroup: "Recursion & Iteration",
    category: "Recursion", title: "Power Function",
    description: "Create 'power' that takes a base and a non-negative integer exponent and returns base^exponent using iteration (do not use ** or pow).",
    hints: [
      "Multiply the base by itself exponent times in a loop.",
      "Initialize result = 1 and multiply by base in each iteration."
    ],
    testCode: `from solution import power

def test_basic():
    assert power(2, 3) == 8

def test_zero_exponent():
    assert power(5, 0) == 1

def test_one_exponent():
    assert power(7, 1) == 7`,
    modelSolution: `def power(base, exp):
    result = 1
    for _ in range(exp):
        result *= base
    return result`,
    variants: [
      {
        ticketId: "TKT-071",
        title: "Growth Calculator",
        context: "Calculate exponential growth for a population model using iterative multiplication."
      },
      {
        ticketId: "TKT-072",
        title: "Interest Rate Engine",
        context: "Compute compound interest by implementing a custom power function for the finance module."
      }
    ]
  },
  {
    id: 37, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "recursion", patternGroup: "Recursion & Iteration",
    category: "Recursion", title: "Recursive Reverse",
    description: "Create 'reverse_recursive' that reverses a string using recursion (no loops, no slicing). Return the reversed string.",
    hints: [
      "Base case: an empty string or single character returns itself.",
      "Recur on the string without the first character, then append that character at the end."
    ],
    testCode: `from solution import reverse_recursive

def test_basic():
    assert reverse_recursive("hello") == "olleh"

def test_empty():
    assert reverse_recursive("") == ""

def test_single():
    assert reverse_recursive("a") == "a"`,
    modelSolution: `def reverse_recursive(s):
    if len(s) <= 1:
        return s
    return reverse_recursive(s[1:]) + s[0]`,
    variants: [
      {
        ticketId: "TKT-073",
        title: "Message Encoder",
        context: "Implement a recursive string reversal for the message obfuscation module."
      },
      {
        ticketId: "TKT-074",
        title: "Recursive Text Processor",
        context: "Build a text processing pipeline that reverses words using recursion for educational tools."
      }
    ]
  },
  {
    id: 38, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "conditionals", patternGroup: "Logic",
    category: "Logic", title: "FizzBuzz Plus",
    description: "Create 'fizzbuzz_plus' that takes a positive integer n and returns a list of strings for numbers 1 to n. 'FizzBuzz' if divisible by 15, 'Fizz' if by 3, 'Buzz' if by 5, 'FizzBuzzPlus' if by 7, otherwise the number as a string.",
    hints: [
      "Check divisibility by 15 first (3 and 5), then 3, then 5, then 7, then default.",
      "Use if/elif/else chain in the correct priority order."
    ],
    testCode: `from solution import fizzbuzz_plus

def test_basic():
    assert fizzbuzz_plus(3) == ["1", "2", "Fizz"]

def test_fizzbuzz():
    result = fizzbuzz_plus(15)
    assert result[14] == "FizzBuzz"

def test_seven():
    result = fizzbuzz_plus(7)
    assert result[6] == "FizzBuzzPlus"`,
    modelSolution: `def fizzbuzz_plus(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        elif i % 7 == 0:
            result.append("FizzBuzzPlus")
        else:
            result.append(str(i))
    return result`,
    variants: [
      {
        ticketId: "TKT-075",
        title: "Report Labeler",
        context: "Generate conditional labels for a report based on multiple divisibility thresholds."
      },
      {
        ticketId: "TKT-076",
        title: "Tiered Discount Engine",
        context: "Apply tiered discounts based on order value thresholds using conditional logic."
      }
    ]
  },
  {
    id: 39, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "conditionals", patternGroup: "Logic",
    category: "Logic", title: "Validate Braces",
    description: "Create 'is_valid_braces' that takes a string of '(' and ')' characters and returns True if every opening parenthesis has a matching closing one in the correct order.",
    hints: [
      "Track a counter: +1 for '(' and -1 for ')'.",
      "If counter ever goes negative, return False. It must end at 0."
    ],
    testCode: `from solution import is_valid_braces

def test_valid():
    assert is_valid_braces("()") is True

def test_nested():
    assert is_valid_braces("(())") is True

def test_invalid():
    assert is_valid_braces("(()") is False
    assert is_valid_braces(")(") is False`,
    modelSolution: `def is_valid_braces(s):
    count = 0
    for ch in s:
        if ch == '(':
            count += 1
        elif ch == ')':
            count -= 1
        if count < 0:
            return False
    return count == 0`,
    variants: [
      {
        ticketId: "TKT-077",
        title: "Code Linter",
        context: "Lint source files to detect unbalanced parentheses before the build step."
      },
      {
        ticketId: "TKT-078",
        title: "Expression Validator",
        context: "Validate that mathematical expressions have correctly matched parentheses in the formula parser."
      }
    ]
  },
  {
    id: 40, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "dynamic-programming", patternGroup: "DP & Recursion",
    category: "DP", title: "House Robber",
    description: "Create 'house_robber' that takes a list of money amounts in houses. You cannot rob adjacent houses. Return the maximum amount you can rob tonight.",
    hints: [
      "At each house, decide to rob it (add to i-2 max) or skip it (keep i-1 max).",
      "Track two variables: the max up to the previous house and the one before that."
    ],
    testCode: `from solution import house_robber

def test_basic():
    assert house_robber([1, 2, 3, 1]) == 4

def test_non_adjacent():
    assert house_robber([2, 7, 9, 3, 1]) == 12

def test_two_houses():
    assert house_robber([2, 1]) == 2`,
    modelSolution: `def house_robber(nums):
    if not nums:
        return 0
    if len(nums) <= 2:
        return max(nums)
    prev2, prev1 = nums[0], max(nums[0], nums[1])
    for i in range(2, len(nums)):
        curr = max(prev1, prev2 + nums[i])
        prev2, prev1 = prev1, curr
    return prev1`,
    variants: [
      {
        ticketId: "TKT-079",
        title: "Event Scheduler",
        context: "Maximize the number of attendees by scheduling non-conflicting events in adjacent time slots."
      },
      {
        ticketId: "TKT-080",
        title: "Resource Allocator",
        context: "Allocate resources to non-adjacent projects to maximize total ROI."
      }
    ]
  },
  {
    id: 41, level: "mid", difficulty: 3, timeLimit: 40,
    pattern: "dynamic-programming", patternGroup: "DP & Recursion",
    category: "DP", title: "Min Path Sum",
    description: "Create 'min_path_sum' that takes an m x n grid of non-negative numbers. Return the minimum sum along a path from top-left to bottom-right, moving only down or right.",
    hints: [
      "Use DP where dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).",
      "Initialize the first row and first column with cumulative sums."
    ],
    testCode: `from solution import min_path_sum

def test_basic():
    grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]
    assert min_path_sum(grid) == 7

def test_single():
    assert min_path_sum([[5]]) == 5

def test_two_by_two():
    grid = [[1, 2], [3, 4]]
    assert min_path_sum(grid) == 8`,
    modelSolution: `def min_path_sum(grid):
    m, n = len(grid), len(grid[0])
    dp = [[0] * n for _ in range(m)]
    dp[0][0] = grid[0][0]
    for j in range(1, n):
        dp[0][j] = dp[0][j-1] + grid[0][j]
    for i in range(1, m):
        dp[i][0] = dp[i-1][0] + grid[i][0]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
    return dp[m-1][n-1]`,
    variants: [
      {
        ticketId: "TKT-081",
        title: "Delivery Route Optimizer",
        context: "Find the minimum cost delivery path through a city grid moving only south and east."
      },
      {
        ticketId: "TKT-082",
        title: "Data Pipeline Cost",
        context: "Calculate the minimum processing cost through a series of data transformation stages."
      }
    ]
  },
  {
    id: 42, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "sorting", patternGroup: "Sorting",
    category: "Sorting", title: "Bubble Sort",
    description: "Create 'bubble_sort' that takes a list of numbers and sorts it in ascending order using the bubble sort algorithm. Return a new sorted list.",
    hints: [
      "Repeatedly swap adjacent elements if they are in the wrong order.",
      "After each pass, the largest element 'bubbles' to the end."
    ],
    testCode: `from solution import bubble_sort

def test_basic():
    assert bubble_sort([3, 1, 4, 1, 5]) == [1, 1, 3, 4, 5]

def test_reversed():
    assert bubble_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]

def test_empty():
    assert bubble_sort([]) == []
    assert bubble_sort([1]) == [1]`,
    modelSolution: `def bubble_sort(arr):
    n = len(arr)
    result = arr[:]
    for i in range(n):
        for j in range(0, n - i - 1):
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
    return result`,
    variants: [
      {
        ticketId: "TKT-083",
        title: "Score Sorter",
        context: "Sort player scores for a leaderboard using a simple bubble sort algorithm."
      },
      {
        ticketId: "TKT-084",
        title: "Grade Organizer",
        context: "Sort a list of student grades in ascending order for the gradebook module."
      }
    ]
  },
  {
    id: 43, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "sorting", patternGroup: "Sorting",
    category: "Sorting", title: "Insertion Sort",
    description: "Create 'insertion_sort' that takes a list of numbers and sorts it in ascending order using the insertion sort algorithm. Return a new sorted list.",
    hints: [
      "Build the sorted list one element at a time by inserting each into the correct position.",
      "Shift larger elements to the right as you go."
    ],
    testCode: `from solution import insertion_sort

def test_basic():
    assert insertion_sort([4, 2, 7, 1]) == [1, 2, 4, 7]

def test_already_sorted():
    assert insertion_sort([1, 2, 3]) == [1, 2, 3]

def test_duplicates():
    assert insertion_sort([3, 3, 1]) == [1, 3, 3]`,
    modelSolution: `def insertion_sort(arr):
    result = arr[:]
    for i in range(1, len(result)):
        key = result[i]
        j = i - 1
        while j >= 0 and result[j] > key:
            result[j + 1] = result[j]
            j -= 1
        result[j + 1] = key
    return result`,
    variants: [
      {
        ticketId: "TKT-085",
        title: "Small Dataset Sorter",
        context: "Sort small batches of transaction data efficiently using insertion sort."
      },
      {
        ticketId: "TKT-086",
        title: "Online Leaderboard",
        context: "Maintain a sorted leaderboard as new scores are added one at a time."
      }
    ]
  },
  {
    id: 44, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "searching", patternGroup: "Searching",
    category: "Searching", title: "Linear Search",
    description: "Create 'linear_search' that takes a list and a target value. Return the index of the target if found, or -1 if not found.",
    hints: [
      "Loop through each element and compare with the target.",
      "Return the index immediately when found."
    ],
    testCode: `from solution import linear_search

def test_found():
    assert linear_search([4, 2, 7, 1, 9], 7) == 2

def test_not_found():
    assert linear_search([1, 2, 3], 5) == -1

def test_first_element():
    assert linear_search([8, 3, 5], 8) == 0`,
    modelSolution: `def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1`,
    variants: [
      {
        ticketId: "TKT-087",
        title: "User Finder",
        context: "Find a user by their ID in an unsorted list for the admin dashboard."
      },
      {
        ticketId: "TKT-088",
        title: "Product Lookup",
        context: "Search for a product by SKU in a small unsorted inventory list."
      }
    ]
  },
  {
    id: 45, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "binary-search", patternGroup: "Searching",
    category: "Searching", title: "First Occurrence",
    description: "Create 'first_occurrence' that takes a sorted list and a target. Return the index of the first occurrence of target, or -1 if not found.",
    hints: [
      "Use binary search but don't stop at the first match — keep going left.",
      "When nums[mid] == target, set right = mid - 1 to find the first occurrence."
    ],
    testCode: `from solution import first_occurrence

def test_duplicates():
    assert first_occurrence([1, 2, 2, 2, 3], 2) == 1

def test_not_found():
    assert first_occurrence([1, 3, 5], 4) == -1

def test_single():
    assert first_occurrence([1, 2, 3], 2) == 1`,
    modelSolution: `def first_occurrence(nums, target):
    left, right = 0, len(nums) - 1
    result = -1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            result = mid
            right = mid - 1
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return result`,
    variants: [
      {
        ticketId: "TKT-089",
        title: "Log Entry Finder",
        context: "Find the first occurrence of a specific error code in a sorted log file."
      },
      {
        ticketId: "TKT-090",
        title: "Subscription Tracker",
        context: "Find the first subscription with a given tier in a sorted customer database."
      }
    ]
  },
  {
    id: 46, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "stack", patternGroup: "Stacks",
    category: "Stack", title: "Parentheses Checker",
    description: "Create 'is_balanced' that takes a string of '(' and ')' characters and returns True if parentheses are balanced. Use a stack (Python list) to track them.",
    hints: [
      "Push '(' onto the stack when seen; pop when you see ')'.",
      "If you try to pop from an empty stack, the string is invalid."
    ],
    testCode: `from solution import is_balanced

def test_balanced():
    assert is_balanced("()") is True

def test_nested():
    assert is_balanced("(())") is True

def test_unbalanced():
    assert is_balanced("())") is False
    assert is_balanced(")(") is False`,
    modelSolution: `def is_balanced(s):
    stack = []
    for ch in s:
        if ch == '(':
            stack.append(ch)
        elif ch == ')':
            if not stack:
                return False
            stack.pop()
    return len(stack) == 0`,
    variants: [
      {
        ticketId: "TKT-091",
        title: "Syntax Checker",
        context: "Check parentheses balancing in code snippets for the in-browser code editor."
      },
      {
        ticketId: "TKT-092",
        title: "Config File Validator",
        context: "Validate that parentheses in configuration files are properly balanced before parsing."
      }
    ]
  },
  {
    id: 47, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "stack", patternGroup: "Stacks",
    category: "Stack", title: "Next Greater Element",
    description: "Create 'next_greater' that takes a list of integers. Return a list where each element is replaced by the next greater element to its right, or -1 if none exists.",
    hints: [
      "Use a stack to track indices whose next greater hasn't been found yet.",
      "Iterate left to right; for each element, pop smaller elements from the stack and set their next greater."
    ],
    testCode: `from solution import next_greater

def test_basic():
    assert next_greater([4, 5, 2, 25]) == [5, 25, 25, -1]

def test_descending():
    assert next_greater([5, 4, 3, 2]) == [-1, -1, -1, -1]

def test_single():
    assert next_greater([1]) == [-1]`,
    modelSolution: `def next_greater(nums):
    result = [-1] * len(nums)
    stack = []
    for i, val in enumerate(nums):
        while stack and nums[stack[-1]] < val:
            idx = stack.pop()
            result[idx] = val
        stack.append(i)
    return result`,
    variants: [
      {
        ticketId: "TKT-093",
        title: "Price Spike Detector",
        context: "Find the next higher stock price for each day in a trading dataset."
      },
      {
        ticketId: "TKT-094",
        title: "Temperature Forecaster",
        context: "For each day's temperature, find the next warmer day in the forecast."
      }
    ]
  },
  {
    id: 48, level: "entry", difficulty: 1, timeLimit: 20,
    pattern: "math", patternGroup: "Logic & Math",
    category: "Logic", title: "Prime Checker",
    description: "Create 'is_prime' that takes a positive integer and returns True if it is a prime number, False otherwise.",
    hints: [
      "Check divisibility up to the square root of n.",
      "Handle edge cases: numbers less than 2 are not prime."
    ],
    testCode: `from solution import is_prime

def test_prime():
    assert is_prime(7) is True

def test_not_prime():
    assert is_prime(10) is False

def test_edge_cases():
    assert is_prime(1) is False
    assert is_prime(2) is True`,
    modelSolution: `def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True`,
    variants: [
      {
        ticketId: "TKT-095",
        title: "Encryption Key Gen",
        context: "Validate prime numbers for RSA key pair generation in the security module."
      },
      {
        ticketId: "TKT-096",
        title: "Math Quiz Engine",
        context: "Check if randomly generated numbers are prime for the educational math quiz app."
      }
    ]
  },
  {
    id: 49, level: "junior", difficulty: 2, timeLimit: 30,
    pattern: "math", patternGroup: "Logic & Math",
    category: "Logic", title: "Happy Number",
    description: "Create 'is_happy' that takes a positive integer. Replace it with the sum of squares of its digits repeatedly. Return True if it eventually reaches 1 (happy), False if it loops endlessly (unhappy).",
    hints: [
      "Use a set to detect cycles: if you see the same number twice, it's unhappy.",
      "Write a helper to compute the sum of squares of digits."
    ],
    testCode: `from solution import is_happy

def test_happy():
    assert is_happy(19) is True

def test_unhappy():
    assert is_happy(4) is False

def test_one():
    assert is_happy(1) is True`,
    modelSolution: `def is_happy(n):
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        s = 0
        while n > 0:
            digit = n % 10
            s += digit * digit
            n //= 10
        n = s
    return n == 1`,
    variants: [
      {
        ticketId: "TKT-097",
        title: "Quality Gate Check",
        context: "Determine if a build number is 'happy' for a fun quality gate metric in CI."
      },
      {
        ticketId: "TKT-098",
        title: "ID Generator",
        context: "Filter generated user IDs to only include 'happy' numbers for a gamification feature."
      }
    ]
  }
];
