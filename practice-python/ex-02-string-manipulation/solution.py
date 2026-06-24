def is_palindrome(input):
    input = "".join(input.split()).lower()
    return input == input[::-1]