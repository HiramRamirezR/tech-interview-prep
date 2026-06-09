from solution import is_valid_parentheses

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
    assert is_valid_parentheses("") is True
