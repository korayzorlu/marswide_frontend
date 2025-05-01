import React, { useEffect, useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setDeleteDialog, setImportDialog } from '../../../../store/slices/notificationSlice';
import { fetchincomingPayments, setIncomingPaymentsLoading, setIncomingPaymentsParams } from '../../../../store/slices/accounting/paymentSlice';
import { Link } from 'react-router-dom';
import ListTableServer from '../../../../component/table/ListTableServer';
import CustomTableButton from '../../../../component/table/CustomTableButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ImportDialog from '../../../../component/feedback/ImportDialog';
import DeleteDialog from '../../../../component/feedback/DeleteDialog';

function IncomingPayments() {
    const {activeCompany} = useSelector((store) => store.organization);
    const {incomingPayments,incomingPaymentsCount,incomingPaymentsParams,incomingPaymentsLoading} = useSelector((store) => store.payment);

    const dispatch = useDispatch();

    const [isPending, startTransition] = useTransition();

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        dispatch(fetchincomingPayments({activeCompany,params:incomingPaymentsParams}))
    }, [activeCompany,incomingPaymentsParams,dispatch]);

    const columns = [
        { field: 'partner', headerName: 'Customer', flex: 15, editable: true, renderCell: (params) => (
                <Link
                to={`/payments/update/${params.row.type}/${params.row.uuid}/`}
                style={{textDecoration:"underline"}}
                >
                    {params.row.partner.name}
                </Link>
                
            )
        },
        { field: 'type', headerName: 'Type', flex: 2 },
        { field: 'amount', headerName: 'Amount', flex: 2, type: 'number' },
        { field: 'currency', headerName: 'Currency', flex: 1 },
    ]

  return (
        <>
            <ListTableServer
            rows={incomingPayments}
            columns={columns}
            getRowId={(row) => row.uuid}
            loading={incomingPaymentsLoading}
            customButtons={
                <>
                    <CustomTableButton link="/payments/add-payment/incoming" icon={<AddBoxIcon/>} children="NEW"/>
                    <CustomTableButton
                    onClick={() => dispatch(setDeleteDialog(true))}
                    icon={<DeleteIcon/>}
                    disabled={incomingPayments.length > 0 ? false : true}
                    children="DELETE"
                    />
                    <CustomTableButton
                    onClick={() => dispatch(fetchincomingPayments({activeCompany,params:incomingPaymentsParams}))}
                    icon={<RefreshIcon/>}
                    children="RELOAD"
                    />
                </>
            }
            onRowSelectionModelChange={(newRowSelectionModel) => {
                setSelectedItems(newRowSelectionModel);
            }}
            rowCount={incomingPaymentsCount}
            setParams={(value) => {dispatch(setIncomingPaymentsParams(value));console.log(value)}}
            checkboxSelection
            ></ListTableServer>
            <ImportDialog
            handleClose={() => dispatch(setImportDialog(false))}
            templateURL="/accounting/accounts_template"
            importURL="/accounting/import_payments/"
            startEvent={() => dispatch(setIncomingPaymentsLoading(true))}
            finalEvent={() => {dispatch(fetchincomingPayments({activeCompany}));dispatch(setIncomingPaymentsLoading(false));}}
            >

            </ImportDialog>
            <DeleteDialog
            handleClose={() => dispatch(setDeleteDialog(false))}
            deleteURL="/accounting/delete_payment/"
            selectedItems={selectedItems}
            startEvent={() => dispatch(setIncomingPaymentsLoading(true))}
            finalEvent={() => {dispatch(fetchincomingPayments({activeCompany}));dispatch(setIncomingPaymentsLoading(false));}}
            />
        </>
    )
}

export default IncomingPayments
