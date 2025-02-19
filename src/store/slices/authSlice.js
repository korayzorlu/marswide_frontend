import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
    user:null,
    status:false,
    csrfToken:"",
    wrongPath:false,
    dark:false,
    theme:Cookies.get("theme") ? Cookies.get("theme") : "light",
    logo:require(`../../images/logo/light/marswide-logo-full.png`),
    loading:true,
    authMessage:{color:"",icon:"",text:""},
}

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
    const sessionResponse = await axios.get(`/users/session/`, {withCredentials: true});
    if(sessionResponse.data.authenticated){
        const response = await axios.get(`/users/api/users/type_current/`, {withCredentials: true});
        return response.data[0];
    };
    
    throw new Error('Session not authenticated');
});

export const fetchCSRFToken = createAsyncThunk('auth/fetchCSRFToken', async () => {
    const response = await axios.get(`/users/csrf_token_get/`, {withCredentials: true});
    return response.data.csrfToken;
});



export const changeTheme = createAsyncThunk('auth/changeTheme', async (darkTerm, {getState}) => {
    const { user } = getState().auth;
    try {
        await axios.put(`/users/api/user_profiles/${user["profile"]}/`, 
            {
                pk : user["profile"],
                theme : darkTerm ? "dark" : "light"
            },
            {withCredentials: true},
        );
        return darkTerm;
    } catch {
        return darkTerm;
    }
});

export const loginAuth = createAsyncThunk('auth/loginAuth', async ({email, password, remember},{ rejectWithValue }) => {
    try {
        const response = await axios.post('/users/login/', { 
            email:email,
            password:password,
            remember:remember
        },{ withCredentials: true, });
        return response.data;
    } catch (error) {
        return rejectWithValue({
            status:error.status,
            message:error.response.data.message
        });
    };
});

export const logoutAuth = createAsyncThunk('auth/logoutAuth', async () => {
    const response = await axios.post('/users/logout/', { withCredentials: true});
    return response.data;
});

export const registerAuth = createAsyncThunk('auth/registerAuth', async (form,{rejectWithValue}) => {
    try {
        const response = await axios.post('/users/register/', { 
            email:form.email,
            password:form.password,
            passwordConfirmation:form.passwordConfirmation,
            firstName:form.firstName,
            lastName:form.lastName,
            refCode:form.refCode
        },{ withCredentials: true, });
        return response.data;
    } catch (error) {
        return rejectWithValue({
            status:error.status,
            message:error.response.data.message
        });
    };
});

export const forgotPasswordAuth = createAsyncThunk('auth/forgotPasswordAuth', async (email,{rejectWithValue}) => {
    try {
        const response = await axios.post('/users/password_reset/', { 
            email:email
        },{ withCredentials: true, });
        return response.data;
    } catch (error) {
        return rejectWithValue({
            status:error.status,
            message:error.response.data.message
        });
    };
});

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLoading: (state,action) => {
            state.loading = action.payload;
        },
        setCSRFToken: (state,action) => {
            state.csrfToken = action.payload;
        },
        fetchTheme: (state,action) => {
            document.documentElement.setAttribute("data-mdb-theme", action.payload);
            state.theme = action.payload;
            state.logo = require(`../../images/logo/${action.payload}/marswide-logo-full.png`);
            document.cookie = `theme=${action.payload}; path=/; ${process.env.REACT_APP_SAME_SITE}`;

        },
        setAuthMessage: (state,action) => {
            state.authMessage = action.payload;
        },
        clearAuthMessage: (state,action) => {
            state.authMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
            //fetch user
            .addCase(fetchUser.pending, (state) => {
                //state.loading = true
            })
            .addCase(fetchUser.fulfilled, (state,action) => {
                state.user = action.payload;
                state.status = true;
                state.dark = action.payload["theme"] === "light" ? false : true;
                state.theme = action.payload["theme"];
                document.cookie = `theme=${action.payload["theme"]}; path=/; ${process.env.REACT_APP_SAME_SITE || "Lax"}`;
            })
            .addCase(fetchUser.rejected, (state,action) => {
                state.status = false;
            })

            //fetch csrftoken
            .addCase(fetchCSRFToken.fulfilled, (state,action) => {
                state.csrfToken = action.payload;
                axios.defaults.headers['X-CSRFToken'] = action.payload;
                axios.defaults.withCredentials = true
            })
            
            //change theme
            .addCase(changeTheme.fulfilled, (state,action) => {
                state.dark = action.payload;
                state.theme = action.payload ? "dark" : "light";
                state.logo = action.payload
                    ? require(`../../images/logo/dark/marswide-logo-full.png`)
                    : require(`../../images/logo/light/marswide-logo-full.png`)
                document.cookie = action.payload
                    ? `theme=dark; path=/; ${process.env.REACT_APP_SAME_SITE}`
                    : `theme=light; path=/; ${process.env.REACT_APP_SAME_SITE}`
            })

            //login
            .addCase(loginAuth.pending, (state) => {

            })
            .addCase(loginAuth.fulfilled, (state,action) => {
                state.user = action.payload.user;
                state.status = true;
                state.theme = action.payload.user.theme;
                state.dark = action.payload.user.theme === "dark" ? true : false;
                localStorage.setItem("login", Date.now());
            })
            .addCase(loginAuth.rejected, (state,action) => {
                state.status = false;
                state.authMessage = action.payload.status === 401
                    ? {color:"text-red-500",icon:"",text:action.payload.message}
                    : {color:"text-red-500",icon:"fas fa-triangle-exclamation",text:"Sorry, something went wrong!"}
            })

            //logout
            .addCase(logoutAuth.pending, (state) => {

            })
            .addCase(logoutAuth.fulfilled, (state,action) => {
                state.user = null;
                state.status = false;
                localStorage.setItem("logout", Date.now());
            })
            .addCase(logoutAuth.rejected, (state,action) => {
                state.authMessage = {color:"",icon:"",text:""};
            })

            //register
            .addCase(registerAuth.pending, (state) => {

            })
            .addCase(registerAuth.fulfilled, (state,action) => {
                state.user = action.payload.user;
                state.status = true;
            })
            .addCase(registerAuth.rejected, (state,action) => {

                state.authMessage = action.payload.status === 400
                    ? {color:"text-red-500",icon:"",text:action.payload.message}
                    : {color:"text-red-500",icon:"fas fa-triangle-exclamation",text:"Sorry, something went wrong!"}
            })

            //forgot password
            .addCase(forgotPasswordAuth.pending, (state) => {

            })
            .addCase(forgotPasswordAuth.fulfilled, (state,action) => {

            })
            .addCase(forgotPasswordAuth.rejected, (state,action) => {
                state.authMessage = action.payload.status === 400
                    ? {color:"text-red-500",icon:"",text:action.payload.message}
                    : {color:"text-red-500",icon:"fas fa-triangle-exclamation",text:"Sorry, something went wrong!"}
            })
                
    }
})


export const {setLoading,setCSRFToken,fetchTheme,setAuthMessage,clearAuthMessage} = authSlice.actions;
export default authSlice.reducer;