import React, { useState } from 'react'
import TableContent from './TableContent'
import { ThemeProvider } from '@emotion/react'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { useSelector } from 'react-redux';
import Toolbar from './Toolbar';

function ListTable(props) {
    const {rows,columns,loading,customButtons,hiddenColumns} = props;

    const {theme} = useSelector((store) => store.auth);
    const {tableLightTheme,tableDarkTheme} = useSelector((store) => store.table);

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
    });

  return (
    <TableContent>
            <DataGrid
            slots={{ toolbar: Toolbar}}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                    children: customButtons
                },
                }}
            columns={columns}
            rows={rows}
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
            checkboxSelection
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
