import React, { useCallback, useEffect, useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayableAccounts, fetchReceivableAccounts, setReceivableAccountsLoading, setReceivableAccountsParams } from '../../../store/slices/accounting/accountSlice';
import ListTableServer from '../../../component/table/ListTableServer';
import CustomTableButton from '../../../component/table/CustomTableButton';
import { setAlert, setDeleteDialog, setImportDialog } from '../../../store/slices/notificationSlice';
import { fetchImportProcess } from '../../../store/slices/processSlice';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setPartnersParams } from '../../../store/slices/partners/partnerSlice';
import ImportDialog from '../../../component/feedback/ImportDialog';
import DeleteDialog from '../../../component/feedback/DeleteDialog';
import RefreshIcon from '@mui/icons-material/Refresh';

function Receivable(props) {
    const {activeCompany} = useSelector((store) => store.organization);
    const {receivableAccounts,receivableAccountsCount,receivableAccountsParams,receivableAccountsLoading} = useSelector((store) => store.account);

    const dispatch = useDispatch();

    const [isPending, startTransition] = useTransition();

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        dispatch(fetchReceivableAccounts({activeCompany,params:receivableAccountsParams}))
    }, [activeCompany,receivableAccountsParams,dispatch]);

    const handleAllDelete = async () => {
        dispatch(setAlert({status:"info",text:"Removing items.."}));

        try {

            const response = await axios.post(`/partners/delete_all_partners/`,
                { withCredentials: true},
            );
        } catch (error) {
            dispatch(setAlert({status:error.response.data.status,text:error.response.data.message}));
        };
    };

    const columns = [
        { field: 'partner', headerName: 'Partner', flex: 15, editable: true, renderCell: (params) => (
                <Link
                to={`/accounts/update/${params.row.type}/${params.row.uuid}/`}
                style={{textDecoration:"underline"}}
                >
                    {params.row.partner.name}
                </Link>
                
            )
        },
        { field: 'type', headerName: 'Type', flex: 2 },
        { field: 'balance', headerName: 'Balance', flex: 2, type: 'number' },
        { field: 'currency', headerName: 'Currency', flex: 1 },
    ]

    return (
        <>
            <ListTableServer
            rows={receivableAccounts}
            columns={columns}
            getRowId={(row) => row.uuid}
            loading={receivableAccountsLoading}
            customButtons={
                <>
                    <CustomTableButton link="/accounts/add-account/receivable" icon={<AddBoxIcon/>} children="NEW"/>
                    <CustomTableButton
                    onClick={() => dispatch(setDeleteDialog(true))}
                    icon={<DeleteIcon/>}
                    disabled={receivableAccounts.length > 0 ? false : true}
                    children="DELETE"
                    />
                    <CustomTableButton
                    onClick={() => dispatch(fetchReceivableAccounts({activeCompany,params:receivableAccountsParams}))}
                    icon={<RefreshIcon/>}
                    children="RELOAD"
                    />
                </>
            }
            onRowSelectionModelChange={(newRowSelectionModel) => {
                setSelectedItems(newRowSelectionModel);
            }}
            rowCount={receivableAccountsCount}
            setParams={(value) => {dispatch(setReceivableAccountsParams(value));console.log(value)}}
            checkboxSelection
            ></ListTableServer>
            <ImportDialog
            handleClose={() => dispatch(setImportDialog(false))}
            templateURL="/accounting/accounts_template"
            importURL="/accounting/import_accounts/"
            startEvent={() => dispatch(setReceivableAccountsLoading(true))}
            finalEvent={() => {dispatch(fetchReceivableAccounts({activeCompany}));dispatch(setReceivableAccountsLoading(false));}}
            >

            </ImportDialog>
            <DeleteDialog
            handleClose={() => dispatch(setDeleteDialog(false))}
            deleteURL="/accounting/delete_account/"
            selectedItems={selectedItems}
            startEvent={() => dispatch(setReceivableAccountsLoading(true))}
            finalEvent={() => {dispatch(fetchReceivableAccounts({activeCompany}));dispatch(setReceivableAccountsLoading(false));}}
            />
        </>
        
    )
}

export default Receivable
