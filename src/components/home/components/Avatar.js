import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import avatarImg from '../../../assets/avatar.jpg'

export default function CustomAvatar({ name }) {
	return <Avatar alt={name} src={avatarImg} sx={{ width: 56, height: 56 }} />
}
