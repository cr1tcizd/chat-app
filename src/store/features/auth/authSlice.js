import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { token } from "../../../token";
import { getStorage } from "firebase/storage";

const app = initializeApp(token)


const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: getAuth(app),
    db: getFirestore(app),
    storage: getStorage(app, "gs://chat-react-8fcd0.appspot.com"),
    user: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload.user
    }
  }
});

export const {setCurrentUser} = authSlice.actions
export default authSlice.reducer