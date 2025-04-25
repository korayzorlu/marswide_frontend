import React, { useState } from 'react'
import TableContent from './TableContent'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import Toolbar from './Toolbar';
import { Box, Typography } from '@mui/material';
import FolderOffIcon from '@mui/icons-material/FolderOff';
import { useDispatch } from 'react-redux';
import { setPartnersParams } from '../../store/slices/partners/partnerSlice';

function ListTableServer(props) {
  const {
    height,
    rows,
    columns,
    getRowId,
    loading,
    customButtons,
    hiddenColumns,
    checkboxSelection,
    disableRowSelectionOnClick,
    pageModel,
    onRowSelectionModelChange,
    rowCount,
    setParams,
    apiRef,
    hideFooter,
    noOverlay,
    density
  } = props;

  const dispatch = useDispatch();

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 50 })

  const handlePaginationModelChange = (model) => {
    setPaginationModel(model);
    //dispatch(setPartnersParams({start:model.page * model.pageSize,end:(model.page+1) * model.pageSize}));
    setParams({start:model.page * model.pageSize,end:(model.page+1) * model.pageSize})
  };

  const handleSortModelChange = (model) => {
    // dispatch(setPartnersParams(
    //   {
    //       ordering:model.length
    //       ?
    //           (
    //               model[0].sort === 'desc'
    //               ?
    //                   `-${model[0].field}`
    //               :
    //                   model[0].field
    //           )
    //       :
    //       ''
    //   }
    // ));
    setParams(
      {
        ordering:model.length
        ?
            (
                model[0].sort === 'desc'
                ?
                    `-${model[0].field}`
                :
                    model[0].field
            )
        :
        ''
      }
    );
  };

  const handleFilterModelChange = (model) => {
    if(model.items.length > 0){
        model.items.forEach((item) => {
            if (item.value) {
              //dispatch(setPartnersParams({[item.columnField]:item.value}));
              setParams({[item.columnField]:item.value});
            }
        });
    } else if(model.quickFilterValues.length > 0){
        model.quickFilterValues.forEach((item) => {
            //dispatch(setPartnersParams({"search[value]":item}));
            setParams({"search[value]":item});
        });
    } else if(model.items.length === 0 && model.quickFilterValues.length === 0){
        //dispatch(setPartnersParams({"search[value]":""}));
        setParams({"search[value]":""});
    };
  };

  const NoRowsOverlay = () => (
    <Box sx={{mt: 2,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%'}}>
      <FolderOffIcon sx={{fontSize:'64px',color:'text.secondary'}}></FolderOffIcon>
      <Typography variant='body2' sx={{color:'text.secondary'}}>
        No rows
      </Typography>
    </Box>
  );

  return (
    <TableContent height={height}>
      <DataGrid
      slots={{
        toolbar: Toolbar,
        noRowsOverlay: noOverlay ? undefined : NoRowsOverlay
      }}
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
      //onPaginationModelChange={(model) => setPaginationModel(model)}
      paginationMode="server"
      sortingMode="server"
      filterMode="server"
      onPaginationModelChange={(model) => handlePaginationModelChange(model)}
      onSortModelChange={(model) => handleSortModelChange(model)}
      onFilterModelChange={(model) => handleFilterModelChange(model)}
      rowCount={rowCount}
      loading={loading}
      checkboxSelection={checkboxSelection}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      onRowSelectionModelChange={onRowSelectionModelChange}
      apiRef={apiRef}
      hideFooter={hideFooter}
      autoHeight
      //getRowHeight={() => 'auto'}
      sx={{
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
            outline: 'none',
          },
          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
              outline: 'none',
          },
          '--DataGrid-overlayHeight': `${noOverlay ? "unset" : "50vh"}`,
      }}
      />
    </TableContent>
  )
}

export default ListTableServer
