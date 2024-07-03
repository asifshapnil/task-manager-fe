import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../core/axiosClient";
import { setToken } from "../core/auth.service";

const initialState: any = {
    access_token: '',
    refresh_token: '',
    isLoading: false,
    isLoadingSignup: false,
    error: null,
};

export const signIn: any = createAsyncThunk(
    "content/signin",
    async (payload: any) => {
        const res = await axios.post(`/users/signin`, payload);
        const data = await res.data;
        debugger
        return data;
    }
);

export const signUp: any = createAsyncThunk(
    "content/signup",
    async (payload: any) => {
        const res = await axios.post(`/users/signup`, payload);
        const data = await res.data;
        return data;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder: any) => {
        builder.addCase(signIn.pending, (state: any) => {
            state.isLoading = true;
        });
        builder.addCase(signIn.fulfilled, (state: any, action: any) => {
            state.isLoading = false;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            setToken(action.payload.access_token, action.payload.refresh_token);
        });
        builder.addCase(signIn.rejected, (state: any, action: any) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(signUp.pending, (state: any) => {
            state.isLoadingSignup = true;
        });
        builder.addCase(signUp.fulfilled, (state: any, action: any) => {
            state.isLoadingSignup = false;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            setToken(action.payload.access_token, action.payload.refresh_token);
        });
        builder.addCase(signUp.rejected, (state: any, action: any) => {
            state.isLoadingSignup = false;
            state.error = action.error.message;
        });
    },
});

export default authSlice.reducer;
