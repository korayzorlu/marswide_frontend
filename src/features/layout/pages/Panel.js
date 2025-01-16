import React from 'react'
import { useContext } from 'react';
import { Outlet } from 'react-router-dom'
import SidebarContext from '../../../context/sidebar';
import Navbar from '../../../component/navbar/Navbar';
import Sidenav from '../../../component/sidebar/Sidenav';

function Panel() {
  const {contentWidth} = useContext(SidebarContext);

  return (
    <>
      <Navbar></Navbar>
      <div className='row homeContent p-0 m-0 w-100'>

        <div className='col sidebarContent p-0 m-0 h-100' style={{"maxWidth":contentWidth.sidebar}}>
          <Sidenav></Sidenav>
        </div>

        <div className='col p-0 m-0 h-100 pageContent overflow-scroll' style={{"maxWidth":contentWidth.page}}>

          <div className="row p-2 m-0 g-0">
            <div className="col-md-12">

               <Outlet />

            </div>
          </div>
          
        </div>

      </div>
    </>
  )
}

export default Panel
