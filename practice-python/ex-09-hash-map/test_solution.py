from solution import two_sum

def test_basic():
    result = two_sum([2, 7, 11, 15], 9)
    assert result == [0, 1]

def test_unordered():
    result = two_sum([3, 2, 4], 6)
    assert result == [1, 2]

def test_negative():
    result = two_sum([-1, -2, -3, -4], -5)
    assert result == [1, 3]
