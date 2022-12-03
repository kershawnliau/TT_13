import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import transactions from "../../../ScheduledTransaction.json";
import accounts from "../../../BankAccount.json";

function Transaction() {
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function checkTransactions(selectedTxn) {
    // console.log(selectedTransactions)
    const exists = selectedTransactions.find(transaction => transaction.id === selectedTxn.id);
    console.log(exists);
    if (exists === undefined) {
        console.log(selectedTransactions)
        setSelectedTransactions(selectedTransactions.concat(selectedTxn));
    } else {
        let newList = selectedTransactions.filter(transaction => transaction.id !== selectedTxn.id);
        setSelectedTransactions(newList);
    }
  }

  useEffect(() => {
    console.log(selectedTransactions);
  }, [selectedTransactions])
  

  return (
    <div>
      {accounts.map((account, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary>
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <span style={{ flex: "1" }}>{account.AccountType}</span>
                <span className="account-balance">
                  {currencyFormat(account.AccountBalance)}
                </span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <ButtonGroup style={{ flex: "1" }}>
                  <Button>Add</Button>
                  <Button>Delete</Button>
                </ButtonGroup>
              </div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {/* TODO: fix checkbox */}
                      <Checkbox />
                    </TableCell>
                    <TableCell>Transaction ID</TableCell>
                    <TableCell>Account ID</TableCell>
                    <TableCell>Receiving Account ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Comments</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox
                            onChange={() => checkTransactions(transaction)}
                          />
                        </TableCell>
                        <TableCell>{transaction.TransactionID}</TableCell>
                        <TableCell>{transaction.AccountID}</TableCell>
                        <TableCell>{transaction.ReceivingAccountID}</TableCell>
                        <TableCell>{transaction.Date}</TableCell>
                        <TableCell>{transaction.TransactionAmount}</TableCell>
                        <TableCell>{transaction.Comments}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        );
      })}
      ;
    </div>
  );
}

export default Transaction;
