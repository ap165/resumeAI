from app.routes import resumes, templates, ai

def create_app():
    from flask import Flask

    app = Flask(__name__)
    app.register_blueprint(templates)
    app.register_blueprint(resumes)
    app.register_blueprint(ai)

    return app