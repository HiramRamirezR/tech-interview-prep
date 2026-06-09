from solution import climb_stairs

def test_basic():
    assert climb_stairs(2) == 2
    assert climb_stairs(3) == 3

def test_larger():
    assert climb_stairs(5) == 8

def test_one():
    assert climb_stairs(1) == 1

def test_four():
    assert climb_stairs(4) == 5
