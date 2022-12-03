from flask import Blueprint, request, jsonify
import json
from . import mysql
import decimal

dashboard = Blueprint('dashboard', __name__)

class BytesEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, bytes):
            return obj.decode('utf-8')
        return json.JSONEncoder.default(self, obj)

 

@dashboard.route('/dashboard', methods=["GET", "POST"])
def login():
    return "<h1> hello dashboard<h1>"

@dashboard.route('/getusers', methods=["GET", "POST"])
def getuser():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT UserID, Username, Firstname, Lastname, Email, Address FROM User")
    results = cursor.fetchall() 

    fields_list = cursor.description   # sql key name

    column_list = []
    for i in fields_list:
        column_list.append(i[0])

    jsonData_list = []
    for row in results:
        data_dict = {}
        for i in range(len(column_list)):
            data_dict[column_list[i]] = row[i]
        jsonData_list.append(data_dict)
    print("print final json data",jsonData_list)

    json_str = json.dumps(jsonData_list, cls=BytesEncoder)
    print(type(json_str))
    results = json_str.replace("\\","")
    print(results)
    return jsonify({"data": json_str, "code":200})


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

    return jsonify({"data": str(jsonData_list), "code":200})


