import React, { useEffect, useState } from 'react'
import { Container, Stack } from '@mui/material'
import HomeMenu from './components/HomeMenu'
import UserDetailsCard from './components/UserDetailsCard'
import axios from 'axios'
import Transaction from './Transaction/Transaction'

function Home() {
	const [userData, setUserData] = useState({
		username: 'Emily Tan',
		balance: '100,000'
	})

	function getUserData() {
		let response
		axios
			.get(`https://api.publicapis.org/entries`)
			.then((res) => {
				response = res.data
				// setUserData(response)
			})
			.catch((err) => {
				console.error(err)
				alert('unable to retrieve user data')
			})
	}

	useEffect(() => {
		getUserData()
	}, [])

	useEffect(() => {
		console.log('userData response: ', userData)
	}, [userData])

	return (
		<Container>
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

			<UserDetailsCard
				username={userData.username}
				balance={userData.balance}
			/>
			<Transaction />
		</Container>
	)
}

export default Home
