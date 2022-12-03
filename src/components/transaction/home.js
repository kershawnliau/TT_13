import {useState, useEffect} from 'react';
var bankBalance = 10

function Transaction() {
  const [recipient, setRecipient] = useState('');
  const [accountType, setAccountType] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');
  const [bankAcc, setBankAcc] = useState([]);
  const userid = 1;

  useEffect(() => {
    fetch("http://localhost:5000/getbankaccount", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userid: userid
      })

    })
    .then(response => response.json())
    .then(data => setBankAcc(data.data))
  },[])

  console.log(bankAcc)
  
  const handleSubmit = event => {
    console.log('handleSubmit ran');
    event.preventDefault(); // prevent page refresh

    if(!isNaN(amount)){
      bankBalance -= amount
    }

    // access input values here
    console.log('Recipient', recipient);
    console.log('AccountType', accountType);
    console.log('Amount', amount);
    console.log("bankBalance", bankBalance)
    console.log('Date', date);
    console.log('Comments', comments);
    
    // clear all input values in the form
    setRecipient('');
    setAccountType('');
    setAmount('');
    setDate('');
    setComments('');
  };

  return (
    <>
      <div>Supposed to have a NAV bar here</div>
      <h1>New Transaction</h1>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>  
        <label>
          Recipient ID:
          <input
            id="Recipient" 
            type="text" 
            name="Recipient" 
            onChange={event => setRecipient(event.target.value)}
            value={recipient}/>
        </label>

        <label>
          Recipient Account Type:
          <input
            id="AccountType" 
            type="text" 
            name="AccountType" 
            onChange={event => setAccountType(event.target.value)}
            value={accountType}/>
        </label>

        <label>
          Amount:
          <input
            id="Amount" 
            type="text" 
            name="Amount" 
            onChange={event => {
              if(!isNaN(event.target.value)){
                if(bankBalance >= parseFloat(event.target.value)){
                  console.log("bankBalance", bankBalance)
                  setAmount(parseFloat(event.target.value))
                }
                else{
                  setAmount("Balance:" + bankBalance)
                  setTimeout(() => { setAmount(""); }, 700);
                }
              }
              else{
                setAmount("Not a valid value")
                setTimeout(() => { setAmount(""); }, 700);
              }
              }
            }
            value={amount}/>
        </label>

        <label>
          Date to Transfer:
          <input
            id="Date" 
            type="date" 
            name="Date" 
            onChange={event => setDate(event.target.value)}
            value={date}/>
        </label>

        <label>
        Comments:
          <input
            id="Comments" 
            type="text" 
            name="Comments" 
            onChange={event => setComments(event.target.value)}
            value={comments}/>
        </label>

        <button type="submit">Submit form</button>
      </form> 
    </>
    )
}

export default Transaction;
