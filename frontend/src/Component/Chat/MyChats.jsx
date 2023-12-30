import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { Button, Typography } from '@mui/material'
import {SearchRounded,Message} from "@mui/icons-material"
import User from '../User/User'
import { Box } from '@mui/material'
import { getAllUsers } from '../../Actions/User'
import './Style.css'
import { accessChat, fetchChats } from '../../Actions/Chat'

const MyChats = () => {
    const [userSearch, setUserSearch] = React.useState('');
    const [selectedChat,setSelectedChat] = useState();

    const { users, loading } = useSelector((state) => state.allUsers)
    const {FullChat,isChat} = useSelector((state) => state.createchat)
    const dispatch = useDispatch()

    const handleMessage = async (_id) => {
      await dispatch(accessChat(_id))
      setSelectedChat(isChat)
      console.log(selectedChat)
    }
    

    const submitHandler = (e) => {
        e.preventDefault()
        if(userSearch === null) {
          dispatch(getAllUsers())
        }
        dispatch(getAllUsers(userSearch))
    }
    return (
            <Box
                height={600}
                width={400}
                bgcolor={'rgb(21, 17, 31)'}
                borderRadius={2}
                margin={2}
            >
                <div className="searchUser">
                    <form className="searchFormUser" onSubmit={submitHandler}>
                        {/* <Typography variant="h4" style={{ paddingBottom:"10px"}}  alignSelf={'center'} >
                            Search User
                        </Typography> */}

                        <div className='input-container'>
                        <input
                            type="text"
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                        />
                        <label>
                          Search User
                        </label>

                        <Button type="submit" style={{
                          position:"absolute",
                          marginLeft:"280px",
                          color:"white",
                        }}>
                            <SearchRounded fontSize='medium'/>
                        </Button>
                        </div>

                        <div className="searchResults">
                        {users &&
                                users.map((user) => (
                                  <div className='Usermessage'>
                                    <div className='Userdetails'>
                                    <User
                                        key={user._id}
                                        userId={user._id}
                                        name={user.name}
                                        avatar={user.avatar.url}
                                        isChat={true}
                                        />
                                        </div>
                                        <Button style={{
                                          color:"white"
                                        }} onClick={()=>{
                                          handleMessage(user._id)
                                        }}>
                                    <Message style={{cursor:"pointer"}}/>    
                                        </Button>
                                  </div>
                                ))}
                        </div>
                    </form>
                </div>
            </Box>

    )
}

export default MyChats
