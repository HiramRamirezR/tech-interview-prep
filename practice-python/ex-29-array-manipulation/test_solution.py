from solution import move_zeroes

def test_basic():
    nums = [0, 1, 0, 3, 12]
    move_zeroes(nums)
    assert nums == [1, 3, 12, 0, 0]

def test_no_zeroes():
    nums = [1, 2, 3]
    move_zeroes(nums)
    assert nums == [1, 2, 3]

def test_all_zeroes():
    nums = [0, 0, 0]
    move_zeroes(nums)
    assert nums == [0, 0, 0]

def test_single():
    nums = [0]
    move_zeroes(nums)
    assert nums == [0]
