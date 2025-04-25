import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setAlert, setDialog } from "../notificationSlice";
import { setIsProgress } from "../processSlice";
import { fetchUser } from "../authSlice";

const initialState = {
    
}

export const updateProfile = createAsyncThunk('auth/updateProfile', async ({data=null},{dispatch}) => {
    dispatch(setIsProgress(true));
    try {
        const formData = new FormData();
        const jsonData = JSON.stringify(
            Object.fromEntries(
                Object.entries(data).filter(([key]) => key !== 'image')
            )
        );
        formData.append("data", jsonData);

        if (data.image) {
            formData.append("image", data.image);
        };

        const response = await axios.post(`/users/profile_settings/`,
            formData,
            {   
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            },
        );  
        dispatch(setAlert({status:response.data.status,text:response.data.message}));
    } catch (error) {
        if(error.response.data){
            dispatch(setAlert({status:error.response.data.status,text:error.response.data.message}));
        }else{
            dispatch(setAlert({status:"error",text:"Sorry, something went wrong!"}));
        };
        return null
    } finally {
        dispatch(fetchUser());
        dispatch(setIsProgress(false));
    }
});

export const updatePersonal = createAsyncThunk('auth/updatePersonal', async ({data=null},{dispatch}) => {
    dispatch(setIsProgress(true));
    try {
        const response = await axios.put(`/users/api/users/${data.id}/`,
            data,
            { 
                withCredentials: true
            },
        );
        dispatch(setAlert({status:"success",text:"Saved successfully!"}));
    } catch (error) {
        if(error.response.data){
            dispatch(setAlert({status:error.response.data.status,text:error.response.data.message}));
        }else{
            dispatch(setAlert({status:"error",text:"Sorry, something went wrong!"}));
        };
        return null
    } finally {
        dispatch(fetchUser());
        dispatch(setIsProgress(false));
    }
});

const settingsSlice = createSlice({
    name:"settings",
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        
    },
  
})

export const {} = settingsSlice.actions;
export default settingsSlice.reducer;