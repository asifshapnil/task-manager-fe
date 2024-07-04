import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../core/axiosClient";

const initialState: any = {
    notifications: [],
    notificationCount: 0,
    isLoading: false,
    error: null,
};

export const getNotifications: any = createAsyncThunk(
    "content/getNotifications",
    async () => {
        const res = await axios.get(`/notifications/getExpiryNotifications`);
        const data = await res.data;
        return data;
    }
);



export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
    },
    extraReducers: (builder: any) => {
        builder.addCase(getNotifications.pending, (state: any) => {
            state.isLoading = true;
        });
        builder.addCase(getNotifications.fulfilled, (state: any, action: any) => {
            state.isLoading = false;
            state.notifications = action.payload;
            state.notificationCount = action.payload.length;
        });
        builder.addCase(getNotifications.rejected, (state: any, action: any) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default notificationSlice.reducer;
