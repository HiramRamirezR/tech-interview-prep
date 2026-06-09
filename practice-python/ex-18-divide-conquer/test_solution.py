from solution import merge_sort

def test_basic():
    assert merge_sort([3, 1, 4, 1, 5]) == [1, 1, 3, 4, 5]

def test_reversed():
    assert merge_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]

def test_empty():
    assert merge_sort([]) == []

def test_single():
    assert merge_sort([1]) == [1]

def test_duplicates():
    assert merge_sort([2, 2, 2]) == [2, 2, 2]
