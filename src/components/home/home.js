import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Stack } from '@mui/material'
import HomeMenu from './components/HomeMenu'
import UserDetailsCard from './components/UserDetailsCard'
import axios from 'axios'
import Transaction from './Transaction/Transaction'
import PhishingModal from './components/PhishingModal'
import { AuthContext } from '../../context/AuthContext'

function Home() {
	const [user, setAuthenticated] = useState(false)
	const [username, setUsername] = useState('')
	const [totalBalance, setTotalBalance] = useState(0)
	const { isLoggedIn, userId, login, logout } = useContext(AuthContext);
	const [ accounts, setAccounts ] = useState(null);

	// function getTotalBalance(data) {
	// 	let sum = 0
	// 	data.forEach((item) => {
	// 		sum += Number.parseInt(item.TransactionAmount)
	// 	})
	// 	return sum
	// }

	function getUserData() {
		axios
			.get(`https://api.publicapis.org/entries`)
			.then((res) => {
				// let response = res.data
				setUsername('Emily Tan')
				setTotalBalance(100000)
				// setUsername(response.username)
				// setTotalBalance(getTotalBalance(response))
			})
			.catch((err) => {
				console.error(err)
				alert('unable to retrieve user data')
			})
	}

	function getAccountData() {
		axios
			.get(`http://127.0.0.1:5000/dashboard/${userId}` )
			.then((res) => {
				// let response = res.data
				setAccounts(res.data);
				console.log(res);
				// setUsername(response.username)
				// setTotalBalance(getTotalBalance(response))
			})
			.catch((err) => {
				console.error(err)
				alert('unable to retrieve account data')
			})
	}

	useEffect(() => {
		getUserData();
		getAccountData();
	}, [userId])

	return (
		<Container>
			<PhishingModal />
			<Container
				style={{
					flexDirection: 'row',
					justifyContent: 'flex-end',
					marginTop: 12,
					marginBottom: 12
				}}
			>
				<HomeMenu />
			</Container>

			<UserDetailsCard username={username} balance={totalBalance} />
			<Transaction accounts={accounts} />
			<Button
				variant="contained"
				style={{
					position: 'fixed',
					bottom: '50px',
					right: '50px',
					backgroundColor: 'red'
				}}
			>
				Add
			</Button>
		</Container>
	)
}

export default Home
