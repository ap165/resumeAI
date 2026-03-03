import os

templatePath = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'templates')
API_KEY = os.getenv('AI_API_KEY')

# print("API_KEY in __init__.py:", API_KEY)  # Debugging line to check if API_KEY is loaded