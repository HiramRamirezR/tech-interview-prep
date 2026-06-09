from solution import missing_number

def test_basic():
    assert missing_number([3, 0, 1]) == 2

def test_missing_first():
    assert missing_number([1, 2, 3]) == 0

def test_missing_last():
    assert missing_number([0, 1, 2]) == 3

def test_single():
    assert missing_number([0]) == 1

def test_unsorted():
    assert missing_number([9,6,4,2,3,5,7,0,1]) == 8
