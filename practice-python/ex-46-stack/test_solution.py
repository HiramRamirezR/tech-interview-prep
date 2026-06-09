from solution import is_balanced

def test_balanced():
    assert is_balanced("()") is True

def test_nested():
    assert is_balanced("(())") is True

def test_unbalanced():
    assert is_balanced("())") is False
    assert is_balanced(")(") is False
