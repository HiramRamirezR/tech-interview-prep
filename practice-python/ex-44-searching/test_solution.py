from solution import linear_search

def test_found():
    assert linear_search([4, 2, 7, 1, 9], 7) == 2

def test_not_found():
    assert linear_search([1, 2, 3], 5) == -1

def test_first_element():
    assert linear_search([8, 3, 5], 8) == 0
