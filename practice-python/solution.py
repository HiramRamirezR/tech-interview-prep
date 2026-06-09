def is_palindrome(text):
    text = text.lower()
    text = text.split(" ")
    text = "".join(text)
    return text == text[::-1]