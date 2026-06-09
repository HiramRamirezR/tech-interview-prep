import pytest
from solution import camel_to_snake

def test_basic_conversion():
    assert camel_to_snake("camelCase") == "camel_case"

def test_multiple_words():
    assert camel_to_snake("thisIsATestString") == "this_is_a_test_string"

def test_single_word():
    assert camel_to_snake("hello") == "hello"