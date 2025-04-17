import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../store";
import { fetchNotifications, send_notification, setAlert, setUnreadNotifications } from "./notificationSlice";
import { fetchImportProcess, setImportProgress } from "./processSlice";
import { fetchPartners } from "./partners/partnerSlice";

const initialState = {
    
}

const fetchActions = {
    fetchPartners,
};

export const connectWebsocket = () => {
    const wsMain = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}/socket/`);

    wsMain.onopen = function() {
        console.log('WebSocket bağlantısı başarıyla kuruldu.');
    };

    wsMain.onerror = function(error) {
        console.error('WebSocket hatası:', error);
        wsMain.close();
    };
    
    wsMain.onclose = function (event) {
        console.log(`Websocket kapatıldı! Kod: ${event.code}`);
        setTimeout(function() {
            connectWebsocket();
        }, 1000);
    };

    window.onload = function() {
        wsMain.close();
    };

    window.onbeforeunload = function() {
        wsMain.close();
    };

    wsMain.onmessage = function(e) {
        const data = JSON.parse(e.data);
        const type = data.type
        const message = data.message;
        

        if(type === "send_notification"){
            store.dispatch(fetchNotifications()).unwrap();
            store.dispatch(send_notification(message));
            store.dispatch(setUnreadNotifications(1));
        }else if(type === "send_alert"){
            store.dispatch(setAlert({status:message.status,text:message.message}));
        }else if(type === "send_import_process_percent"){
            store.dispatch(setImportProgress({task:message.task,progress:message.progress}));
        }else if(type === "fetch_import_processes"){
            store.dispatch(fetchImportProcess());
            if(message.status === "completed" || message.status === "rejected"){
                const actionName = `fetch${message.model}s`;

                if (fetchActions[actionName]) {
                    store.dispatch(fetchActions[actionName](
                        {
                            activeCompany:message.activeCompany,
                            params:{
                                start: 0 * 50,
                                end: (0 + 1) * 50,
                                format: 'datatables'
                            }
                        }
                    ));
                }
            }
        };
    
    };

    return wsMain;
}

export const joinWebsocket = createAsyncThunk('websocket/joinWebsocket', async () => {
    connectWebsocket();
    return true;
});



const websocketSlice = createSlice({
    name:"websocket",
    initialState,
    reducers:{
        
    },
    extraReducers: (builder) => {
        builder
            //join websocket
            .addCase(joinWebsocket.pending, (state) => {

            })
            .addCase(joinWebsocket.fulfilled, (state,action) => {
            })
            .addCase(joinWebsocket.rejected, (state,action) => {
                
            })

            
                
    }
})


export const {} = websocketSlice.actions;
export default websocketSlice.reducer;