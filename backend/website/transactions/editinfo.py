from flask import Blueprint, request
from flask import jsonify
from website import mysql

editinfo = Blueprint('editinfo', __name__)

@editinfo.route('/edit', methods=["GET"])
def edit():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("select * from user")
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    results = cursor.fetchall()
    jsondata=[]
    results = list(results)
    for result in results:
        li = list(result)
        for rs in li:            
            if isinstance(rs, bytes):
                li[li.index(rs)] = rs.decode('utf-8')
        jsondata.append(dict(zip(row_headers, li)))
    print(jsondata)
    return jsonify(jsondata)

@editinfo.route('/update', methods=["POST"])
def update():
    return "<h1> update <h1>"