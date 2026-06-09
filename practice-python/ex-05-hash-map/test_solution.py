from solution import char_frequency

def test_basic():
    result = char_frequency("hello")
    assert result == {'h': 1, 'e': 1, 'l': 2, 'o': 1}

def test_empty():
    assert char_frequency("") == {}

def test_spaces():
    result = char_frequency("a a")
    assert result['a'] == 2
    assert result[' '] == 1
