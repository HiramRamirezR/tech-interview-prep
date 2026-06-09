from solution import fizzbuzz

def test_basic():
    assert fizzbuzz(5) == ["1", "2", "Fizz", "4", "Buzz"]

def test_fizzbuzz():
    result = fizzbuzz(15)
    assert result[14] == "FizzBuzz"

def test_first():
    assert fizzbuzz(1) == ["1"]

def test_multiple_of_three():
    result = fizzbuzz(3)
    assert result[2] == "Fizz"
