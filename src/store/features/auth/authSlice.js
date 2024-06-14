import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";
import { token } from "../../../token";
import { useDocument } from "react-firebase-hooks/firestore";

const app = initializeApp(token)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: getAuth(app),
    db: getFirestore(app),
  },
 
});

export default authSlice.reducer