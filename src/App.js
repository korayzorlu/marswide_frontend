import './App.css';
import React, {useEffect, useContext, useState, useReducer, useMemo, useRef} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar/Navbar.js';
import Sidenav from './component/sidebar/Sidenav.js';
import Home from './component/Home.js';

import SidebarContext from './context/sidebar.js';

import AuthContext from './context/auth.js';
import Dashboard from './component/dashboard/Dashboard.js';

export const NumberContext = React.createContext();



function App() {

  //get user from api
  const {sourceCompanyId,fetchUser} = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
  },[]);
  //get user from api-end

  //sidebar collapse
  const {contentWidth,checkMobile,handleResize} = useContext(SidebarContext);
  
  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', handleResize);

    // Temizlik işlevi
    return () => {
      checkMobile();
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



  return (
    <div className="App" id='MichoApp'>

      <Navbar></Navbar>

      <div className='row homeContent p-0 m-0 w-100'>

        <div className='col sidebarContent p-0 m-0 h-100' style={{"maxWidth":contentWidth.sidebar}}>
          <Sidenav></Sidenav>
        </div>

        <div className='col p-0 m-0 h-100 pageContent overflow-scroll' style={{"maxWidth":contentWidth.page}}>

          <div className="row p-2 m-0">
            <div className="col-md-12">

              <Routes>
                <Route path='/' element={<Home></Home>}></Route>
             

                <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
               
               
              </Routes>


              {/* {loading ? (<Loading></Loading>) : (
                <>
                {courses.length === 0 ? (
                  <div className="row">
                    <div className="col-md-12">

                      <div className="row">
                        <div className="col-md-12 text-center">
                          <h2>All courses deleted!</h2>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 text-center">
                        <button className="btn btn-sm btn-primary" data-mdb-ripple-init onClick={() => {fetchCourses()}}>Refresh</button>
                        </div>
                      </div>

                    </div>
                  </div>
                  
                  
                  ) : (
                  <Courses courses={courses} removeCourse={deleteCourse}></Courses>
                  )
                }
                </>
              )
             }
               */}







              {/* <div className="row">
                <div className="col-md-12">
                  <TaskCreate></TaskCreate>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">

                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h1>Tasks</h1>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <TaskList></TaskList>
                    </div>
                  </div>
                  
                </div>
              </div> */}







            </div>
          </div>
          
        </div>

      </div>
          


      
 
      

      

    </div>
  );
}

export default App;
