from solution import first_non_repeating

def test_basic():
    assert first_non_repeating("leetcode") == 0

def test_repeat():
    assert first_non_repeating("aabbcc") == -1

def test_middle():
    assert first_non_repeating("loveleetcode") == 2

def test_single():
    assert first_non_repeating("a") == 0

def test_empty():
    assert first_non_repeating("") == -1
