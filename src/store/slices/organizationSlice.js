import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { setAlert, setDialog } from "./notificationSlice";

const initialState = {
    companies:[],
    activeCompany:null,
    companiesLoading:false,
    disabled:false,
}

export const fetchCompanies = createAsyncThunk('organization/fetchCompanies', async () => {
    const response = await axios.get(`/companies/api/user_companies`, {withCredentials: true});
    return response.data;
});

export const changeActiveCompany = createAsyncThunk('organization/changeActiveCompany', async () => {
    const response = await axios.get(`/companies/api/user_companies`, {withCredentials: true});
    return response.data;
});

export const deleteCompany = createAsyncThunk('organization/deleteCompany', async (id,{dispatch,rejectWithValue,extra: { navigate }}) => {
    try {
        const response = await axios.post(`/companies/delete_company/`, 
            {   
                id : id,
            },
            {withCredentials: true},
        );
        if (response.status === 200){
            dispatch(setAlert({color:"secondary",text:"Successfully deleted!",icon:"check-circle"}));
            navigate("/companies");
        };
        return id;
    } catch (error) {
        if (error.status === 400){
            dispatch(setAlert({color:"danger",text:error.response.data.message,icon:"times-circle"}));
        } else {
            dispatch(setAlert({color:"danger",text:"Sorry, something went wrong!",icon:"times-circle"}));
        };
        return rejectWithValue(error.response.data);
    } finally {
        dispatch(fetchCompanies());
        dispatch(setDialog(false));
    }
});

const organizationSlice = createSlice({
    name:"organization",
    initialState,
    reducers:{
        setActiveCompany: (state,action) => {
            state.activeCompany = action.payload;
            sessionStorage.setItem('active_company', JSON.stringify(action.payload));
            localStorage.setItem('active_company', JSON.stringify(action.payload));
        },
        deleteActiveCompany: (state,action) => {
            state.activeCompany = null;
            sessionStorage.removeItem('active_company');
            localStorage.removeItem('active_company');
        },
    },
    extraReducers: (builder) => {
        builder
            //fetch companies
            .addCase(fetchCompanies.pending, (state) => {
                state.companiesLoading = true;
            })
            .addCase(fetchCompanies.fulfilled, (state,action) => {
                state.companies = action.payload;

                if (!action.payload.length > 0) {
                    console.log("1");
                    state.activeCompany = null;
                    sessionStorage.removeItem('active_company');
                    localStorage.removeItem('active_company');
                } else if (!state.activeCompany) {
                    console.log("2");
                    if (sessionStorage.getItem('active_company')) {
                        console.log("2-1");
                        state.activeCompany = JSON.parse(sessionStorage.getItem('active_company'));
                        localStorage.setItem('active_company', JSON.stringify(action.payload.find(({is_active}) => is_active === true)));
                    } else {
                        console.log("2-2");
                        if (localStorage.getItem('active_company')) {
                            console.log("2-2-1");
                            state.activeCompany = JSON.parse(localStorage.getItem('active_company'));
                            sessionStorage.setItem('active_company', localStorage.getItem('active_company'));
                        } else {
                            console.log("2-2-2");
                            state.activeCompany = action.payload.find(({is_active}) => is_active === true);
                            sessionStorage.setItem('active_company', JSON.stringify(action.payload.find(({is_active}) => is_active === true)));
                            localStorage.setItem('active_company', JSON.stringify(action.payload.find(({is_active}) => is_active === true)));
                        }
                    }
                } else if (!action.payload.includes(state.activeCompany)) {
                    console.log("3");
                    const activeCompany = action.payload.find(({is_active}) => is_active === true);
                    if (activeCompany) {
                        console.log("3-1");
                        state.activeCompany = activeCompany;
                        sessionStorage.setItem('active_company', JSON.stringify(activeCompany));
                        localStorage.setItem('active_company', JSON.stringify(activeCompany));
                    } else {
                        console.log("3-2");
                        state.activeCompany = null;
                        sessionStorage.removeItem('active_company');
                        localStorage.removeItem('active_company');
                    }
                };
                state.companiesLoading = false;
            })
            .addCase(fetchCompanies.rejected, (state,action) => {
                state.companiesLoading = false;
            })
            //delete company
            .addCase(deleteCompany.pending, (state) => {
                state.disabled = true;
            })
            .addCase(deleteCompany.fulfilled, (state,action) => {
                state.disabled = false;
            })
            .addCase(deleteCompany.rejected, (state,action) => {
                state.disabled = false;
            })
                
    }
})

export const {setActiveCompany,deleteActiveCompany} = organizationSlice.actions;
export default organizationSlice.reducer;