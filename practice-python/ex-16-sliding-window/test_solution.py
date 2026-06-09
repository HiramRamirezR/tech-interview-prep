from solution import length_of_longest_substring

def test_basic():
    assert length_of_longest_substring("abcabcbb") == 3

def test_all_unique():
    assert length_of_longest_substring("abcdef") == 6

def test_same_char():
    assert length_of_longest_substring("aaaa") == 1

def test_empty():
    assert length_of_longest_substring("") == 0

def test_with_spaces():
    assert length_of_longest_substring("ab c ab") == 4
