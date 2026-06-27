def generate_slug(input):
    input = " ".join(input.lower().strip().split())
    slug = ""
    for i in input:
        if i.isalnum():
            slug += i
        elif i == " ":
            slug += "-"
        else:
            pass
    return slug