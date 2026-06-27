def find_max(arr):
    if arr == []:
        return None
    n = arr[0]
    for i in arr:
        if i > n:
            n = i
    return n
