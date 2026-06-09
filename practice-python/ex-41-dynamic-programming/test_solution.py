from solution import min_path_sum

def test_basic():
    grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]
    assert min_path_sum(grid) == 7

def test_single():
    assert min_path_sum([[5]]) == 5

def test_two_by_two():
    grid = [[1, 2], [3, 4]]
    assert min_path_sum(grid) == 8
