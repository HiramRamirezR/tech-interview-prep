def camel_to_snake(text):
    result = ""
    for i, char in enumerate(text):
        if char.isupper() and i > 0:
            result += "_"
        result += char.lower()
    return result
