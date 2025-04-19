import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert as MDBAlert} from 'mdb-ui-kit';

const initialState = {
    alert:{color:"",icon:"",text:""},
    alertt:{status:"",text:""},
    openAlert:false,
    dialog:false,
    deleteDialog:false,
    importDialog:false,
    userDialog:false,
    modal:false,
    notifications:[],
    unreadNotifications:0
}

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async () => {
    const response = await axios.get(`/notifications/api/notifications`, {withCredentials: true});
    return response.data;
});

export const changeNotifications = createAsyncThunk('notifications/changeNotifications', async () => {
    const response = await axios.put(`/notifications/api/notifications/`,
        {   
            id: 0,
            is_read: true
        },
        {withCredentials: true}
    );
    return response.data;
});

export const readNotifications = createAsyncThunk('notifications/readNotifications', async () => {
    const response = await axios.post(`/notifications/read_notification/`,{withCredentials: true});
    return response.data;
});

const notificationSlice = createSlice({
    name:"notification",
    initialState,
    reducers:{
        setAlert: (state,action) => {
            state.alertt = {status:action.payload.status || "",text:action.payload.text || ""}
            state.openAlert = true;
        },
        setOpenAlert: (state,action) => {
            state.openAlert = action.payload;
        },
        clearAlert: (state,action) => {
            state.alert = "";
        },
        setDialog: (state,action) => {
            state.dialog = action.payload;
        },
        setDeleteDialog: (state,action) => {
            state.deleteDialog = action.payload;
        },
        setImportDialog: (state,action) => {
            state.importDialog = action.payload;
        },
        setUserDialog: (state,action) => {
            state.userDialog = action.payload;
        },
        setModal: (state,action) => {
            state.modal = action.payload;
        },
        send_notification: (state,action) => {

            
        },
        setUnreadNotifications: (state,action) => {
            state.unreadNotifications = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            //fetch websocket
            .addCase(fetchNotifications.pending, (state) => {

            })
            .addCase(fetchNotifications.fulfilled, (state,action) => {
                state.notifications = action.payload;
                state.unreadNotifications = action.payload.filter(item => !item.is_read).length;
            })
            .addCase(fetchNotifications.rejected, (state,action) => {
                
            })
    }
  
})

export const {setAlert,setOpenAlert,clearAler,setDialog,setDeleteDialog,setImportDialog,setModal,send_notification,setUnreadNotifications,setUserDialog} = notificationSlice.actions;
export default notificationSlice.reducer;