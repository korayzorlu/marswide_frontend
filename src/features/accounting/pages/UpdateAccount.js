import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setIsProgress } from '../../../store/slices/processSlice';
import { fetchCurrencies } from '../../../store/slices/dataSlice';
import axios from 'axios';
import { setAlert, setDialog } from '../../../store/slices/notificationSlice';
import { Divider, Paper, Stack } from '@mui/material';
import FormHeader from '../../../component/header/FormHeader';
import { capitalize, toUpper } from 'lodash';
import Grid from '@mui/material/Grid2';
import PartnerSelect from '../../../component/select/PartnerSelect';
import CurrencySelect from '../../../component/select/CurrencySelect';
import Dialog from '../../../component/feedback/Dialog';
import { deleteAccount, fetchAccount, updateAccount } from '../../../store/slices/accounting/accountSlice';

function UpdateAccount() {
    const {user,dark} = useSelector((store) => store.auth);
    const {activeCompany,disabled} = useSelector((store) => store.organization);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const { type,uuid } = useParams();

    const [data, setData] = useState({});
   
    const fetchData = async () => {
        await dispatch(fetchCurrencies()).unwrap();
        const response = await dispatch(fetchAccount({activeCompany,params:{uuid}})).unwrap();
        setData(response);
    };
    
    useEffect(() => {
        fetchData();
    }, [activeCompany])

    const handleSubmit = async () => {
        setButtonDisabled(true);
        dispatch(updateAccount({data}))
    };

    const handleDelete = async () => {
        setButtonDisabled(true);

        dispatch(deleteAccount({data}));
    };

    const handleChangeField = (field,value) => {
        setData(data => ({...data, [field]:value}));
        setButtonDisabled(false);
    };

    return (
        <Paper elevation={0} sx={{p:2}} square>
            <Stack spacing={2}>
                <FormHeader
                title={`ACCOUNTS ${toUpper(type)} (${type === "receivable" ? "AR" : "AP"})`}
                loadingSave={disabled}
                disabledSave={buttonDisabled}
                onClickSave={() => handleSubmit()}
                onClickDelete={() => dispatch(setDialog(true))}
                />
                <Divider></Divider>
                <Stack spacing={2}>
                    <Grid container spacing={2}>
                        <Grid size={{xs:12,sm:10}}>
                            <PartnerSelect
                            label="Partner"
                            emptyValue={true}
                            value={data.partner || null}
                            types={type === "receivable" ? `{customer}` : `{supplier}`}
                            onChange={(value) => {console.log(data.partner);handleChangeField("partner",value)}}
                            />
                        </Grid>
                        <Grid size={{xs:12,sm:2}}>
                            <CurrencySelect
                            label="Currency"
                            emptyValue={true}
                            value={data.currency || user.location.currency || null}
                            onChange={(value) => handleChangeField("currency",value)}
                            />
                        </Grid>
                    </Grid>
                </Stack>
            </Stack>
            <Dialog
            title="Delete company"
            onClickText="Delete"
            onClickColor="error"
            dismissText="Cancel"
            onClick={handleDelete}
            >
                Are you sure you want to delete {data.name}? You cant't undo this action.
            </Dialog>
        </Paper>
    )
}

export default UpdateAccount
