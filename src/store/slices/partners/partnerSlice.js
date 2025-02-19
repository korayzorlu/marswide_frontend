import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    partners:[],
    partnersLoading:false,
}

export const fetchPartners = createAsyncThunk('auth/fetchPartners', async (activeCompany) => {
    try {
        const response = await axios.get(`/partners/partners/?active_company=${activeCompany.id}`,
            {headers: {"X-Requested-With": "XMLHttpRequest"}}
        );
        return response.data;
    } catch (error) {
        return [];
    }
});

const partnerSlice = createSlice({
    name:"partner",
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartners.pending, (state) => {
                state.partnersLoading = true
            })
            .addCase(fetchPartners.fulfilled, (state,action) => {
                state.partners = action.payload;
                state.partnersLoading = false
            })
            .addCase(fetchPartners.rejected, (state,action) => {
                state.partnersLoading = false
            })
    },
  
})

export const {} = partnerSlice.actions;
export default partnerSlice.reducer;