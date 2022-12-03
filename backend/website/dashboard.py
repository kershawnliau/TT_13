from flask import Blueprint, request, jsonify
import json
from . import mysql

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
    cursor.execute("SELECT * FROM User")
    results = cursor.fetchall() 
    print("fetch result-->",type(results))  #is s list type, need to be a dict

    fields_list = cursor.description   # sql key name
    print("fields result -->",type(fields_list))

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

    #convert to json
    # json_data = json.dumps(jsonData_list)
    # print("print final json data",json_data)

    # results = list(results)
    # print(results)
    results = [str(i) for i in jsonData_list]
    #convert string to json
    # results = json.dumps(jsonData_list)
    # results = json.dumps(list(jsonData_list))
    #decode json
    json_str = json.dumps({'message': jsonData_list}, cls=BytesEncoder)
    return jsonify({"code": 200, "message": "success", "data": json_str})


