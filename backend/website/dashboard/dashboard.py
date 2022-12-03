from flask import Blueprint, request, jsonify, Response
from website import mysql
from flask_cors import CORS, cross_origin


dashboard = Blueprint('dashboard', __name__)

cors = CORS(dashboard)


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

@dashboard.route('/getbankaccount', methods=["GET", "POST"])
def getbankaccount():
    print("getbankaccount")
    userid = request.get_json()["userid"]
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bankaccount where UserID = %s", (userid) )
    print("userid",userid)
    results = cursor.fetchall() 
    results = list(results)
    print(results)
    fields_list = cursor.description

    column_list = []
    for i in fields_list:
        column_list.append(i[0])

    jsonData_list = []
    for row in results:
        print(type(row))
        data_dict = {}
        for i in range(len(column_list)):
            print(type(column_list[i]))
            #convert to float if decimal
            if isinstance(row[i], decimal.Decimal):
                data_dict[column_list[i]] = float(row[i])
            else:
                data_dict[column_list[i]] = row[i]

        jsonData_list.append(data_dict)
    print("print final json data",jsonData_list)

    return jsonify(jsonData_list)


