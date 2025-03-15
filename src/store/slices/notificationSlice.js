import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert as MDBAlert} from 'mdb-ui-kit';

const initialState = {
    alert:{color:"",icon:"",text:""},
    dialog:false,
    userDialog:false,
    modal:false,
    notifications:[],
    unreadNotifications:0
}

export const fetchNotifications = createAsyncThunk('websocket/fetchNotifications', async () => {
    const response = await axios.get(`/notifications/api/notifications`, {withCredentials: true});
    return response.data;
});

export const changeNotifications = createAsyncThunk('websocket/changeNotifications', async () => {
    const response = await axios.put(`/notifications/api/notifications/`,
        {   
            id: 0,
            is_read: true
        },
        {withCredentials: true}
    );
    return response.data;
});

export const readNotifications = createAsyncThunk('websocket/readNotifications', async () => {
    const response = await axios.post(`/notifications/read_notification/`,{withCredentials: true});
    return response.data;
});

const notificationSlice = createSlice({
    name:"notification",
    initialState,
    reducers:{
        setAlert: (state,action) => {
            state.alert = action.payload;
            let basicInstance = MDBAlert.getInstance(document.getElementById("mainAlert"));
            basicInstance.update({color:action.payload.color})
            basicInstance.show();
        },
        clearAlert: (state,action) => {
            state.alert = "";
        },
        setDialog: (state,action) => {
            state.dialog = action.payload;
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

export const {setAlert,clearAler,setDialog,setModal,send_notification,setUnreadNotifications,setUserDialog} = notificationSlice.actions;
export default notificationSlice.reducer;