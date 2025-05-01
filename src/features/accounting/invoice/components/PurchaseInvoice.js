import React, { useEffect, useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPurchaseInvoices, fetchSaleInvoices, setSaleInvoicesLoading, setSaleInvoicesParams } from '../../../../store/slices/accounting/invoiceSlice';
import { setAlert, setDeleteDialog, setImportDialog } from '../../../../store/slices/notificationSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListTableServer from '../../../../component/table/ListTableServer';
import CustomTableButton from '../../../../component/table/CustomTableButton';
import ImportDialog from '../../../../component/feedback/ImportDialog';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteDialog from '../../../../component/feedback/DeleteDialog';

function PurchaseInvoice() {
    const {activeCompany} = useSelector((store) => store.organization);
    const {purchaseInvoices,purchaseInvoicesCount,purchaseInvoicesParams,purchaseInvoicesLoading} = useSelector((store) => store.invoice);

    const dispatch = useDispatch();

    const [isPending, startTransition] = useTransition();

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        dispatch(fetchPurchaseInvoices({activeCompany,params:purchaseInvoicesParams}))
    }, [activeCompany,purchaseInvoicesParams,dispatch]);

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
        { field: 'partner', headerName: 'Supplier', flex: 15, editable: true, renderCell: (params) => (
                <Link
                to={`/invoices/update/${params.row.type}/${params.row.uuid}/`}
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
            rows={purchaseInvoices}
            columns={columns}
            getRowId={(row) => row.uuid}
            loading={purchaseInvoicesLoading}
            customButtons={
                <>
                    <CustomTableButton link="/invoices/add-invoice/purchase" icon={<AddBoxIcon/>} children="NEW"/>
                    <CustomTableButton
                    onClick={() => dispatch(setDeleteDialog(true))}
                    icon={<DeleteIcon/>}
                    disabled={purchaseInvoices.length > 0 ? false : true}
                    children="DELETE"
                    />
                    <CustomTableButton
                    onClick={() => dispatch(fetchSaleInvoices({activeCompany,params:purchaseInvoicesParams}))}
                    icon={<RefreshIcon/>}
                    children="RELOAD"
                    />
                </>
            }
            onRowSelectionModelChange={(newRowSelectionModel) => {
                setSelectedItems(newRowSelectionModel);
            }}
            rowCount={purchaseInvoicesCount}
            setParams={(value) => {dispatch(setSaleInvoicesParams(value));console.log(value)}}
            checkboxSelection
            ></ListTableServer>
            <ImportDialog
            handleClose={() => dispatch(setImportDialog(false))}
            templateURL="/accounting/accounts_template"
            importURL="/accounting/import_accounts/"
            startEvent={() => dispatch(setSaleInvoicesLoading(true))}
            finalEvent={() => {dispatch(fetchSaleInvoices({activeCompany}));dispatch(setSaleInvoicesLoading(false));}}
            >

            </ImportDialog>
            <DeleteDialog
            handleClose={() => dispatch(setDeleteDialog(false))}
            deleteURL="/accounting/delete_account/"
            selectedItems={selectedItems}
            startEvent={() => dispatch(setSaleInvoicesLoading(true))}
            finalEvent={() => {dispatch(fetchSaleInvoices({activeCompany}));dispatch(setSaleInvoicesLoading(false));}}
            />
        </>
    )
}

export default PurchaseInvoice
