import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "users",
  initialState: {
    currentMember: [],
  },
  reducers: {
  },
});

export const {addUser} = chatSlice.actions

export default chatSlice.reducer