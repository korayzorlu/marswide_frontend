import './App.css';
import React, {useEffect, useContext, useState, useReducer, useMemo, useRef} from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Landing from './features/layout/pages/Landing.js';
import Panel from './features/layout/pages/Panel.js';
import WrongPath from './features/layout/pages/WrongPath.js';
import Home from './features/layout/pages/Home.js';

import Dashboard from './component/dashboard/Dashboard.js';
import axios from 'axios';
import Loading from './component/loading/Loading.js';
import Settings from './features/settings/pages/Settings.js';
import Profile from './features/auth/pages/Profile.js'
import Auth from './features/auth/pages/Auth.js';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Company from './features/card/company/pages/Companies.js';
import Data from './features/card/data/pages/Data.js';
import PasswordReset from './features/settings/auth/pages/PasswordReset.js';
import AuthSettingsLinks from './features/settings/auth/pages/AuthSettingsLinks.js';
import PersonalSettings from './features/settings/auth/pages/PersonalSettings.js';
import EmailSettings from './features/settings/auth/pages/EmailSettings.js';
import ForgotPassword from './features/auth/pages/ForgotPassword.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, fetchTheme, fetchCSRFToken } from './store/slices/authSlice.js';
import { checkMobile, setResize } from './store/slices/sidebarSlice.js';

export const NumberContext = React.createContext();

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  const {user,status,theme,dark,loading} = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  
  //get user from api


  useEffect(() => {
    //fetchTheme();
    dispatch(fetchTheme(theme));
  }, [dark]);
  
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCSRFToken());
  },[dispatch]);

  useEffect(() => {
    //fetchUser();
    //fetchCSRFToken();
  },[]);



  //get user from api-end

  //sidebar collapse
  
  useEffect(() => {
    const handleResize = () => {
      dispatch(setResize());
    };

    dispatch(checkMobile());
    window.addEventListener('resize', handleResize);

    // Temizlik işlevi
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  //sidebar collapse-end


  //reducer
  
  // const initialValue = 0;
  // const reducer = (state,action) => {
  //   switch(action){
  //     case "increment" : 
  //       return state + 1;
  //     case "decrement" :
  //       return state - 1;
  //     case "reset" :
  //         return initialValue;
  //     default:
  //       return state;
  //   };
  // };
  // const [count, dispatch] = useReducer(reducer,initialValue);

  // useEffect(() => {
  //   console.log("rendered");
  // },[count]);
  //reducer-ends

  //hook

  //hook-end
  console.log(user);
  if (loading) return <Loading></Loading>;

  return (
    
    <div className="App" id='Marswide'>

      { user && status ? 

        <>
          <Routes>

            <Route exact path='/' element={<Panel></Panel>}>
              <Route index element={<Dashboard></Dashboard>}></Route>
              <Route path='profile/:username' element={<Profile></Profile>}></Route>
              <Route path='settings' element={<Settings></Settings>}>
                <Route path='auth' element={<AuthSettingsLinks></AuthSettingsLinks>}></Route>
                <Route path='auth/personal' element={<PersonalSettings></PersonalSettings>}></Route>
                <Route path='auth/email' element={<EmailSettings></EmailSettings>}></Route>
                <Route path='auth/password-reset' element={<PasswordReset></PasswordReset>}></Route>
              </Route>
              <Route path='/companies' element={<Company></Company>}></Route>
              <Route path='/data' element={<Data></Data>}></Route>

              <Route path='auth' element={<Dashboard></Dashboard>}>
                <Route path='login'></Route>
                <Route path='register'></Route>
              </Route>
            </Route>

            <Route path='*' element={<WrongPath></WrongPath>}></Route>

          </Routes>
        </>

        :
        
        <>
          <Routes>

            <Route path='/' element={<Landing></Landing>}>
              <Route index element={<Home></Home>}></Route>
              <Route path='auth' element={<Auth></Auth>}>
                <Route path='login' element={<Login></Login>}></Route>
                <Route path='register' element={<Register></Register>}></Route>
                <Route path='forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
              </Route>
            </Route>

            <Route path='*' element={<WrongPath></WrongPath>}></Route>

          </Routes>
        </>
      }

    </div>
  );
}

export default App;
