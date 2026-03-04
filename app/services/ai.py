import requests
from app import API_KEY


def get_ai_response(prompt):
    url = "https://openrouter.ai/api/v1/chat/completions"
    payload = {
        "messages": [
            {
                "role": "system", 
                "content": "You are a professional resume writing assistant."
            },
            {
                "role": "user", 
                "content": prompt
            }
        ],
        "model": "arcee-ai/trinity-large-preview:free",
        "max_tokens": 250,
        "temperature": 0.7
    }
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    response = requests.post(url, json=payload, headers=headers)
    return response.json()