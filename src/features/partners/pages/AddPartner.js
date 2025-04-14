import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../../component/card/Card';
import Form from '../../../component/form/Form';
import CardHeader from '../../../component/card/CardHeader';
import BackAndHeader from '../../../component/card/BackAndHeader';
import CardBody from '../../../component/card/CardBody';
import CardFooter from '../../../component/card/CardFooter';
import { Button, IconButton, Tab, Tabs } from '@mui/material';
import { setAlert } from '../../../store/slices/notificationSlice';
import { fetchPartners } from '../../../store/slices/partners/partnerSlice';
import axios from 'axios';
import TabPanel from '../../../component/tab/TabPanel';
import { setSelectedCity, setSelectedCountry } from '../../../store/slices/dataSlice';
import AddressTab from '../companies/AddressTab';
import InformationTab from '../companies/InformationTab';
import ContactTab from '../companies/ContactTab';
import SaveIcon from '@mui/icons-material/Save';

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
        dispatch(setSelectedCountry({iso2:null}))
        dispatch(setSelectedCity(null))
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
            dispatch(fetchPartners());
            setDisabled(false);
        };
    };

    return (
        <Card>
            <Form onSubmit={handleSubmit}>
                <CardHeader>
                    <BackAndHeader></BackAndHeader>
                </CardHeader>
                <CardBody addClass="ps-0 pe-0">
                    <Form>
                        <Tabs value={tabValue} onChange={handleChangeTabValue} aria-label="basic tabs example" className='border-bottom'>
                            <Tab label="Information" value={0}/>
                            <Tab label="Address" value={1}/>
                            <Tab label="Contact" value={2}/>
                        </Tabs>
                        <TabPanel value={tabValue} index={0}>
                            <InformationTab
                            valueName={data.name}
                            valueFormalName={data.formalName}
                            onChangeName={(value) => {setData(data => ({...data, name:value}));setButtonDisabled(false);}}
                            onChangeFormalName={(value) => {setData(data => ({...data, formalName:value}));setButtonDisabled(false);}}
                            disabled={disabled}
                            />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <AddressTab
                            valueCountry={data.country || 0}
                            valueAddress={data.address}
                            onChangeCountry={(value) => {setData(data => ({...data, country:value}));setButtonDisabled(false);}}
                            onChangeCity={(value) => {setData(data => ({...data, city:value}));setButtonDisabled(false);}}
                            onChangeAddress={(value) => {setData(data => ({...data, address:value}));setButtonDisabled(false);}}
                            disabled={disabled}
                            />
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <ContactTab
                            valueEmail={data.email}
                            onChangeEmail={(value) => {setData(data => ({...data, email:value}));setButtonDisabled(false);}}
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
