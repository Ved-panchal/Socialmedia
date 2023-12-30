import React from 'react'
import "../Home/Home.css"
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

const User = ({ userId, name, avatar, isChat}) => {
  return (
    <Link to={`/user/${userId}`} className={isChat? "Userdetails" : "homeUser"}>
        <img src={avatar} alt={name} />
        <Typography style={{color:"var(--socials-secondary)",fontWeight:"200"}}>
            {name}
        </Typography>
    </Link>
  )
}

export default User
