import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfoslice";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    cart: cartSlice,
  },
});
