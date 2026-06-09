from solution import extract_emails

def test_extraction():
    text = "Contact us at support@example.com or sales@test.org"
    result = extract_emails(text)
    assert "support@example.com" in result
    assert len(result) == 2

def test_no_emails():
    assert extract_emails("Hello world") == []

def test_edge():
    text = "My email is first.last@sub.domain.co"
    result = extract_emails(text)
    assert "first.last@sub.domain.co" in result
