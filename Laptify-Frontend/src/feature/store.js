import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "./checkout/checkoutSlice.js";
import wishlistReducer from "./wishlist/wishlistSlice.js";
import cartReducer from './cart/cartSlice.js'
import authReducer from './auth/authSlice.js'

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    checkout: checkoutReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
