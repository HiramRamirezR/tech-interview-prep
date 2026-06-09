from solution import house_robber

def test_basic():
    assert house_robber([1, 2, 3, 1]) == 4

def test_non_adjacent():
    assert house_robber([2, 7, 9, 3, 1]) == 12

def test_two_houses():
    assert house_robber([2, 1]) == 2
