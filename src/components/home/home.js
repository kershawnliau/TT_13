import React from 'react'
import { Container, Stack } from '@mui/material'
import HomeMenu from './components/HomeMenu'
import UserDetailsCard from './components/UserDetailsCard'

function Home() {
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
		</Container>
	)
}

export default Home
