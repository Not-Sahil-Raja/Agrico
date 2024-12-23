import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sellerDetails: JSON.parse(localStorage.getItem("sellerDetails")) || {
    sellerLoggedIn: false,
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    displayName: "",
    profilePic: "",
  },
};

export const sellerDetailsSlice = createSlice({
  name: "sellerDetails",
  initialState,
  reducers: {
    sellerLogin: (state, action) => {
      state.sellerDetails.sellerLoggedIn = true;
      state.sellerDetails.firstName = action.payload.firstName;
      state.sellerDetails.lastName = action.payload.lastName;
      state.sellerDetails.email = action.payload.email;
      state.sellerDetails.profilePic = action.payload.profilePic;

      localStorage.setItem(
        "sellerDetails",
        JSON.stringify(state.sellerDetails)
      );
    },
    sellerLogout: (state) => {
      state.sellerDetails = {
        sellerLoggedIn: false,
        firstName: "",
        lastName: "",
        email: "",
        profilePic: "",
      };
      localStorage.setItem(
        "sellerDetails",
        JSON.stringify(state.sellerDetails)
      );
    },
    sellerUpdate: (state, action) => {
      state.sellerDetails.sellerLoggedIn = true;
      state.sellerDetails.firstName = action.payload.firstName;
      state.sellerDetails.lastName = action.payload.lastName;
      state.sellerDetails.email = action.payload.email;
      state.sellerDetails.profilePic = action.payload.profilePic;
      state.sellerDetails.bio = action.payload.bio ? action.payload.bio : "";
      state.sellerDetails.displayName = action.payload.displayName
        ? action.payload.displayName
        : action.payload.firstName + " " + action.payload.lastName;

      localStorage.setItem(
        "sellerDetails",
        JSON.stringify(state.sellerDetails)
      );
    },
  },
});

export const { sellerLogin, sellerLogout, sellerUpdate } =
  sellerDetailsSlice.actions;

export default sellerDetailsSlice.reducer;
