import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../categories/slice";

const store=configureStore({
    reducer:{
        categorySlice:categorySlice
    }
})

export default store;