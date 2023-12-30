import { configureStore } from '@reduxjs/toolkit'
import {
    allUsersReducer,
    postOfFollowingReducer,
    userProfileReducer,
    userReducer,
} from './Reducers/User'
import { likeReducer, myPostsReducer, uniquePostReducer, userPostsReducer } from './Reducers/Post'
import { messageReducer } from './Reducers/Message'
import { chatReducer, createChatReducer } from './Reducers/Chat'

const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allUsersReducer,
        like: likeReducer,
        myPosts: myPostsReducer,
        userProfile: userProfileReducer,
        userPosts: userPostsReducer,
        uniquePost: uniquePostReducer,
        message: messageReducer,
        chat: chatReducer,
        createchat: createChatReducer,
    },
})

export default store
