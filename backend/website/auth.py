from flask import Blueprint, request
from . import mysql

auth = Blueprint('auth', __name__)


@auth.route('/login/', methods=["GET", "POST"])
def login(username, password):
    conn = mysql.connect()
    cursor = conn.cursor()

    return "<h1> hello world<h1>"
    

