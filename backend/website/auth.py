from flask import Blueprint, request

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=["GET", "POST"])
def login():
    return "<h1> hello world<h1>"

