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
  }
];
