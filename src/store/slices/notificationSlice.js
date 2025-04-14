import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert as MDBAlert} from 'mdb-ui-kit';

const initialState = {
    alert:{color:"",icon:"",text:""},
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
            state.alert = action.payload;
            const defaultMessage = "Successfull!";
            const defaultErrorMessage = "Sorry, something went wrong!";
            const getAlertProps = (status) => {
                switch (status) {
                    case 200:
                    return {
                        color:action.payload.color || "secondary",
                        icon:action.payload.icon || "check-circle",
                        text:action.payload.text || defaultMessage,
                    };
                    case 201:
                    return {
                        color:action.payload.color || "secondary",
                        icon:action.payload.icon || "check-circle",
                        text:action.payload.text || defaultMessage,
                    };
                    case 400:
                    return {
                        color:action.payload.color || "danger",
                        icon:action.payload.icon || "times-circle",
                        text:action.payload.text || defaultErrorMessage,
                    };
                    case 401:
                    return {
                        color:action.payload.color || "danger",
                        icon:action.payload.icon || "times-circle",
                        text:action.payload.text || defaultErrorMessage,
                    };
                    case 403:
                    return {
                        color:action.payload.color || "danger",
                        icon:action.payload.icon || "times-circle",
                        text:action.payload.text || defaultErrorMessage,
                    };
                    case 404:
                    return {
                        color:action.payload.color || "danger",
                        icon:action.payload.icon || "times-circle",
                        text:action.payload.text || defaultErrorMessage,
                    };
                    case 500:
                    return {
                        color:action.payload.color || "danger",
                        icon:action.payload.icon || "times-circle",
                        text:action.payload.text || defaultErrorMessage,
                    };
                    default:
                    return {
                        color:action.payload.color || "secondary",
                        icon:action.payload.icon || "circle",
                        text:action.payload.text || defaultMessage,
                    };
                }
            };
            const { color, icon, text } = getAlertProps(action.payload.status);
            state.alert = {color, icon, text};
            let basicInstance = MDBAlert.getInstance(document.getElementById("mainAlert"));
            //basicInstance.update({color:action.payload.color})
            basicInstance.update({color:color});
            basicInstance.show();
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

export const {setAlert,clearAler,setDialog,setDeleteDialog,setImportDialog,setModal,send_notification,setUnreadNotifications,setUserDialog} = notificationSlice.actions;
export default notificationSlice.reducer;