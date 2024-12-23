import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || {
    username: "",
    email: "",
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    userlogin: (state, action) => {
      state.userInfo.username = action.payload.username;
      state.userInfo.email = action.payload.email;
      state.userInfo.show = action.payload.show;

      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    userlogout: (state) => {
      state.userInfo.username = "";
      state.userInfo.email = "";
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
  },
});

export const { userlogin, userlogout } = userInfoSlice.actions;

export default userInfoSlice.reducer;
