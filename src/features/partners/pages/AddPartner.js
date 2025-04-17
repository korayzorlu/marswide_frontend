import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../../component/card/Card';
import Form from '../../../component/form/Form';
import CardHeader from '../../../component/card/CardHeader';
import BackAndHeader from '../../../component/card/BackAndHeader';
import CardBody from '../../../component/card/CardBody';
import CardFooter from '../../../component/card/CardFooter';
import { Button, Tab, Tabs } from '@mui/material';
import { setAlert } from '../../../store/slices/notificationSlice';
import { fetchPartners } from '../../../store/slices/partners/partnerSlice';
import axios from 'axios';
import TabPanel from '../../../component/tab/TabPanel';
import { fetchCountries} from '../../../store/slices/dataSlice';
import AddressTab from '../companies/AddressTab';
import InformationTab from '../companies/InformationTab';
import ContactTab from '../companies/ContactTab';
import SaveIcon from '@mui/icons-material/Save';
import Grid from '@mui/material/Grid2';
import AndroidSwitch from '../../../component/switch/AndroidSwitch';

function AddPartner() {
    const {dark} = useSelector((store) => store.auth);
    const {activeCompany} = useSelector((store) => store.organization);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [data, setData] = useState(
        {   
            companyId: activeCompany.companyId,
            name: null,
            formalName: null
        }
    )

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch])
    

    const handleChangeTabValue = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        
        try {const response = await axios.post(`/partners/add_partner/`, 
                data,
                { withCredentials: true},
            );
            dispatch(setAlert({status:response.status,text:response.data.message}));
            navigate("/partners");
        } catch (error) {
            dispatch(setAlert({status:error.status,text:error.response.data.message}));
        } finally {
            //dispatch(fetchPartners({activeCompany}));
            setDisabled(false);
        };
    };

    const handleChangeField = (field,value) => {
        setData(data => ({...data, [field]:value}));
        setButtonDisabled(false);
    };

    return (
        <Card>
            <Form onSubmit={handleSubmit}>
                <CardHeader>
                    <BackAndHeader></BackAndHeader>
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
                            valueAddress={data.address}
                            valueAddress2={data.address2 || ""}
                            onChangeCountry={(value) => handleChangeField("country",value)}
                            onChangeCity={(value) => handleChangeField("city",{id:value})}
                            onChangeAddress={(value) => handleChangeField("address",value)}
                            onChangeAddress2={(value) => handleChangeField("address2",value)}
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
                            valuePhoneCountry={data.phoneCountry || 0}
                            valuePhoneNumber={data.phoneNumber}
                            onChangeEmail={(value) => handleChangeField("email",value)}
                            onChangePhoneCountry={(value) => handleChangeField("phoneCountry",value)}
                            onChangePhoneNumber={(value) => handleChangeField("phoneNumber",value)}
                            disabled={disabled}
                            />
                        </TabPanel>
                    </Form>
                    
                </CardBody>
                <CardFooter addClass="text-end">
                    <Button
                    type="submit"
                    variant='contained'
                    color={dark ? "mars" : "blackhole"}
                    startIcon={<SaveIcon />}
                    disabled={buttonDisabled}
                    >
                        Create
                    </Button>
                </CardFooter>
            </Form>
        </Card>
    )
}

export default AddPartner
