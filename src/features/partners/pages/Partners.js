import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PanelContent from '../../../component/panel/PanelContent';
import ListTable from '../../../component/table/ListTable';
import CustomTableButton from '../../../component/table/CustomTableButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPartners } from '../../../store/slices/partners/partnerSlice';

function Partners() {
    const {activeCompany} = useSelector((store) => store.organization);
    const {partners,partnersLoading} = useSelector((store) => store.partner);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPartners(activeCompany)).unwrap();
    }, [activeCompany]);

    const columns = [
        { field: 'name', headerName: 'Name', width: 250},
        { field: 'formalName', headerName: 'Formal Name', flex: 1 },
    ]

    return (
        <PanelContent>
            <ListTable
            rows={partners}
            columns={columns}
            getRowId={(row) => row.id}
            loading={partnersLoading}
            ></ListTable>
        </PanelContent>
    )
}

export default Partners
