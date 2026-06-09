from solution import is_prime

def test_prime():
    assert is_prime(7) is True

def test_not_prime():
    assert is_prime(10) is False

def test_edge_cases():
    assert is_prime(1) is False
    assert is_prime(2) is True
