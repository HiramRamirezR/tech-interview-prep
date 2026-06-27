def char_frequency(input):
    result = {}
    if input == "":
        return {}
    for i in input:
        times = result.get(i, 0)
        result[i] = times + 1 
    return result
