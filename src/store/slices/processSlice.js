import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    progress:{display:false,value:0},
}

const processSlice = createSlice({
    name:"process",
    initialState,
    reducers:{
        setProgress: (state,action) => {
            state.progress = action.payload;
        },
        clearProgress: (state,action) => {
            state.progress = "";
        }
    },
  
})

export const {setProgress,clearProgress} = processSlice.actions;
export default processSlice.reducer;