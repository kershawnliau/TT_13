from flask import Flask
from os import path
from flask_login import LoginManager
from flaskext.mysql import MySQL

mysql = MySQL()

def create_app():
    app = Flask(__name__)

    app.config['MYSQL_DATABASE_USER']       = 'root'
    app.config['MYSQL_DATABASE_PASSWORD']   = 'root'
    app.config['MYSQL_DATABASE_DB']         = 'bank'
    app.config['MYSQL_DATABASE_HOST']       = 'localhost'
    mysql.init_app(app)


    from .auth                   import auth
    from .transactions.editinfo  import editinfo
    from .createTransaction import transactions

    
    app.register_blueprint(auth     , url_prefix='/')
    app.register_blueprint(editinfo , url_prefix='/')
    app.register_blueprint(transactions, url_prefix="/")
    
    return app
