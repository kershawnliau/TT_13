from flask import Blueprint, request
from website import mysql

editinfo = Blueprint('editinfo', __name__)

@editinfo.route('/edit', methods=["GET"])
def edit():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bankaccount")
    results = cursor.fetchall()
    print(results)
    return "<h1> edit <h1>"

@editinfo.route('/update', methods=["POST"])
def update():
    return "<h1> update <h1>"