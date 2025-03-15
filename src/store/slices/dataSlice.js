import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    countries:[],
}

export const fetchCountries = createAsyncThunk('data/fetchCountries', async () => {
    const response = await axios.get(`/data/api/countries`, {withCredentials: true});
    return response.data;
});

const dataSlice = createSlice({
    name:"data",
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
            //fetch countries
            .addCase(fetchCountries.pending, (state) => {

            })
            .addCase(fetchCountries.fulfilled, (state,action) => {
                state.countries = action.payload;
            })
            .addCase(fetchCountries.rejected, (state,action) => {

            })
    }
})

export const {} = dataSlice.actions;
export default dataSlice.reducer;