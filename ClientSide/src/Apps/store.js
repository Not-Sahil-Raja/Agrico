import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./userInfoslice";
import cartSlice from "./cartSlice";
import itemPopUp from "./itemPopUp";
import sellerDetailsSlice from "./sellerDetailsslice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    cart: cartSlice,
    itemPopUp: itemPopUp,
    sellerDetail: sellerDetailsSlice,
  },
});
