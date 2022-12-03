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


@auth.route('/login', methods=["GET", "POST"])
def login(username,password):
    msg = ''
    if request.method == "POST" and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM User WHERE username = %s AND password = %s", (username, password))
        results = cursor.fetchone()

        print(results)

    if results:
        session['loggedin'] = True
        session['id'] = results['id']
        session['username'] = results['username']
        return "Logged in successfully!"
    else:
        msg = "Incorrect username/password"
        return 'No'

    # return render_template('login.html', msg=msg)
    # form = LoginForm()
                # return UserID jsonify
                # return redirect(url_for('dashboard'))  # put dashboard html
    # return render_template('login.html', form=form)  # put login html


# @auth.route('/')
# def home():
#     if 'loggedin' in session:
#         return render_template('home.html', username=session['username'])
#     return render_template('home.html') #put in home html
#
#
# @auth.route('/dashboard', methods=['GET', 'POST'])
# @login_required
# def dashboard():
#     return render_template('dashboard.html') #put dashboard html
#
#
# @auth.route('/logout', methods=['GET', 'POST'])
# @login_required
# def logout():
#     logout_user()
#     session.pop('loggedin', None)
#     session.pop('id', None)
#     session.pop('username', None)
#     return redirect(url_for('login')) #put login html

