import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/home/home'
import Login from './components/login-register/login'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Login />} />
				<Route exact path="/home" element={<Home />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
