from flask import Blueprint, render_template, url_for, redirect, jsonify, request, session
from flask_login import login_user, LoginManager, login_required, logout_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length
from . import mysql

auth = Blueprint("auth",__name__)


login_manager = LoginManager()
# login_manager.init_app(auth)
login_manager.login_view = "login"


class LoginForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Password"})
    submit = SubmitField("Login")


@auth.route('/login', methods=["POST"])
def login():
    username = request.get_json()['username']
    password = request.get_json()['password']
    print("username",username)
    print("password",password)
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT UserID FROM User WHERE username = %s AND password = %s", (username, password))
    results = cursor.fetchone()
    print(str(results))
    fields_list = cursor.description

   
    if results != None:
        print("success")
        return jsonify({"data": "success", "code":200, "userid": str(results[0])})
    else:
        return jsonify({"data": "fail", "code":400})

    # msg = ''
    # if request.method == "POST" and 'username' in request.form and 'password' in request.form:
        
        

    #     print(results)

    # if results:
    #     session['loggedin'] = True
    #     session['id'] = results['id']
    #     session['username'] = results['username']
    #     return "Logged in successfully!"
    # else:
    #     msg = "Incorrect username/password"
    #     return 'No'