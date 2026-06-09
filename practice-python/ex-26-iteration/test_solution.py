from solution import factorial

def test_zero():
    assert factorial(0) == 1

def test_one():
    assert factorial(1) == 1

def test_small():
    assert factorial(5) == 120

def test_larger():
    assert factorial(10) == 3628800
