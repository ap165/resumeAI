import os

templatePath = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'templates')

API_KEY = os.getenv('OPENAI_API_KEY')