import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setAlert, setDialog } from '../../../store/slices/notificationSlice';
import Card from '../../../component/card/Card';
import CardHeader from '../../../component/card/CardHeader';
import BackAndHeader from '../../../component/card/BackAndHeader';
import { IconButton, Tab, Tabs } from '@mui/material';
import CardBody from '../../../component/card/CardBody';
import Form from '../../../component/form/Form';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '../../../component/feedback/Dialog';
import { fetchCountries } from '../../../store/slices/dataSlice';
import TabPanel from '../../../component/tab/TabPanel';
import AddressTab from '../companies/AddressTab';
import InformationTab from '../companies/InformationTab';
import ContactTab from '../companies/ContactTab';
import AndroidSwitch from '../../../component/switch/AndroidSwitch';
import Grid from '@mui/material/Grid2';

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
        try {
            await dispatch(fetchCountries()).unwrap();
            const response = await axios.get(`/partners/partners/?active_company=${activeCompany.id}&uuid=${uuid}`,
                {headers: {"X-Requested-With": "XMLHttpRequest"}}
            );
            
            if(response.data.length > 0){
                setData(response.data[0]);
            }else{
                navigate("/partners");
            };
        } catch (error) {
            dispatch(setAlert({status:error.status,text:error.response.data.message}));
        } finally {

        }
    };
    
    useEffect(() => {
        fetchData();
    }, [activeCompany])

    const handleChangeTabValue = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

    const handleSubmit = async () => {
        //event.preventDefault();
        setButtonDisabled(true);
        
        try {const response = await axios.post(`/partners/update_partner/`,
                data,
                { 
                    withCredentials: true
                },
            );
            dispatch(setAlert({status:response.status,text:response.data.message}));
        } catch (error) {
            dispatch(setAlert({status:error.status,text:error.response.data.message}));
        } finally {
            fetchData();
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
            dispatch(setAlert({status:response.status,text:response.data.message}));
        } catch (error) {
            dispatch(setAlert({status:error.status,text:error.response.data.message}));
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
        <Card>
            <CardHeader>
                <BackAndHeader>
                    <IconButton type="button" aria-label="save" color="opposite" onClick={() => handleSubmit()} className="me-3 p-0" disabled={buttonDisabled}><SaveIcon /></IconButton>
                    <IconButton type="button" aria-label="delete" color="error" onClick={() => dispatch(setDialog(true))} className="p-0"><DeleteIcon /></IconButton>
                </BackAndHeader>
            </CardHeader>
            <CardBody>
                    <Form>
                        <Grid
                        container
                        spacing={{xs:2,sm:0}}
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <Grid>
                                <Tabs value={tabValue} onChange={handleChangeTabValue} aria-label="basic tabs example">
                                    <Tab label="Information" value={0}/>
                                    <Tab label="Address" value={1}/>
                                    <Tab label="Contact" value={2}/>
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
                        <TabPanel value={tabValue} index={0}>
                            <InformationTab
                            valueName={data.name}
                            valueFormalName={data.formalName}
                            valueVatOffice={data.vatOffice}
                            valueVatNo={data.vatNo}
                            onChangeName={(value) => handleChangeField("name",value)}
                            onChangeFormalName={(value) => handleChangeField("formalName",value)}
                            onChangeVatOffice={(value) => handleChangeField("vatOffice",value)}
                            onChangeVatNo={(value) => handleChangeField("vatNo",value)}
                            disabled={disabled}
                            />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <AddressTab
                            valueCountry={data.country || 0}
                            valueCity={data.city || null}
                            valueAddress={data.address || ""}
                            valueAddress2={data.address2 || ""}
                            onChangeCountry={(value) => handleChangeField("country",value)}
                            onChangeCity={(value) => handleChangeField("city",{id:value})}
                            onChangeAddress={(value) => handleChangeField("address",value)}
                            onChangeAddress2={(value) => handleChangeField("address2",value)}
                            isBillingSame={data.isBillingSame}
                            onChangeIsBillingSame={(value) => handleChangeField("isBillingSame",value)}
                            valueBillingCountry={data.billingCountry || 0}
                            valueBillingCity={data.billingCity || null}
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
                            valueEmail={data.email}
                            valuePhoneCountry={data.phoneCountry || user.country || 0}
                            valuePhoneNumber={data.phoneNumber}
                            onChangeEmail={(value) => handleChangeField("email",value)}
                            onChangePhoneCountry={(value) => handleChangeField("phoneCountry",value)}
                            onChangePhoneNumber={(value) => handleChangeField("phoneNumber",value)}
                            disabled={disabled}
                            />
                        </TabPanel>
                    </Form>
                
            </CardBody>
            <Dialog
            title="Delete company"
            onClickText="Delete"
            onClickColor="error"
            dismissText="Cancel"
            onClick={handleDelete}
            >
                Are you sure you want to delete {data.name}? You cant't undo this action.
            </Dialog>
        </Card>
        
    )
}

export default UpdatePartner
