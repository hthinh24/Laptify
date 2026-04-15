const { createSlice } = require("@reduxjs/toolkit")


const initialValue = {
    cart: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState : initialValue,
    extraReducers: builder => {
        builder.addCase()
    }
})
