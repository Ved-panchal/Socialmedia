import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import {Box} from "@mui/material"
import { getAllUsers } from '../../Actions/User'
import "./Style.css"
import MyChats from './MyChats'
import Chatpage from './Chatpage';
import SingleChat from './SingleChat'
import { fetchChats } from '../../Actions/Chat'
import { useAlert } from 'react-alert'

const Chat = () => {
    const dispatch = useDispatch()
    const alert = useAlert();

    const { chats, error, message } = useSelector((state) => state.chat);

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(fetchChats())
    }, [dispatch])
    
    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
          }
          if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
          }
    },[alert, error,message,dispatch])

    return (
        <div className='Chatpage'>
            <MyChats chats={chats} />
            <SingleChat/>
           
        </div>
    )
}

export default Chat
