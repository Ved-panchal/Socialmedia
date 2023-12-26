import { Avatar, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Visibility, VisibilityOff} from "@mui/icons-material"
import { Link } from 'react-router-dom'
import './Register.css'
import { registerUser } from '../../Actions/User'
import { useAlert } from 'react-alert'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [show,setShow] = useState(false);
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, error } = useSelector((state) => state.user)

    const handlechange = () => {
      setShow(!show)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        const Reader = new FileReader()
        Reader.readAsDataURL(file)

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result)
            }
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(registerUser(name, email, password, avatar))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: 'clearErrors' })
        }
    }, [dispatch, error, alert])
    return (
        <div className="register">
            <form className="registerForm" onSubmit={submitHandler}>
                <Typography variant="h3" style={{ padding: '2vmax' }}>
                    Social Aap
                </Typography>

                <Avatar
                    src={avatar}
                    alt="User"
                    sx={{ height: '10vmax', width: '10vmax' }}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    className="registerInputs"
                    required
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="registerInputs"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="inputpassword">
                    <input
                        type={show ? 'text' : 'password'}
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {show ? (
                        <Visibility
                            style={{
                                position: 'absolute',
                                margin: '10px',
                            }}
                            onClick={handlechange}
                        />
                    ) : (
                        <VisibilityOff
                            style={{
                                position: 'absolute',
                                margin: '10px',
                            }}
                            onClick={handlechange}
                        />
                    )}
                </div>

                <Link to="/">
                    <Typography>Already Signed Up? Login Now</Typography>
                </Link>

                <Button disabled={loading} type="submit">
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

export default Register
