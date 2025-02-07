import { GridToolbar, GridToolbarQuickFilter } from '@mui/x-data-grid'
import React from 'react'

function Toolbar(props) {
  const {children} = props;
  
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem" }}>
        <GridToolbar />
        {children}
        <GridToolbarQuickFilter></GridToolbarQuickFilter>
    </div>
  )
}

export default Toolbar
