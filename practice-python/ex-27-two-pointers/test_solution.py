from solution import merge_sorted

def test_basic():
    assert merge_sorted([1, 3, 5], [2, 4, 6]) == [1, 2, 3, 4, 5, 6]

def test_empty_first():
    assert merge_sorted([], [1, 2]) == [1, 2]

def test_empty_second():
    assert merge_sorted([1, 2], []) == [1, 2]

def test_duplicates():
    assert merge_sorted([1, 1, 2], [1, 3]) == [1, 1, 1, 2, 3]
