from solution import remove_duplicates

def test_basic():
    nums = [1, 1, 2]
    k = remove_duplicates(nums)
    assert k == 2
    assert nums[:k] == [1, 2]

def test_no_dups():
    nums = [1, 2, 3]
    k = remove_duplicates(nums)
    assert k == 3

def test_all_same():
    nums = [5, 5, 5]
    k = remove_duplicates(nums)
    assert k == 1
    assert nums[:k] == [5]

def test_empty():
    assert remove_duplicates([]) == 0
