def camel_to_snake(text):
    result = ""
    for i in text:
        if i == i.upper():
            result += "_" + i.lower()
        else:
            result += i
    print(result)
    return result

camel_to_snake("holaPatata")       