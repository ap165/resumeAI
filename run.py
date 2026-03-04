from app.app import create_app
import flask_cors

app = create_app()



if __name__ == '__main__':
    app.run(debug=True)