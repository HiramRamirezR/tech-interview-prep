def camel_to_snake(input):
    result = ""
    for index, char in enumerate(input):
        if index > 0 and char.isupper():
            result += "_"
        result += char.lower()
    
    return result