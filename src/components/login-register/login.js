import React, {useState, useContext} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
    const auth = useContext(AuthContext)

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const [SignIn, setSignIn] = useState({
        userid: "",
        password: "",
      });

    const changeHandler = (event) => {
        setInputs(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    console.log(inputs);

    axios.post('/login', inputs);

    console.log(SignIn.userid)
    console.log(SignIn.password)

    const clickLogin = () => {
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(SignIn)
        }).then((res) => res.json())
        .then((data) => {
            if (data.code == 200){
                auth.login(data.userid)
            }
        })
    }
    

return (
    <div>
    <h1> Login </h1> 

    <form action ="http://localhost:5000/login" method="POST">
        <div>
            <label for="username"> User Name </label>
            <input type="text" id="username" name="username" required onChange={(e) => setSignIn({ ...SignIn, userid: e.target.value })}
/>
        </div>
        <div>
            <label for="password"> Password </label>
            <input type="password" id="password" name="password" required onChange={(e) =>
                  setSignIn({ ...SignIn, password: e.target.value })
                }/>
        </div>
        <button onClick={clickLogin}>Login</button>
    </form>
    <a href="/register">Register</a>

    </div>
);
}