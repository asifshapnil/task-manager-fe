import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../core/axiosClient";

const initialState: any = {
    isLoading: false,
    isLoadingTicket: false,
    error: null,
};


export const postTickethistory: any = createAsyncThunk(
    "content/postTickethistory",
    async (payload: any) => {
        const res = await axios.post(`/tickethistory`, payload);
        const data = await res.data;
        return data;
    }
);

export const tickethistorySlice = createSlice({
    name: "tickethistory",
    initialState,
    reducers: {
    },
    extraReducers: (builder: any) => {
        builder.addCase(postTickethistory.pending, (state: any) => {
            state.isLoading = true;
        });
        builder.addCase(postTickethistory.fulfilled, (state: any, action: any) => {
            state.isLoading = false;
            state.categories = action.payload;
        });
        builder.addCase(postTickethistory.rejected, (state: any, action: any) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default tickethistorySlice.reducer;
