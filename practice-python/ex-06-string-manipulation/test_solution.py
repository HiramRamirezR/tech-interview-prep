from solution import reverse_string

def test_basic():
    assert reverse_string("hello") == "olleh"

def test_palindrome():
    assert reverse_string("racecar") == "racecar"

def test_empty():
    assert reverse_string("") == ""

def test_single():
    assert reverse_string("a") == "a"
