from app.routes import resumes, templates

def create_app():
    from flask import Flask

    app = Flask(__name__)
    app.register_blueprint(templates)
    app.register_blueprint(resumes)

    return app