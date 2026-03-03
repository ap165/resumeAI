from app.services import get_ai_response
from flask import Blueprint, request, jsonify

ai = Blueprint('ai', __name__, url_prefix='/ai')

@ai.route('/response', methods=['POST'])
def ai_response():
        data = request.get_json()
        text = data.get('text', '')
        try:    
            response = get_ai_response(text)
            return jsonify(response)
        except Exception as e:
            return jsonify({"error": str(e)}), 500