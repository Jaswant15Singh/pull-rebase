import {createSlice} from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";

const categorySlice=createSlice({
    name:"category",
    initialState:{
        data:[],
        response_status:null,
        error:null,
        message:null
    },
    reducers:{
        getCategoryData:function (state){
            state.data=[1];
            state.message='true';
        }
    }
})

export const {getCategoryData}=categorySlice.actions;
export default categorySlice.reducer;

