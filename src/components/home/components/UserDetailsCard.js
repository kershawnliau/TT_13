import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

export default function UserDetailsCard({ username, balance }) {
	return (
		<Card
			style={{
				borderColor: 'transparent',
				boxShadow: 'none'
			}}
			sx={{ minWidth: 275 }}
		>
			<CardContent style={{ margin: 12 }}>
				<Typography
					sx={{ fontSize: 14 }}
					color="text.secondary"
					gutterBottom
				>
					Welcome!
				</Typography>
				<Typography variant="h5" component="div">
					{username}
				</Typography>
				<Divider
					style={{
						marginTop: 12,
						marginBottom: 12,
						justifyContent: 'center',
						color: 'transparent'
					}}
				/>
				<Typography variant="body2">Total Balance</Typography>
				<Typography variant="h5" component="div">
					${balance}
				</Typography>
			</CardContent>
		</Card>
	)
}
