import { createSlice } from "@reduxjs/toolkit";
import { Alert as MDBAlert} from 'mdb-ui-kit';

const initialState = {
    alert:{color:"",icon:"",text:""},
}

const notificationSlice = createSlice({
    name:"notification",
    initialState,
    reducers:{
        setAlert: (state,action) => {
            state.alert = action.payload;
            console.log(action.payload)
            let basicInstance = MDBAlert.getInstance(document.getElementById("mainAlert"));
            basicInstance.update({color:action.payload.color})
            basicInstance.show();
        },
        clearAlert: (state,action) => {
            state.alert = "";
        }
    },
  
})

export const {setAlert,clearAlert} = notificationSlice.actions;
export default notificationSlice.reducer;