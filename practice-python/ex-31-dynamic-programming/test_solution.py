from solution import min_cost_climbing

def test_basic():
    assert min_cost_climbing([10, 15, 20]) == 15

def test_longer():
    assert min_cost_climbing([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) == 6

def test_two_steps():
    assert min_cost_climbing([5, 10]) == 5

def test_three():
    assert min_cost_climbing([1, 2, 3]) == 2
