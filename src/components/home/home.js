import React, { useEffect, useState } from 'react'
import { Button, Container, Stack } from '@mui/material'
import HomeMenu from './components/HomeMenu'
import UserDetailsCard from './components/UserDetailsCard'
import axios from 'axios'
import Transaction from './Transaction/Transaction'
import PhishingModal from './components/PhishingModal'

function Home() {
	const [user, setAuthenticated] = useState(false)
	const [username, setUsername] = useState('')
	const [totalBalance, setTotalBalance] = useState(0)

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

	useEffect(() => {
		getUserData()
	}, [])

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
			<Transaction />
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
