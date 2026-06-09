from solution import power

def test_basic():
    assert power(2, 3) == 8

def test_zero_exponent():
    assert power(5, 0) == 1

def test_one_exponent():
    assert power(7, 1) == 7
