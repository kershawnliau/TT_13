from flask import Blueprint, request, Response
from datetime import datetime
from .. import mysql


transactions = Blueprint('transactions', __name__)


@transactions.route('/test', methods=["GET"])
def test():
    try:
        now = datetime.now()
        currentDT = now.strftime('%y-%m-%d')

        conn = mysql.connect()
        cursor = conn.cursor()
        q = "INSERT INTO Test (username, creation_date) VALUES (%s, %s)"
        values = (username, currentDT)
        cursor.execute(q, values)
        conn.commit()
        return 'Success', 201
    except:
        return print("EXCEPTION")

@transactions.route('/create', methods=["GET"])
def createTransaction():
    try:
        accountID = 621156213
        receiveAccountID = 339657462
        amount = 8000.50
        comment = "Hello test"
        now = datetime.now()
        currentDT = now.strftime('%y-%m-%d')

        conn = mysql.connect()
        cursor = conn.cursor()
        q = "INSERT INTO ScheduledTransactions (transactionid, accountid, receivingaccountid, date, transactionamount, comment) VALUES (%s, %s, %s, %s, %f, %s)"
        values = (10, accountID, receiveAccountID, currentDT, amount, comment)
        cursor.execute(q, values)
        conn.commit()
        return 'Success', 201
    except:
        return print("EXCEPTION")
        


@transactions.route('/delete/<transaction_id>', methods=["POST"])
def deleteTransaction(transaction_id):
    try:
        id = transaction_id
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM ScheduledTransactions WHERE TransactionID = %s", (id))
        conn.commit()
        return 'Success', 201
    except:
        return print("EXCEPTION");

