from solution import next_greater

def test_basic():
    assert next_greater([4, 5, 2, 25]) == [5, 25, 25, -1]

def test_descending():
    assert next_greater([5, 4, 3, 2]) == [-1, -1, -1, -1]

def test_single():
    assert next_greater([1]) == [-1]
