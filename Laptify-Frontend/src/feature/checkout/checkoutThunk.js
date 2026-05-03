import { getErrorMessage } from "@/lib/axiosClient.js";
import {getLatestCustomerPlacementInfo } from "@/services/orderApi.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getCustomerInfo = createAsyncThunk("checkout/getCustomerInfo", 
    async (_, thunkAPI) => {
        try{
            const res = await getLatestCustomerPlacementInfo();
            return res.data
        }catch(e){
            const message = getErrorMessage(e, "Lấy thông tin đặt hàng không thành công")
            toast.error(message)
            return thunkAPI.rejectWithValue(message);
        }
    }
)