from flask import Blueprint, request
from flask import jsonify
from website import mysql

editinfo = Blueprint('editinfo', __name__)

@editinfo.route('/edit', methods=["GET"])
def edit():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bankaccount")
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    results = cursor.fetchall()
    print(results)
    print("...")
    jsondata=[]
    for result in results:
        jsondata.append(dict(zip(row_headers, result)))
    print(jsondata)
    return jsonify(jsondata)

@editinfo.route('/update', methods=["POST"])
def update():
    return "<h1> update <h1>"