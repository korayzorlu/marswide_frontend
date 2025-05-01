import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBankAccounts } from '../../../../store/slices/accounting/accountSlice';
import { Link } from 'react-router-dom';

function Bank() {
    const {activeCompany} = useSelector((store) => store.organization);
    const {bankAccounts,bankAccountsCount,bankAccountsParams,bankAccountsLoading} = useSelector((store) => store.account);

    const dispatch = useDispatch();

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        dispatch(fetchBankAccounts({activeCompany,params:bankAccountsParams}))
    }, [activeCompany,bankAccountsParams,dispatch]);

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
        <div>
        
        </div>
    )
}

export default Bank
