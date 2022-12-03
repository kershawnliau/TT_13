from flask import Blueprint, request, Response
from datetime import datetime
from .. import mysql


transactions = Blueprint('transactions', __name__)


@transactions.route('/create', methods=["POST"])
def createTransaction():
    try:
        accountID = "621156213"
        receiveAccountID = 828120424
        transactionAmount = 8000
        comment = "Hello test"
        now = datetime.now()
        currentDT = now.strftime('%Y-%m-%d %H:%M:%S')

        conn = mysql.connect()
        cursor = conn.cursor()
        q = "INSERT INTO ScheduledTransactions (AccountID, ReceivingAccountID, Date, TransactionAmount, Comment) VALUES (%s, %d, %s, %d, %s)"
        values = (accountID, receiveAccountID, currentDT, transactionAmount, comment)
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

