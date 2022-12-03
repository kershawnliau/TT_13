import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home";
import Login from "./components/login-register/login";
import ProfilePage from "./components/profile/ProfilePage";
import Transaction from "./components/transaction/home"

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/transaction" element={<Transaction />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
