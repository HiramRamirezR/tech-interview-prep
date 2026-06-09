from solution import first_bad_version

def test_first():
    assert first_bad_version(5, lambda v: v >= 4) == 4

def test_first_is_bad():
    assert first_bad_version(3, lambda v: v >= 1) == 1

def test_middle():
    assert first_bad_version(10, lambda v: v >= 6) == 6

def test_last():
    assert first_bad_version(5, lambda v: v >= 5) == 5
