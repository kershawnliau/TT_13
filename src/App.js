import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home";
import Login from "./components/login-register/login";
import ProfilePage from "./components/profile/ProfilePage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route />
        </Routes>
    </BrowserRouter>
    // <ProfilePage />
    // <Home />
  );
}

export default App;
