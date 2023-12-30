import { createReducer } from "@reduxjs/toolkit";
const initialState = {}

export const messageReducer = createReducer(initialState,(builder) => {
    builder
            .addCase("sendMessageRequest",(state) => {
                state.loading = true
            })

            .addCase("sendMessageSuccess",(state,action) => {
                state.loading = false;
                state.message = action.payload;
            })

            .addCase("sendMessageFailure",(state,action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase("fetchAllMessageRequest",(state) => {
                state.loading = true
            })

            .addCase("fetchAllMessageSuccess",(state,action) => {
                state.loading = false;
                state.message = action.payload;
            })

            .addCase("fetchAllMessageFailure",(state,action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase('clearErrors', (state) => {
                state.error = null
            })
    
            .addCase('clearMessage', (state) => {
                state.message = null
            })
})