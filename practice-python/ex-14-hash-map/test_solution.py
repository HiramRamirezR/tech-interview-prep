from solution import word_frequency

def test_basic():
    result = word_frequency("hello world hello")
    assert result == {"hello": 2, "world": 1}

def test_case():
    result = word_frequency("Hello hello")
    assert result == {"hello": 2}

def test_empty():
    assert word_frequency("") == {}
