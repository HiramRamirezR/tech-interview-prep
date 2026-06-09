from solution import first_occurrence

def test_duplicates():
    assert first_occurrence([1, 2, 2, 2, 3], 2) == 1

def test_not_found():
    assert first_occurrence([1, 3, 5], 4) == -1

def test_single():
    assert first_occurrence([1, 2, 3], 2) == 1
