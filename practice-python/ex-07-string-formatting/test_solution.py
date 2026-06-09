from solution import format_phone
import pytest

def test_format():
    assert format_phone("5551234567") == "(555) 123-4567"

def test_invalid_length():
    with pytest.raises(ValueError):
        format_phone("123")

def test_non_digit():
    with pytest.raises(ValueError):
        format_phone("555123456a")
