from solution import quick_sort

def test_basic():
    assert quick_sort([3, 1, 4, 1, 5]) == [1, 1, 3, 4, 5]

def test_reversed():
    assert quick_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]

def test_empty():
    assert quick_sort([]) == []

def test_single():
    assert quick_sort([1]) == [1]
