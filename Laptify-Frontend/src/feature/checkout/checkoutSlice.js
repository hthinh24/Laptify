import { getCustomerInfo } from "@/feature/checkout/checkoutThunk.js";
import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  items: [],
  customerInfo: {
    customerName: '',
    email: '',
    address: '',
    phoneNumber: '',
    isSaved: false,
  },
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: initialValue,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setCustomerInfo: (state, action) => {
      state.customerInfo = { ...state.customerInfo, ...action.payload };
    },
    clearCheckout: (state) => {
      state.items = [];
      state.customerInfo = {
        customerName: '',
        email: '',
        address: '',
        phoneNumber: '',
        isSaved: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomerInfo.fulfilled, (state, action) => {
      state.customerInfo = { ...action.payload, isSaved: false };
    });
  },
});

export const { setItems, setCustomerInfo, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;