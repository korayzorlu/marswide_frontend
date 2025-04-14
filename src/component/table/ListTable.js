import React, { useState } from 'react'
import TableContent from './TableContent'
import { ThemeProvider } from '@emotion/react'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { useSelector } from 'react-redux';
import Toolbar from './Toolbar';

function ListTable(props) {
    const {
      rows,
      columns,
      getRowId,
      loading,
      customButtons,
      hiddenColumns,
      checkboxSelection,
      disableRowSelectionOnClick,
      pageModel,
      onRowSelectionModelChange
    } = props;

    const [paginationModel, setPaginationModel] = useState(
      {
        pageSize: 50,
        page: 0,
      }
    );

  return (
    <TableContent>
      <DataGrid
      slots={{ toolbar: Toolbar}}
      slotProps={{
          toolbar: {
              showQuickFilter: true,
              children: customButtons
          },
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'linear-progress',
          },
        }}
      columns={columns}
      rows={rows}
      getRowId={getRowId || ((row) => row.uuid)}
      initialState={{
          columns: {
            columnVisibilityModel: hiddenColumns,
          },
        }}
      pageSizeOptions={[25, 50, 100]}
      pagination
      paginationModel={paginationModel}
      onPaginationModelChange={(model) => setPaginationModel(model)}
      loading={loading}
      checkboxSelection={checkboxSelection || true}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      onRowSelectionModelChange={onRowSelectionModelChange}
      autoHeight
      sx={{
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
            outline: 'none',
          },
          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
            {
              outline: 'none',
            },
      }}
      />
    </TableContent>
  )
}

export default ListTable
