import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import TableContent from './TableContent';
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import Toolbar from './Toolbar';

function BasicTable(props) {
    const {rows,columns,loading,customButtons,hiddenColumns,checkboxSelection,disableRowSelectionOnClick} = props;

    const {theme} = useSelector((store) => store.auth);
    const {tableLightTheme,tableDarkTheme} = useSelector((store) => store.table);

    const [paginationModel, setPaginationModel] = useState({
        pageSize: 50,
        page: 0,
    });

    return (
        <TableContent height="auto">
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
            checkboxSelection={checkboxSelection}
            disableRowSelectionOnClick={disableRowSelectionOnClick}
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

export default BasicTable
