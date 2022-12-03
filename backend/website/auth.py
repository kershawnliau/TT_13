from flask import Blueprint, request
from . import mysql

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=["GET", "POST"])
def login():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bankaccount")
    results = cursor.fetchall()
    print(results)

    return "<h1> hello world<h1>"
    

