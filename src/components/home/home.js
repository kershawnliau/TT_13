import React, { useEffect, useState, useContext } from 'react'
import { Button, Container, Stack } from '@mui/material'
import HomeMenu from './components/HomeMenu'
import UserDetailsCard from './components/UserDetailsCard'
import axios from 'axios'
import Transaction from './Transaction/Transaction'
import PhishingModal from './components/PhishingModal'
import { AuthContext } from '../../context/AuthContext'

function Home() {
	const userId = 1
	// const { userId } = useContext(AuthContext)
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
			.get(`http://localhost:5000/edit`)
			.then((res) => {
				console.log('res', res)
				let response = res.data
				let user = response.filter((item) => item.UserID == userId)[0]
				setUsername(user.Firstname + ' ' + user.Lastname)
			})
			.catch((err) => {
				console.error(err)
				alert('unable to retrieve user data')
			})
	}

	useEffect(() => {
		getUserData()

		fetch('http://localhost:5000/getbankaccount', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userid: userId
			})
		})
			.then((response) => response.json())
			.then((data) => {
				let sum = 0
				data.forEach((item) => {
					// console.log('item', item['AccountBalance'])
					sum += item['AccountBalance']
				})

				setTotalBalance(sum)
			})
	}, [])

	useEffect(() => {
		console.log('userId:', userId)
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
