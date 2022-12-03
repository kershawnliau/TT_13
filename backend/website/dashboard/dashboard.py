from flask import Blueprint, request, jsonify, Response
from website import mysql

dashboard = Blueprint('dashboard', __name__)

@dashboard.route('/dashboard/<id>', methods=["GET"])
def get_user_bank_details(id):
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM bankaccount WHERE USERID = {id}")
    row_headers=[x[0] for x in cursor.description] #this will extract row headers
    row_headers.append("scheduledTxn")
    rv = cursor.fetchall()
    jsondata=[]
    results = list(rv)
    for result in results:
        scheduled_txns = []
        li = list(result)
        account_id = li[0]   
        for rs in li:            
            if isinstance(rs, bytes):
                li[li.index(rs)] = rs.decode('utf-8')
        cursor.execute(f"SELECT * FROM scheduledtransactions WHERE accountid={account_id}")
        row_headers2 = [x[0] for x in cursor.description]
        var = list(cursor.fetchall())
        for i in var:
            scheduled_txns.append(dict(zip(row_headers2, i)))
        li.append(scheduled_txns)
        jsondata.append(dict(zip(row_headers, li)))
    return jsonify(jsondata)
