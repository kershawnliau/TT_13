from flask import Flask
from os import path
from flask_login import LoginManager
from flaskext.mysql import MySQL


def create_app():
    app = Flask(__name__)

    from .auth import auth
    app.register_blueprint(auth, url_prefix='/')
    
    return app
