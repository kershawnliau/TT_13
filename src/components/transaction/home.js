import {useState} from 'react'; 
var bankBalance = 10

function Transaction() {
  const [recipient, setRecipient] = useState('');
  const [accountType, setAccountType] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');

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
        <h1 className="text-2xl flex justify-center content-center">New Transaction</h1>
        <form onSubmit={handleSubmit} className="flex justify-center flex-row content-center">  
            <div className="w-1/4"/>
            <div className="flex justify-center flex-col content-center w-1/2">
            <label>
            Recipient ID:
            </label>

            <label>
            Recipient Account Type:
            </label>
            

            <label>
            Amount:
            </label>

            <label>
            Date to Transfer:
            </label>

            <label>
            Comments:
            </label>
            
            </div>

            <div className='w-1/4'>
            <input
                id="Recipient" 
                type="text" 
                name="Recipient" 
                onChange={event => setRecipient(event.target.value)}
                value={recipient}
                className='border-slate-1000 border-2'/>

            <input
                id="AccountType" 
                type="text" 
                name="AccountType" 
                onChange={event => setAccountType(event.target.value)}
                value={accountType}
                className='border-slate-1000 border-2'/>

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
                value={amount}
                className='border-slate-1000 border-2'/>
            
            <input
                id="Date" 
                type="date" 
                name="Date" 
                onChange={event => setDate(event.target.value)}
                value={date}
                className='border-slate-1000 border-2'/>

            <input
                id="Comments" 
                type="text" 
                name="Comments" 
                onChange={event => setComments(event.target.value)}
                value={comments}
                className='border-slate-1000 border-2'/>
            
            <button type="submit">Submit form</button>
            </div>
            <div className="w-1/4"/>
        </form> 
        </>
    )
}

export default Transaction;
