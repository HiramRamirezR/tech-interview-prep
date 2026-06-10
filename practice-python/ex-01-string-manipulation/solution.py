def camel_to_snake(input):
    result = ""
    for index, char in enumerate(input):
        if index > 0:
            if char.isupper():
                result += "_" + char.lower()
            else:
                result += char
        else:
            result += char.lower()
    
    return result

camel_to_snake("snake_case")