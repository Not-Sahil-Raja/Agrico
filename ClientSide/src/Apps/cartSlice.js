import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const cartitem = action.payload;
      state.cartItems = [...state.cartItems, cartitem];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { _id, opr } = action.payload;

      state.cartItems = state.cartItems
        .map((item) =>
          item._id === _id
            ? {
                ...item,
                quantity:
                  opr === "+" ? parseInt(item.quantity) + 1 : item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    emptyCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    addSellDet: (state, action) => {
      const soldDet = action.payload;
      state.cartItems = state.cartItems.map(
        (item) => (item = { ...item, soldDet })
      );
    },
    //not working
    updateCart: (state, action) => {
      const updatedItem = action.payload;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCart,
  emptyCart,
  addSellDet,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
