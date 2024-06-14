import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    currentMember: [],
  },
  reducers: {
    setCurrentMember(state, action) {
      state.currentMember = action.payload.contact;
    },
  },
});

export const {setCurrentMember} = chatSlice.actions

export default chatSlice.reducer