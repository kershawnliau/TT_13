import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #e2e2e2',
	borderRadius: 8,
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3
}

export default function NestedModal() {
	const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	useEffect(() => {
		setTimeout(() => handleOpen(), 1500)
	}, [])

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box sx={{ ...style, width: 400 }}>
					<h2 id="parent-modal-title">Beware of phishing scams</h2>
					<p id="parent-modal-description">
						Never click on SMSes with links. Some short-term actions
						we take might lead to delays in transactions...
					</p>
					<Button
						onClick={handleClose}
						style={{ color: '#ed1d24', alignSelf: 'end' }}
					>
						Dismiss
					</Button>
				</Box>
			</Modal>
		</div>
	)
}
