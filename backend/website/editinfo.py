from flask import Blueprint, request

editinfo = Blueprint('editinfo', __name__)

@editinfo.route('/edit', methods=["GET", "POST"])
def edit():
    return "<h1> edit <h1>"

@editinfo.route('/update', methods=["GET", "POST"])
def update():
    return "<h1> update <h1>"