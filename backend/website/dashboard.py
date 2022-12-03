from flask import Blueprint, request
from flask import current_app as app
from flask_login import login_required, current_user
from flask_mysqldb import MySQL

dashboard = Blueprint('dashboard', __name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'Bank'
 
mysql = MySQL(dashboard)

@dashboard.route('/dashboard', methods=["GET", "POST"])
def login():
    return "<h1> hello dashboard<h1>"

@dashboard.route('/getuser', methods=["GET", "POST"])
def getuser():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM User")
    data = cursor.fetchall()
    return str(data)


