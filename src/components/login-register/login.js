import React, {useState} from 'react';
import axios from 'axios';

export default function Login() {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const changeHandler = (event) => {
        setInputs(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    console.log(inputs);

    axios.post('/login', inputs);



return (
    <div>
    <h1> Login </h1> 

    <title> </title>

    <form action ="/login" method="POST">
        <div>
            <label for="text"> User Name </label>
            <input type="text" id="username" name="username" required onChange={changeHandler}/>
        </div>
        <div>
            <label for="password"> Password </label>
            <input type="password" id="password" name="password" required onChange={changeHandler}/>
        </div>
        <button type="submit">Login</button>
    </form>
    {/*<a href="/register">Register</a>*/}

    </div>
);
}