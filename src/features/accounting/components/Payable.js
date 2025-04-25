import React, { useEffect, useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayableAccounts, fetchReceivableAccounts, setPayableAccountsParams } from '../../../store/slices/accounting/accountSlice';
import { setAlert, setDeleteDialog, setImportDialog } from '../../../store/slices/notificationSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListTableServer from '../../../component/table/ListTableServer';
import CustomTableButton from '../../../component/table/CustomTableButton';
import { fetchImportProcess } from '../../../store/slices/processSlice';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

function Payable() {
    const {activeCompany} = useSelector((store) => store.organization);
    const {payableAccounts,payableAccountsCount,payableAccountsParams,payableAccountsLoading} = useSelector((store) => store.account);

    const dispatch = useDispatch();

    const [isPending, startTransition] = useTransition();

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        dispatch(fetchPayableAccounts({activeCompany,params:payableAccountsParams}))
    }, [activeCompany,payableAccountsParams,dispatch]);

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
        <ListTableServer
        rows={payableAccounts}
        columns={columns}
        getRowId={(row) => row.uuid}
        loading={payableAccountsLoading}
        customButtons={
            <>
                <CustomTableButton link="/accounts/add-account/payable" icon={<AddBoxIcon/>} children="NEW"/>
                <CustomTableButton
                onClick={() => dispatch(setDeleteDialog(true))}
                icon={<DeleteIcon/>}
                disabled={payableAccounts.length > 0 ? false : true}
                children="DELETE"
                />
                <CustomTableButton
                onClick={() => dispatch(fetchPayableAccounts({activeCompany,params:payableAccountsParams}))}
                icon={<RefreshIcon/>}
                children="RELOAD"
                />
            </>
        }
        onRowSelectionModelChange={(newRowSelectionModel) => {
            setSelectedItems(newRowSelectionModel);
        }}
        rowCount={payableAccountsCount}
        setParams={(value) => {dispatch(setPayableAccountsParams(value));console.log(value)}}
        checkboxSelection
        ></ListTableServer>
    )
}

export default Payable
