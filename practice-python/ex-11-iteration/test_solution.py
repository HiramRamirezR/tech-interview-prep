from solution import fibonacci

def test_base():
    assert fibonacci(0) == 0
    assert fibonacci(1) == 1

def test_small():
    assert fibonacci(5) == 5

def test_larger():
    assert fibonacci(10) == 55

def test_sequence():
    assert fibonacci(7) == 13
