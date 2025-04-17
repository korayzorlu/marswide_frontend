import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    partners:[],
    partnersCount:0,
    partnersParams:{
        start: 0 * 50,
        end: (0 + 1) * 50,
        format: 'datatables'
    },
    partnersLoading:false,
}

export const fetchPartners = createAsyncThunk('auth/fetchPartners', async ({activeCompany,serverModels=null,params=null}) => {
    console.log(params)
    try {
        const response = await axios.get(`/partners/partners/?active_company=${activeCompany.id}`,
            {   
                params : params,
                headers: {"X-Requested-With": "XMLHttpRequest"}
            }
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
        setPartnersLoading: (state,action) => {
            state.partnersLoading = action.payload;
        },
        setPartnersParams: (state,action) => {
            state.partnersParams = {
                ...state.partnersParams,
                ...action.payload
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartners.pending, (state) => {
                state.partnersLoading = true
            })
            .addCase(fetchPartners.fulfilled, (state,action) => {
                state.partners = action.payload.data || action.payload;
                state.partnersCount = action.payload.recordsTotal || 0;
                state.partnersLoading = false
            })
            .addCase(fetchPartners.rejected, (state,action) => {
                state.partnersLoading = false
            })
    },
  
})

export const {setPartnersLoading,setPartnersParams} = partnerSlice.actions;
export default partnerSlice.reducer;