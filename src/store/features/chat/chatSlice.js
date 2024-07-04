import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    currentMember: null,
    chatsActive: true,
    imgModal: {
      photo: null,
      status: false,
    },
  },
  reducers: {
    setCurrentMember(state, action) {
      state.currentMember = action.payload.contact;
    },
    setActiveChats(state, action) {
      state.chatsActive = action.payload
    },
    setImgModal(state, action) {
      state.imgModal = action.payload
    }
  },
});

export const {setCurrentMember, setActiveChats, setImgModal} = chatSlice.actions

export default chatSlice.reducer