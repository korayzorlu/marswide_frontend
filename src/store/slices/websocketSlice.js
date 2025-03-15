import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../store";
import { fetchNotifications, send_notification, setUnreadNotifications } from "./notificationSlice";

const initialState = {
    
}

export const joinWebsocket = createAsyncThunk('websocket/joinWebsocket', async () => {
    const wsMain = new WebSocket(`${process.env.REACT_APP_WEBSOCKET_URL}/socket/`);

    wsMain.onopen = function() {
        console.log('WebSocket bağlantısı başarıyla kuruldu.');
    };

    wsMain.onerror = function(error) {
        console.error('WebSocket hatası:', error);
        wsMain.close();
    };
    
    wsMain.onclose = function () {
        console.log("Websocket kapatıldı!");
    };

    wsMain.onmessage = function(e) {
        const data = JSON.parse(e.data);
        const type = data.type
        const message = data.message;
        if(type === "send_notification"){
            store.dispatch(fetchNotifications()).unwrap();
            store.dispatch(send_notification(message));
            store.dispatch(setUnreadNotifications(1));
        };
    
    };

    return wsMain;
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