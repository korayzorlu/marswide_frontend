import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setAlert, setDialog } from '../../../store/slices/notificationSlice';
import { Divider, Paper, Stack, Tab, Tabs } from '@mui/material';
import Dialog from '../../../component/feedback/Dialog';
import { fetchCountries, fetchCurrencies } from '../../../store/slices/dataSlice';
import TabPanel from '../../../component/tab/TabPanel';
import AddressTab from '../companies/AddressTab';
import InformationTab from '../companies/InformationTab';
import ContactTab from '../companies/ContactTab';
import AndroidSwitch from '../../../component/switch/AndroidSwitch';
import Grid from '@mui/material/Grid2';
import { setIsProgress } from '../../../store/slices/processSlice';
import FormHeader from '../../../component/header/FormHeader';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

function UpdatePartner() {
    const {user} = useSelector((store) => store.auth);
    const {activeCompany,disabled} = useSelector((store) => store.organization);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    const { uuid } = useParams();

    const [data, setData] = useState({})

    const fetchData = async () => {
        dispatch(setIsProgress(true));
        try {
            await dispatch(fetchCountries()).unwrap();
            await dispatch(fetchCurrencies()).unwrap();
            const response = await axios.get(`/partners/partners/?active_company=${activeCompany.id}&uuid=${uuid}`,
                {headers: {"X-Requested-With": "XMLHttpRequest"}}
            );
            
            if(response.data.length > 0){
                setData(response.data[0]);
            }else{
                navigate("/partners");
            };
        } catch (error) {
            dispatch(setAlert({status:error.response.data.status,text:error.response.data.message}));
        } finally {
            dispatch(setIsProgress(false));
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [activeCompany])

    const handleChangeTabValue = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

    const handleSubmit = async () => {
        dispatch(setIsProgress(true));
        //event.preventDefault();
        setButtonDisabled(true);
        
        try {const response = await axios.post(`/partners/update_partner/`,
                data,
                { 
                    withCredentials: true
                },
            );
            dispatch(setAlert({status:response.data.status,text:response.data.message}))
        } catch (error) {
            dispatch(setAlert({status:error.response.data.status,text:error.response.data.message}))
        } finally {
            fetchData();
            dispatch(setIsProgress(false));
        };
    };

    const handleDelete = async () => {
        setButtonDisabled(true);

        try {const response = await axios.post(`/partners/delete_partner/`,
                data,
                { 
                    withCredentials: true
                },
            );
            dispatch(setAlert({status:response.data.status,text:response.data.message}))
        } catch (error) {
            dispatch(setAlert({status:error.response.data.status,text:error.response.data.message}))
        } finally {
            dispatch(setDialog(false));
            navigate("/partners");
        };
    };

    const handleChangeField = (field,value) => {
        setData(data => ({...data, [field]:value}));
        setButtonDisabled(false);
    };

    return (
        <Paper elevation={0} sx={{p:2}} square>
            <Stack spacing={2}>
                <FormHeader
                loadingSave={disabled}
                disabledSave={buttonDisabled}
                onClickSave={() => handleSubmit()}
                onClickDelete={() => dispatch(setDialog(true))}
                />
                <Divider></Divider>
                <Stack spacing={2}>
                    <Grid
                    container
                    spacing={{xs:2,sm:0}}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Grid>
                            <Tabs
                            value={tabValue}
                            variant='scrollable'
                            scrollButtons="auto"
                            onChange={handleChangeTabValue}
                            >
                                <Tab label="Information" value={0} icon={<InfoIcon/>} iconPosition="start"/>
                                <Tab label="Address" value={1} icon={<LocationOnIcon/>} iconPosition="start"/>
                                <Tab label="Contact" value={2} icon={<CallIcon/>} iconPosition="start"/>
                                <Tab label="Account" value={3} icon={<AccountBalanceIcon/>} iconPosition="start"/>
                            </Tabs>
                        </Grid>
                        <Grid>
                            <AndroidSwitch
                            label="Customer"
                            checked={data.customer}
                            onChange={(value) => handleChangeField("customer",value)}
                            />
                            <AndroidSwitch
                            label="Supplier"
                            checked={data.supplier}
                            onChange={(value) => handleChangeField("supplier",value)}
                            />
                        </Grid>
                    </Grid>
                    <Divider></Divider>
                    <TabPanel value={tabValue} index={0}>
                        <InformationTab
                        valueName={data.name || ""}
                        valueFormalName={data.formalName || ""}
                        valueVatOffice={data.vatOffice || ""}
                        valueVatNo={data.vatNo || ""}
                        valueAbout={data.about || ""}
                        onChangeName={(value) => handleChangeField("name",value)}
                        onChangeFormalName={(value) => handleChangeField("formalName",value)}
                        onChangeVatOffice={(value) => handleChangeField("vatOffice",value)}
                        onChangeVatNo={(value) => handleChangeField("vatNo",value)}
                        onChangeAbout={(value) => handleChangeField("about",value)}
                        disabled={disabled}
                        />
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <AddressTab
                        valueCountry={data.country || 0}
                        valueCity={data.city || 0}
                        valueAddress={data.address || ""}
                        valueAddress2={data.address2 || ""}
                        onChangeCountry={(value) => handleChangeField("country",value)}
                        onChangeCity={(value) => handleChangeField("city",{id:value})}
                        onChangeAddress={(value) => handleChangeField("address",value)}
                        onChangeAddress2={(value) => handleChangeField("address2",value)}
                        isBillingSame={data.isBillingSame}
                        onChangeIsBillingSame={(value) => handleChangeField("isBillingSame",value)}
                        valueBillingCountry={data.billingCountry || 0}
                        valueBillingCity={data.billingCity || 0}
                        valueBillingAddress={data.billingAddress || ""}
                        valueBillingAddress2={data.billingAddress2 || ""}
                        onChangeBillingCountry={(value) => handleChangeField("billingCountry",value)}
                        onChangeBillingCity={(value) => handleChangeField("billingCity",{id:value})}
                        onChangeBillingAddress={(value) => handleChangeField("billingAddress",value)}
                        onChangeBillingAddress2={(value) => handleChangeField("billingAddress2",value)}
                        disabled={disabled}
                        />
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        <ContactTab
                        valueEmail={data.email || ""}
                        valueWeb={data.web || ""}
                        valuePhoneCountry={data.phoneCountry || user.location.country || 0}
                        valuePhoneNumber={data.phoneNumber || ""}
                        onChangeEmail={(value) => handleChangeField("email",value)}
                        onChangeWeb={(value) => handleChangeField("web",value)}
                        onChangePhoneCountry={(value) => handleChangeField("phoneCountry",value)}
                        onChangePhoneNumber={(value) => handleChangeField("phoneNumber",value)}
                        valueCurrency={data.currency || user.location.currency || 0}
                        onChangeCurrency={(value) => handleChangeField("currency",value)}
                        disabled={disabled}
                        />
                    </TabPanel>
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

export default UpdatePartner
