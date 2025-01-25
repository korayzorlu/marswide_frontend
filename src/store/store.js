import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import notificationReducer from './slices/notificationSlice';
import processReducer from './slices/processSlice';
import sidebarReduce from './slices/sidebarSlice';
import tableReducer from './slices/tableSlice';

export const store = configureStore({
    reducer:{
        auth: authReducer,
        notification: notificationReducer,
        process: processReducer,
        sidebar: sidebarReduce,
        table: tableReducer,
    }
})