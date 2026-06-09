from solution import find_min

def test_basic():
    assert find_min([3, 1, 4, 1, 5]) == 1

def test_negatives():
    assert find_min([-5, -2, -10]) == -10

def test_single():
    assert find_min([42]) == 42

def test_empty():
    assert find_min([]) is None
