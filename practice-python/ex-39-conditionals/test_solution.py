from solution import is_valid_braces

def test_valid():
    assert is_valid_braces("()") is True

def test_nested():
    assert is_valid_braces("(())") is True

def test_invalid():
    assert is_valid_braces("(()") is False
    assert is_valid_braces(")(") is False
