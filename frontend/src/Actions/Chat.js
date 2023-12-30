import axios from "axios"

export const fetchChats = () => async(dispatch) => {
    try {
        dispatch({
            type:'fetchChatsRequest',
        })
        // api call here
        const {data} = await axios.get("/api/v1/chat",{
            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:'fetchChatsSuccess',
            payload:data.chats,
        })

    }   catch(error) {

        dispatch({
            type:'fetchChatsFailure',
            payload: error.response.data.message,
        })
    }
}

export const accessChat = (userId) => async(dispatch) => {
    try {
        dispatch({
            type: "accessChatsRequest",
        })

        const {data} = await axios.post("api/v1/chat",
        {
            userId
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        dispatch({
            type:"accessChatsSuccess",
            payload: data.FullChat,
            datapayload: data.isChat
        })

    } catch (error) {
        dispatch({
            type:"accessChatsFailure",
            payload: error.response.data.message,
        })
    }
}