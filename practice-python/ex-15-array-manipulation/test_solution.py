from solution import rotate

def test_basic():
    nums = [1, 2, 3, 4, 5]
    result = rotate(nums, 2)
    assert result == [4, 5, 1, 2, 3]

def test_k_larger_than_len():
    nums = [1, 2, 3]
    result = rotate(nums, 5)
    assert result == [2, 3, 1]

def test_no_rotation():
    nums = [1, 2]
    result = rotate(nums, 0)
    assert result == [1, 2]

def test_single():
    assert rotate([1], 3) == [1]
