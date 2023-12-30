import axios from "axios"

export const sendMessage = (content,chatId) => async(dispatch) => {
    try {
        dispatch({
            type:"sendMessageRequest"
        })
        // api call here
        const {data} = axios.post("/message",{
            content,
            chatId,
        },{
            headers:{
                'Content-Type':'application/json'
            }
        })

        dispatch({
            type:"sendMessageSuccess",
            payload:data.message,
        })

    }   catch (error) {
        dispatch({
            type:"sendMessageFailure",
            payload:error.response.data.message,
        })

    }
}

export const fetchMessage = () => async (dispatch) => {
    try {
        dispatch({
            type:"fetchAllMessageRequest",
        })
        // api call here

        dispatch ({
            type:"fetchAllMessageSuccess",
            payload:data.message,
        })

    }   catch (error) {
        dispatch({
            type:"fetchAllMessageFailure",
            payload:error.response.data.message,
        })

    }
}