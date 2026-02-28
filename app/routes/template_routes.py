from flask import Blueprint, render_template, send_file
from app.models import dummy_resume_data as data
from app import templatePath

templates = Blueprint('templates', __name__, url_prefix='/templates', template_folder=templatePath, static_folder='static')


@templates.route('/', methods=['GET'])
def get_templates():
    return send_file('data/templates.json', mimetype='application/json')

@templates.route('/<key>', methods=['GET'])
def get_template(key):
    return render_template(f'{key}.html', **data)