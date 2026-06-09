from solution import max_sum_subarray

def test_basic():
    assert max_sum_subarray([2, 1, 5, 1, 3, 2], 3) == 9

def test_small():
    assert max_sum_subarray([1, 2], 1) == 2

def test_negative():
    assert max_sum_subarray([-1, -2, -3], 2) == -3

def test_single_window():
    assert max_sum_subarray([1, 2, 3], 3) == 6
