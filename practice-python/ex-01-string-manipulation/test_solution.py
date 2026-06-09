from solution import camel_to_snake

def test_basic():
    assert camel_to_snake("camelCase") == "camel_case"

def test_complex():
    assert camel_to_snake("myVariableName") == "my_variable_name"

def test_single():
    assert camel_to_snake("hello") == "hello"
