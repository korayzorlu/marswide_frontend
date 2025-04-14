import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { fetchCountries, setSelectedCity, setSelectedCountry } from '../../../store/slices/dataSlice';
import TabPanel from '../../../component/tab/TabPanel';
import AddressTab from '../companies/AddressTab';
import InformationTab from '../companies/InformationTab';
import ContactTab from '../companies/ContactTab';

function UpdatePartner() {
    const {activeCompany,disabled} = useSelector((store) => store.organization);
    const {countries} = useSelector((store) => store.data);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    const {uuid} = location.state || {};

    const [data, setData] = useState({})

    const fetchData = async () => {
        try {
            await dispatch(fetchCountries()).unwrap();
            const response = await axios.get(`/partners/partners/?active_company=${activeCompany.id}&uuid=${uuid}`,
                {headers: {"X-Requested-With": "XMLHttpRequest"}}
            );
            if(response.data.length > 0){
                setData(response.data[0]);
                dispatch(setSelectedCountry({iso2:response.data[0].country}))
                dispatch(setSelectedCity({id:response.data[0].city,name:response.data[0].city_name}))
            };
            //await dispatch(fetchCities(response.data[0].country)).unwrap();
        } catch (error) {
            dispatch(setAlert({status:error.status,text:error.response.data.message}));
        } finally {

        }
    };
    
    useEffect(() => {
        setData({name:"-",formalName:"-"})
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
                        <Tabs value={tabValue} onChange={handleChangeTabValue} aria-label="basic tabs example">
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
                                valuePhone={data.phone}
                                onChangeEmail={(value) => {setData(data => ({...data, email:value}));setButtonDisabled(false);}}
                                onChangePhone={(value) => {setData(data => ({...data, phone:value}));setButtonDisabled(false);}}
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
