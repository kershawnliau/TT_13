import React, { useEffect, useState } from 'react'
import { Container, Stack } from '@mui/material'
import HomeMenu from './components/HomeMenu'
import UserDetailsCard from './components/UserDetailsCard'
import axios from 'axios'
import Transaction from './Transaction/Transaction'

function Home() {
	const [userData, setUserData] = useState({})

	function getUserData() {
		let response
		axios
			.get(`https://api.publicapis.org/entries`)
			.then((res) => {
				response = res.data
				setUserData(response)
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

			<UserDetailsCard username="User 123" balance="100,000" />
            <Transaction />
		</Container>
	)
}

export default Home
