from flask import Blueprint, send_file, render_template, make_response, request
from app import templatePath
from weasyprint import HTML
# from app.models import dummy_resume_data as data


resumes = Blueprint('resumes', __name__, url_prefix='/download', template_folder=templatePath)

@resumes.route('/pdf/<key>', methods=['GET'])
def download_pdf(key):
    data = request.get_json()
    rendered = render_template(f"{key}.html", **data)
    pdf = HTML(string=rendered).write_pdf() # Generate PDF from rendered HTML
    response = make_response(pdf)
    response.headers["Content-Type"] = "application/pdf"
    response.headers["Content-Disposition"] = f"attachment; filename={key}_resume.pdf"
    return response 

