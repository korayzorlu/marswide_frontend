import { createSlice } from "@reduxjs/toolkit";
import { createTheme } from "@mui/material/styles";

import { AllCommunityModule, ModuleRegistry, themeBalham,themeQuartz, colorSchemeDark } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

const initialState = {
    tableLightThemee:themeQuartz.withParams({
        accentColor: "#15BDE8",
        backgroundColor: "#fff",
        borderColor: "#ffffff00",
        borderRadius: 0,
        browserColorScheme: "light",
        cellHorizontalPaddingScale: 1,
        chromeBackgroundColor: {
            ref: "backgroundColor"
        },
        columnBorder: false,
        foregroundColor: "#000",
        headerBackgroundColor: "#f7f7f7",
        headerFontWeight: 500,
        headerTextColor: "#000",
        headerVerticalPaddingScale: 0.9,
        iconSize: 20,
        rowBorder: false,
        rowVerticalPaddingScale: 1.2,
        sidePanelBorder: false,
        spacing: 5,
        wrapperBorder: false,
        wrapperBorderRadius: 0
    }),
    tableDarkThemee:themeQuartz.withParams({
        accentColor: "#15BDE8",
        backgroundColor: "#1b1f23",
        borderColor: "#ffffff00",
        borderRadius: 0,
        browserColorScheme: "dark",
        cellHorizontalPaddingScale: 1,
        chromeBackgroundColor: {
            ref: "backgroundColor"
        },
        columnBorder: false,
        foregroundColor: "#BBBEC9",
        headerBackgroundColor: "#111",
        headerFontWeight: 500,
        headerTextColor: "#FFFFFF",
        headerVerticalPaddingScale: 0.9,
        iconSize: 20,
        rowBorder: false,
        rowVerticalPaddingScale: 1.2,
        sidePanelBorder: false,
        spacing: 5,
        wrapperBorder: false,
        wrapperBorderRadius: 0
    }),
    tableLightTheme:createTheme({
        palette: {
            mode: 'light',
        },
        components: {
            MuiDataGrid: {
                defaultProps: {
                    rowHeight: 40,
                    headerHeight: 40,
                },
                styleOverrides: {
                    root: {
                        backgroundColor: "#fff",
                        border:0,
                        borderRadius:0,
                    },
                },
            },
        },
    }),
    tableDarkTheme:createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiDataGrid: {
                defaultProps: {
                    rowHeight: 40,
                    headerHeight: 40,
                },
                styleOverrides: {
                    root: {
                        backgroundColor: "#1b1f23",
                        border:0,
                        borderRadius:0,
                    },
                },
            },
        },
    }),
}

const tableSlice = createSlice({
    name:"table",
    initialState,
    reducers:{
        setAlert: (state,action) => {

        },
    },
  
})



export const {} = tableSlice.actions;
export default tableSlice.reducer;