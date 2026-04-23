import { login } from "@/services/authApi.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk("auth/login",async (data, thunkApi) => {
    try{
        const res = (await login(data)).data.data
        return res;
    }catch(e){
        return thunkApi.rejectWithValue(e)
    }
})