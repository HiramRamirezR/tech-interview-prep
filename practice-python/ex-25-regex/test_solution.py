from solution import is_valid_url

def test_valid():
    assert is_valid_url("https://example.com") is True

def test_with_path():
    assert is_valid_url("https://site.com/page") is True

def test_invalid_protocol():
    assert is_valid_url("http://example.com") is False

def test_no_domain():
    assert is_valid_url("https://") is False

def test_not_url():
    assert is_valid_url("hello world") is False
