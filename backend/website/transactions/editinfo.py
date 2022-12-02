from flask import Blueprint, request
from flask import Response
from flask import jsonify
from website import mysql

editinfo = Blueprint('editinfo', __name__)

@editinfo.route('/allusers', methods=["GET"])
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

@editinfo.route('/<userid>', methods=["GET"])
def getuserinfo(userid):
    conn = mysql.connect()
    cursor = conn.cursor()
    sqlstatement = "select * from user where userid=" + str(userid)
    cursor.execute(sqlstatement)
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

@editinfo.route('/<userid>', methods=["POST"])
def updateuserinfo(userid):
    email   = request.args.get("email")
    address = request.args.get("address")
    
    conn    = mysql.connect()
    cursor  = conn.cursor()
    
    sqlstatement = "update user set email='" + str(email) + "' where userid=" + str(userid) + ";"
    cursor.execute(sqlstatement)
    
    sqlstatement = "update user set address='" + str(address) + "' where userid=" + str(userid) + ";"
    cursor.execute(sqlstatement)
    
    conn.commit()
    
    return Response("{}", status=200, mimetype='application/json')