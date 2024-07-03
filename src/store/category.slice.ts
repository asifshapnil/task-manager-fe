import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../src/core/axiosClient";

const initialState: any = {
    categories: [],
    isLoading: false,
    error: null,
};

export const getCategories: any = createAsyncThunk(
    "content/getCategories",
    async () => {
        const res = await axios.get(`/categories`);
        const data = await res.data;
        return data;
    }
);

export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
    },
    extraReducers: (builder: any) => {
        builder.addCase(getCategories.pending, (state: any) => {
            state.isLoading = true;
        });
        builder.addCase(getCategories.fulfilled, (state: any, action: any) => {
            state.isLoading = false;
            state.categories = action.payload;
        });
        builder.addCase(getCategories.rejected, (state: any, action: any) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default categorySlice.reducer;
