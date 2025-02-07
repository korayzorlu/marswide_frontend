import { createSlice } from "@reduxjs/toolkit";
import { Alert as MDBAlert} from 'mdb-ui-kit';

const initialState = {
    alert:{color:"",icon:"",text:""},
    dialog:false,
    modal:false,
}

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
        setModal: (state,action) => {
            state.modal = action.payload;
        },
    },
  
})

export const {setAlert,clearAler,setDialog,setModal} = notificationSlice.actions;
export default notificationSlice.reducer;