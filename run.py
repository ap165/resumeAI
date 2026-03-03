from app.app import create_app
import flask_cors

app = create_app()

flask_cors.CORS(app)  # Enable CORS for all routes

app.route('/')
def index():
    return 'Resume AI Backend!'


if __name__ == '__main__':
    app.run(debug=True)