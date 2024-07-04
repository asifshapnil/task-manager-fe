import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../core/axiosClient";

const initialState: any = {
    tickets: [],
    ticketDetail: {},
    isLoading: false,
    isLoadingTicket: false,
    error: null,
};

export const getTicket: any = createAsyncThunk(
    "content/getTicket",
    async (id: number) => {
        const res = await axios.get(`/tickets/${id}`);
        const data = await res.data;
        return data;
    }
);

export const postTicket: any = createAsyncThunk(
    "content/postTicket",
    async (payload: any) => {
        const res = await axios.post(`/tickets`, payload);
        const data = await res.data;
        return data;
    }
);

export const updateTicket: any = createAsyncThunk(
    "content/updateTicket",
    async (payload: any) => {
        const id = payload.id;
        delete payload.id;
        const res = await axios.put(`/tickets/${id}`, payload);
        const data = await res.data;
        return data;
    }
);

export const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
    },
    extraReducers: (builder: any) => {
        builder.addCase(getTicket.pending, (state: any) => {
            state.isLoadingTicket = true;
        });
        builder.addCase(getTicket.fulfilled, (state: any, action: any) => {
            state.isLoadingTicket = false;
            state.ticketDetail = action.payload;
        });
        builder.addCase(getTicket.rejected, (state: any, action: any) => {
            state.isLoadingTicket = false;
            state.error = action.error.message;
        });
        builder.addCase(postTicket.pending, (state: any) => {
            state.isLoading = true;
        });
        builder.addCase(postTicket.fulfilled, (state: any, action: any) => {
            state.isLoading = false;
            state.categories = action.payload;
        });
        builder.addCase(postTicket.rejected, (state: any, action: any) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(updateTicket.pending, (state: any) => {
            state.isLoading = true;
        });
        builder.addCase(updateTicket.fulfilled, (state: any, action: any) => {
            state.isLoading = false;
            state.categories = action.payload;
        });
        builder.addCase(updateTicket.rejected, (state: any, action: any) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    },
});

export default ticketSlice.reducer;
