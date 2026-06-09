from solution import reverse_recursive

def test_basic():
    assert reverse_recursive("hello") == "olleh"

def test_empty():
    assert reverse_recursive("") == ""

def test_single():
    assert reverse_recursive("a") == "a"
