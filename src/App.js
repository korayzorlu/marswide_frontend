import './App.css';
import React, {useEffect, useContext, useState, useReducer, useMemo, useRef} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar/Navbar.js';
import NavbarLanding from './component/navbar/NavbarLanding.js';
import Sidenav from './component/sidebar/Sidenav.js';
import Home from './component/Home.js';
import Landing from './component/landing/Landing.js';
import Login from './component/auth/Login.js';

import SidebarContext from './context/sidebar.js';
import LoadingContext from './context/loading/loading.js';

import AuthContext from './context/auth.js';
import Dashboard from './component/dashboard/Dashboard.js';
import axios from 'axios';
import Loading from './component/loading/Loading.js';

export const NumberContext = React.createContext();

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  const {loading,handleLoading} = useContext(LoadingContext)
  
  //get user from api
  const {fetchTheme,fetchUser,user,theme,dark,fetchCSRFToken,status} = useContext(AuthContext);

  useEffect(() => {
    fetchTheme();
  }, [dark]);
  
  useEffect(() => {
    fetchUser();
  },[]);

  useEffect(() => {
    fetchCSRFToken();
  }, []);

  
  
  //get user from api-end

  //sidebar collapse
  const {contentWidth,checkMobile,handleResize} = useContext(SidebarContext);
  
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
    <div className="App" id='MichoApp'>

      

      { user && status ? 

        <>
          <Navbar></Navbar>
          <div className='row homeContent p-0 m-0 w-100'>

            <div className='col sidebarContent p-0 m-0 h-100' style={{"maxWidth":contentWidth.sidebar}}>
              <Sidenav></Sidenav>
            </div>

            <div className='col p-0 m-0 h-100 pageContent overflow-scroll' style={{"maxWidth":contentWidth.page}}>

              <div className="row p-2 m-0">
                <div className="col-md-12">
                  {user["username"]}
                  <Routes>
                    <Route path='/' element={<Home></Home>}></Route>
                    <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
                  </Routes>

                </div>
              </div>
              
            </div>

          </div>
        </>

        :
        
        <>
          <NavbarLanding></NavbarLanding>

          <div className='row homeContent p-0 m-0 w-100'>
            <div className='col p-0 m-0 h-100 pageContent overflow-scroll'>
              <div className="row p-2 m-0">
                <div className="col-md-12">

                  <Routes>
                    <Route path='/' element={<Landing></Landing>}></Route>
                    
                    <Route path='/login' element={<Login></Login>}></Route>
                  </Routes>

                </div>
              </div>
            </div>
          </div>
        </>
      }

      
          


      
 
      

      

    </div>
  );
}

export default App;
