from solution import count_primes

def test_small():
    assert count_primes(10) == 4

def test_larger():
    assert count_primes(20) == 8

def test_zero():
    assert count_primes(0) == 0

def test_one():
    assert count_primes(2) == 0
