from flask import Flask
from os import path
from flask_login import LoginManager
from flaskext.mysql import MySQL

def create_app():
    app = Flask(__name__)
    return app