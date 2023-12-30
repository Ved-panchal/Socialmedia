import { createReducer } from "@reduxjs/toolkit";
const initialState = {}

export const chatReducer = createReducer(initialState,(builder) => {
    builder
            .addCase("fetchChatsRequest",(state) => {
                state.loading = true;
            })

            .addCase("fetchChatsSuccess",(state,action) => {
                state.loading = false;
                state.chats = action.payload;
            })

            .addCase("accessChatsFailure",(state,action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase('clearErrors', (state) => {
                state.error = null
            })
})

export const createChatReducer = createReducer(initialState, (builder) => {
    builder
    .addCase("accessChatsRequest",(state) => {
        state.loading = true;
    })

    .addCase("accessChatsSuccess",(state,action) => {
        state.loading = false;
        state.FullChat = action.payload;
        state.isChat = action.datapayload;
    })

    .addCase("accessChatsFailure",(state,action) => {
        state.loading=false;
        state.error = action.payload;
    })

    .addCase('clearErrors', (state) => {
        state.error = null
    })
})