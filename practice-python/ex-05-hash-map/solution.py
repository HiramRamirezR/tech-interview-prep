def char_frequency(input):
    result = {}
    for i in input:
        result[i] = result.get(i, 0) + 1
    return result
