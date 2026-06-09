from solution import insertion_sort

def test_basic():
    assert insertion_sort([4, 2, 7, 1]) == [1, 2, 4, 7]

def test_already_sorted():
    assert insertion_sort([1, 2, 3]) == [1, 2, 3]

def test_duplicates():
    assert insertion_sort([3, 3, 1]) == [1, 3, 3]
