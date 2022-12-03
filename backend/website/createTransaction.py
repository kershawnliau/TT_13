from flask import Blueprint, request
from . import mysql
from flask import jsonify


transactions = Blueprint('transactions', __name__)


@transactions.route('/create', methods=["GET"])
def createTransaction():
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO ScheduledTransactions (TransactionID, AccountID, ReceivingAccountID, Date, TransactionAmount, Comment) VALUES ()")
    results = cursor.fetchall()
    return "<h1> hello world<h1>"


@transactions.route('/delete/<transaction_id>', methods=["GET"])
def deleteTransaction(transaction_id):
    try:
        id = transaction_id
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM ScheduledTransactions WHERE TransactionID = %s", (id))
        conn.commit()
    except:
        print("An exception occured")

    return "<h1>Transaction has been deleted!<h1>"
    

