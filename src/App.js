import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import './App.css'
import Home from './components/home/home'
import Login from './components/login-register/login'
import ProfilePage from './components/profile/ProfilePage'
import { AuthContext } from './context/AuthContext'
import Transaction from './components/home/Transaction/Transaction'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [userId, setUserId] = useState(null)
	const login = (userId) => {
		setIsLoggedIn(true)
		setUserId(userId)
	}
	const logout = () => {
		setIsLoggedIn(false)
		setUserId(null)
	}

	let route
	if (isLoggedIn) {
		route = (
			<Routes>
				<Route path="/home" element={<Home />} exact />
				<Route path="/profile" element={<ProfilePage />} exact />
				<Route path="/transactions" element={<Transaction />} exact />
			</Routes>
		)
	} else {
		route = (
			<Routes>
				<Route path="/" element={<Login />} exact />
			</Routes>
		)
	}

	useEffect(() => {
		console.log('is logged in:', isLoggedIn)
	}, [isLoggedIn])

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				userId: userId,
				login: login,
				logout: logout
			}}
		>
			<BrowserRouter>{route}</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App
