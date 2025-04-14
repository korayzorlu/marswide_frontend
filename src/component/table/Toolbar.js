import { Box } from '@mui/material';
import { GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid'
import React from 'react'
import { useSelector } from 'react-redux';

function Toolbar(props) {
  const {children} = props;

  const {dark} = useSelector((store) => store.auth);

  const buttonSlotProps = {
    button: {
      color: dark ? "primary" : "blackhole"
    }
  }
  
  return (
    // <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem" }}>
    //     <GridToolbar/>
    //     {children}
    //     <GridToolbarQuickFilter></GridToolbarQuickFilter>
    // </div>
    <GridToolbarContainer sx={{padding:"0.5rem"}}>
      <GridToolbarColumnsButton slotProps={buttonSlotProps}/>
      <GridToolbarFilterButton slotProps={buttonSlotProps}/>
      <GridToolbarDensitySelector slotProps={buttonSlotProps}/>
      <GridToolbarExport slotProps={buttonSlotProps}/>
      {children}
      <Box sx={{ flexGrow: 1 }} />
      
      <GridToolbarQuickFilter></GridToolbarQuickFilter>
    </GridToolbarContainer>
  )
}

export default Toolbar
