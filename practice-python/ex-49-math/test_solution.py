from solution import is_happy

def test_happy():
    assert is_happy(19) is True

def test_unhappy():
    assert is_happy(4) is False

def test_one():
    assert is_happy(1) is True
