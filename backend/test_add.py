import requests

# The URL of your local FastAPI server
url = " https://birthdaypage-production.up.railway.app/api/rsvp"

# The test data matching your GuestRSVP model
test_data = {
    "guest_name": "Test Guest",
    "attending": True,
    "plus_one": 1,
    "bringing_food": "Apple Pie"
}

# Send the POST request
try:
    response = requests.post(url, json=test_data)

    # Print the results
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.json()}")

except requests.exceptions.ConnectionError:
    print("Error: Could not connect. Is your FastAPI server running?")