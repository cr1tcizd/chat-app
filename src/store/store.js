import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice'
import chatReducer from './features/chat/chatSlice.js'
import {} from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
   },
   middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});
