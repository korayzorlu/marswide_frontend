import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import notificationReducer from './slices/notificationSlice';
import processReducer from './slices/processSlice';
import sidebarReduce from './slices/sidebarSlice';
import tableReducer from './slices/tableSlice';
import themeReducer from './slices/themeSlice';
import subscriptionsReducer from './slices/subscriptionsSlice';
import organizationReducer from './slices/organizationSlice';
import partnerReducer from './slices/partners/partnerSlice';
import websocketReducer from './slices/websocketSlice';
import dataReducer from './slices/dataSlice';
import accountReducer from './slices/accounting/accountSlice';
import settingsReducer from './slices/settings/settingsSlice';

let navigate;

export const setNavigate = (nav) => {
    navigate = nav;
};

export const store = configureStore({
    reducer:{
        auth: authReducer,
        websocket: websocketReducer,
        subscriptions: subscriptionsReducer,
        organization: organizationReducer,
        data: dataReducer,
        notification: notificationReducer,
        partner: partnerReducer,
        process: processReducer,
        sidebar: sidebarReduce,
        //table: tableReducer,
        theme: themeReducer,
        account: accountReducer,
        settings: settingsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: { navigate: (e) => navigate(e) },
          },
        }),
})
