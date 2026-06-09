from solution import generate_slug

def test_basic():
    assert generate_slug("Hello World") == "hello-world"

def test_special_chars():
    assert generate_slug("Python 3.9 is Great!") == "python-39-is-great"

def test_multiple_spaces():
    assert generate_slug("  Extra   spaces  ") == "extra-spaces"
