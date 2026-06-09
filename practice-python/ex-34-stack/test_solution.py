from solution import MinStack

def test_basic():
    s = MinStack()
    s.push(3)
    s.push(5)
    assert s.get_min() == 3
    s.push(2)
    s.push(1)
    assert s.get_min() == 1
    s.pop()
    assert s.get_min() == 2

def test_single():
    s = MinStack()
    s.push(42)
    assert s.get_min() == 42
