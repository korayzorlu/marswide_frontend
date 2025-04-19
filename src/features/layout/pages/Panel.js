import React from 'react'
import { useContext } from 'react';
import { Outlet } from 'react-router-dom'
import Navbar from '../../../component/navbar/Navbar';
import Sidenav from '../../../component/sidebar/Sidenav';
import Alert from '../../../component/alert/Alert';
import { useSelector } from 'react-redux';
//import Alert from '@mui/joy/Alert';
import UserDialog from '../../../component/dialog/UserDialog';

function Panel() {
  const {alert} = useSelector((store) => store.notification);
  const {contentWidth} = useSelector((store) => store.sidebar);

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
      {/* <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
        <Alert
            key="save"
            sx={{ alignItems: 'flex-start' }}
            startDecorator={alert.icon}
            variant="soft"
            color={alert.color}
            endDecorator={
              <IconButton variant="soft" color={alert.color}>
                <CloseRoundedIcon />
              </IconButton>
            }
          >
            <div>
              <div>Saved</div>
              <Typography level="body-sm" color={alert.color}>
                alert.text
              </Typography>
            </div>
          </Alert>
      </Box> */}
     
      <Alert></Alert>
      <UserDialog/>
    </>
  )
}

export default Panel
