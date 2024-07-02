import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../core/axiosClient";

const initialState: any = {
    access_token: '',
    refresh_token: '',
    isLoading: false,
    error: null,
};

export const signIn: any = createAsyncThunk(
    "content/signin",
    async () => {
        const res = await axios.get(`/signin`);
        const data = await res.data;
        return data;
    }
);

export const signUp: any = createAsyncThunk(
    "content/signup",
    async () => {
        const res = await axios.get(`/signin`);
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
        builder.addCase(signIn.pending, (state: any) => {
            state.isLoading = true;
        });
        builder.addCase(signIn.fulfilled, (state: any, action: any) => {
            state.isLoading = false;
            state.access_token = action.payload.data.access_token;
            state.refresh_token = action.payload.data.refresh_token;
        });
        builder.addCase(signIn.rejected, (state: any, action: any) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(signUp.pending, (state: any) => {
            state.isLoading = true;
        });
        builder.addCase(signUp.fulfilled, (state: any, action: any) => {
            state.isLoading = false;
            state.access_token = action.payload.data.access_token;
            state.refresh_token = action.payload.data.refresh_token;
        });
        builder.addCase(signUp.rejected, (state: any, action: any) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export const { setEmployees } = categorySlice.actions;
export default categorySlice.reducer;
