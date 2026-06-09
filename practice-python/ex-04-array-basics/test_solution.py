from solution import find_max

def test_basic():
    assert find_max([3, 1, 4, 1, 5]) == 5

def test_negatives():
    assert find_max([-5, -2, -10]) == -2

def test_single():
    assert find_max([42]) == 42

def test_empty():
    assert find_max([]) is None
