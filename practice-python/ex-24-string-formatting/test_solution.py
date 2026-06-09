from solution import to_title_case

def test_basic():
    assert to_title_case("hello world") == "Hello World"

def test_already_title():
    assert to_title_case("Hello World") == "Hello World"

def test_mixed_case():
    assert to_title_case("hELLO wORLD") == "Hello World"

def test_single():
    assert to_title_case("python") == "Python"
