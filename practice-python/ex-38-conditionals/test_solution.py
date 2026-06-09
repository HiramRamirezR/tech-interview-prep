from solution import fizzbuzz_plus

def test_basic():
    assert fizzbuzz_plus(3) == ["1", "2", "Fizz"]

def test_fizzbuzz():
    result = fizzbuzz_plus(15)
    assert result[14] == "FizzBuzz"

def test_seven():
    result = fizzbuzz_plus(7)
    assert result[6] == "FizzBuzzPlus"
