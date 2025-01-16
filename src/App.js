import './App.css';
import React, {useEffect, useContext, useState, useReducer, useMemo, useRef} from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './features/layout/pages/Landing.js';
import Panel from './features/layout/pages/Panel.js';
import WrongPath from './features/layout/pages/WrongPath.js';
import Home from './features/layout/pages/Home.js';

import SidebarContext from './context/sidebar.js';
import LoadingContext from './context/loading/loading.js';

import AuthContext from './context/auth.js';
import Dashboard from './component/dashboard/Dashboard.js';
import axios from 'axios';
import Loading from './component/loading/Loading.js';
import Settings from './features/settings/pages/Settings.js';
import Profile from './features/auth/pages/Profile.js'
import Auth from './features/auth/pages/Auth.js';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';

export const NumberContext = React.createContext();

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  const {loading} = useContext(LoadingContext)
  
  //get user from api
  const {fetchTheme,fetchUser,user,dark,fetchCSRFToken,status} = useContext(AuthContext);

  useEffect(() => {
    fetchTheme();
  }, [dark]);
  
  useEffect(() => {
    fetchUser();
  },[]);

  useEffect(() => {
    fetchCSRFToken();
  }, []);

  const location = useLocation();
  console.log(location.pathname);
  //get user from api-end

  //sidebar collapse
  const {checkMobile,handleResize} = useContext(SidebarContext);
  
  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', handleResize);

    // Temizlik işlevi
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  //sidebar collapse-end


  //reducer
  
  const initialValue = 0;
  const reducer = (state,action) => {
    switch(action){
      case "increment" : 
        return state + 1;
      case "decrement" :
        return state - 1;
      case "reset" :
          return initialValue;
      default:
        return state;
    };
  };
  const [count, dispatch] = useReducer(reducer,initialValue);

  useEffect(() => {
    console.log("rendered");
  },[count]);
  //reducer-ends

  //hook

  //hook-end

  if (loading) return <Loading></Loading>;



  return (
    
    <div className="App" id='Marswide'>

      { user && status ? 

        <>
          <Routes>

            <Route exact path='/' element={<Panel></Panel>}>
              <Route index element={<Dashboard></Dashboard>}></Route>
              <Route path='profile/:username' element={<Profile></Profile>}></Route>
              <Route path='/settings' element={<Settings></Settings>}></Route>
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
