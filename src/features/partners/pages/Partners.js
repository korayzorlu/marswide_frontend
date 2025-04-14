import axios from 'axios';
import React, { useEffect, useState, useTransition } from 'react'
import PanelContent from '../../../component/panel/PanelContent';
import ListTable from '../../../component/table/ListTable';
import CustomTableButton from '../../../component/table/CustomTableButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPartners, setPartnersLoading } from '../../../store/slices/partners/partnerSlice';
import { Link } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { setAlert, setDeleteDialog, setDialog, setImportDialog } from '../../../store/slices/notificationSlice';
import ImportDialog from '../../../component/feedback/ImportDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from '../../../component/feedback/DeleteDialog';
import { fetchImportProcess } from '../../../store/slices/processSlice';

function Partners() {
    const {activeCompany} = useSelector((store) => store.organization);
    const {partners,partnersLoading} = useSelector((store) => store.partner);

    const dispatch = useDispatch();

    const [isPending, startTransition] = useTransition();

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        startTransition(() => {
            dispatch(fetchPartners(activeCompany)).unwrap();
        });
    }, [activeCompany,dispatch]);

    const columns = [
        { field: 'name', headerName: 'Name', width: 400, editable: true, renderCell: (params) => (
            <Link
            to={`/partners/update/${encodeURIComponent(encodeURIComponent(params.value))}/`} 
            state={{uuid: params.row.uuid}}
            style={{textDecoration:"underline"}}
            >
                {params.value}
            </Link>
            
          )
        },
        { field: 'types', headerName: 'Type', flex: 1 },
        { field: 'country_name', headerName: 'Country', flex: 1 },
        { field: 'city_name', headerName: 'City', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 4 },
    ]

    return (
        <PanelContent>
            <ListTable
            rows={partners}
            columns={columns}
            getRowId={(row) => row.uuid}
            loading={partnersLoading}
            customButtons={
                <>
                    <CustomTableButton onClick={() => {dispatch(setImportDialog(true));dispatch(fetchImportProcess());}} icon={<UploadFileIcon/>} children="IMPORT"/>
                    <CustomTableButton link="/partners/add-partner" icon={<AddBoxIcon/>} children="NEW"/>
                    <CustomTableButton
                    onClick={() => dispatch(setDeleteDialog(true))}
                    icon={<DeleteIcon/>}
                    disabled={partners.length > 0 ? false : true}
                    children="DELETE"
                    />
                </>
            }
            onRowSelectionModelChange={(newRowSelectionModel) => {
                setSelectedItems(newRowSelectionModel);
            }}
            ></ListTable>
            <ImportDialog
            handleClose={() => dispatch(setImportDialog(false))}
            templateURL="/partners/partners_template"
            importURL="/partners/import_partners/"
            startEvent={() => dispatch(setPartnersLoading(true))}
            finalEvent={() => {dispatch(fetchPartners(activeCompany));dispatch(setPartnersLoading(false));}}
            >

            </ImportDialog>
            <DeleteDialog
            handleClose={() => dispatch(setDeleteDialog(false))}
            deleteURL="/partners/delete_partners/"
            selectedItems={selectedItems}
            startEvent={() => dispatch(setPartnersLoading(true))}
            finalEvent={() => {dispatch(fetchPartners(activeCompany));dispatch(setPartnersLoading(false));}}
            />
        </PanelContent>
    )
}

export default Partners
