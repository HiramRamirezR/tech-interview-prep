from solution import is_palindrome

def test_simple():
    assert is_palindrome("racecar") is True

def test_with_spaces():
    assert is_palindrome("A man a plan a canal Panama") is True

def test_false():
    assert is_palindrome("hello") is False

def test_mixed_case():
    assert is_palindrome("RaceCar") is True