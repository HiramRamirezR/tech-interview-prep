from solution import is_anagram

def test_basic():
    assert is_anagram("listen", "silent") is True

def test_not_anagram():
    assert is_anagram("hello", "world") is False

def test_with_spaces():
    assert is_anagram("The Eyes", "They See") is True

def test_empty():
    assert is_anagram("", "") is True
