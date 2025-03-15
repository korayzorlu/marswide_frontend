import React, { act, useEffect, useState } from 'react';
import BackAndHeader from '../../../component/card/BackAndHeader';
import Card from '../../../component/card/Card';
import CardHeader from '../../../component/card/CardHeader';
import CardBody from '../../../component/card/CardBody';
import Input from '../../../component/input/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setDialog } from '../../../store/slices/notificationSlice';
import Col from '../../../component/grid/Col';
import Row from '../../../component/grid/Row';
import Form from '../../../component/form/Form';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Dialog from '../../../component/feedback/Dialog';
import Lightbox from '../../../component/image/Lightbox';
import VissuallyHiddenInput from '../../../component/input/VissuallyHiddenInput';
import {deleteCompany, fetchCompanies, fetchUsersInCompany, setActiveCompany } from '../../../store/slices/organizationSlice';
import { Avatar, Chip, Divider, ListItemIcon, MenuItem, Tab, Tabs, TextField, Typography } from '@mui/material';
import TabPanel from '../../../component/tab/TabPanel';
import CustomTableButton from '../../../component/table/CustomTableButton';
import AddIcon from "@mui/icons-material/Add";
import BasicTable from '../../../component/table/BasicTable';
import AccountMenu from '../../../component/menu/AccountMenu';
import MessageIcon from '@mui/icons-material/Message';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { amber,indigo,red} from '@mui/material/colors';
import BadgeIcon from '@mui/icons-material/Badge';
import InviteDialog from '../components/InviteDialog';
import CancelIcon from '@mui/icons-material/Cancel';
import OutUserInCompanyDialog from '../components/OutUserInCompanyDialog';
import UsersInCompany from '../components/UsersInCompany';

function UpdateCompany() {
    const {user} = useSelector((store) => store.auth);
    const {companies,activeCompany,disabled,usersLoading,usersInCompany} = useSelector((store) => store.organization);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tabValue, setTabValue] = useState(0);
    const [image, setImage] = useState(null);
    const [prevImage, setPrevImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);
    const [name, setName] = useState("-");
    const [formalName, setFormalName] = useState("-");
    const [data, setData] = useState({})
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const location = useLocation();
    const {id,companyId} = location.state || {};

    const [thisCompanyId, setThisCompanyId] = useState(companyId);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/companies/api/companies/${companyId}/`,
                {headers: {"X-Requested-With": "XMLHttpRequest"}}
            );
            setData(response.data);
            setImage(response.data.image);
            setName(response.data.name);
            setFormalName(response.data.formalName);
        } catch (error) {
            dispatch(setAlert({color:"danger",text:"Sorry, something went wrong!",icon:"times-circle"}));
        } finally {

        }
    };
    
    useEffect(() => {
        fetchData();
    }, [])

    const handleSubmit = async () => {
        //event.preventDefault();
        setButtonDisabled(true);
        
        try {
            const formData = new FormData();
            const jsonData = JSON.stringify({ id:companyId, name, formalName, removeImage });
            formData.append("data", jsonData);

            if (selectedImage) {
                formData.append("image", selectedImage);
            };

            const response = await axios.post(`/companies/update_company/`,
                formData,
                {   
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true
                },
            );
            if (response.status === 200){
                dispatch(setAlert({color:"secondary",text:"Successfully saved!",icon:"check-circle"}));
            };
        } catch (error) {
            if (error.status === 401){
                dispatch(setAlert({color:"danger",text:error.response.data.message,icon:"times-circle"}));
            } else if (error.status === 400){
                dispatch(setAlert({color:"danger",text:error.response.data.message,icon:"times-circle"}));
            } else {
                dispatch(setAlert({color:"danger",text:"Sorry, something went wrong!",icon:"times-circle"}));
            };
        } finally {
            fetchData();
        };
    };

    const handleDelete = () => {
        setButtonDisabled(true);

        if (activeCompany.id === id) {
            dispatch(setActiveCompany(companies.filter(item => item.id !== activeCompany.id)[0]));
        };

        dispatch(deleteCompany(id));

    };

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);

        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setPrevImage(reader.result);
            };
            reader.readAsDataURL(file);
            setButtonDisabled(false);
        };
        setRemoveImage(false);
        setImage(null);
    };

    const handleDeleteImage = () => {
        setRemoveImage(true);
        setSelectedImage(null);
        setImage(null);
        setPrevImage(null);
        setButtonDisabled(false);
    };

    const handleChangeTabValue = (event, newTabValue) => {
        setTabValue(newTabValue);
    };


    
    //<Button type="submit" addClass="bg-mui-blue text-dark" disabled={buttonDisabled}>Save</Button>
    
    return (
        <Card>
            
            <CardHeader>
                <BackAndHeader>
                    <IconButton type="button" aria-label="save" color="neutral" onClick={() => handleSubmit()} className="me-3" disabled={buttonDisabled}><SaveIcon /></IconButton>
                    <IconButton type="button" aria-label="delete" color="error" onClick={() => dispatch(setDialog(true))}><DeleteIcon /></IconButton>
                </BackAndHeader>
            </CardHeader>
            <CardBody>
                <Tabs value={tabValue} onChange={handleChangeTabValue} aria-label="basic tabs example">
                    <Tab label="Preferences" value={0}/>
                    <Tab label="Users" value={1}/>
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                    <Form>
                        <Row addClass="justify-content-center g-0">
                            <Col size="4" addClass="mb-3 text-center">
                                <Row>
                                    <Col>
                                        <Lightbox
                                        src={image || prevImage || require('../../../images/icons/global/company.jpg')}
                                        addClass="rounded-circle"
                                        height="150"
                                        width="150"
                                        loading="lazy"
                                        >
                                        </Lightbox>
                                    </Col>
                                </Row>
                                <Row addClass="justify-content-center g-0">
                                    <Col size="1">
                                        <IconButton component="label" role={undefined} tabIndex={-1} color="neutral">
                                            <CameraAltIcon />
                                            <VissuallyHiddenInput onChange={handleChangeImage} />
                                        </IconButton>
                                    </Col>
                                    <Col size="1">
                                        <IconButton component="label" role={undefined} tabIndex={-1} color="neutral" onClick={handleDeleteImage}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col size="6">
                                <Input type="text" id="update-company-name" label={"Name"} onChange={(e) => {setName(e.target.value);setButtonDisabled(false);}} disabled={disabled}>{name}</Input>
                            </Col>
                            <Col size="6">
                                <Input type="text" id="update-company-formalName" label={"Formal Name"} onChange={(e) => {setFormalName(e.target.value);setButtonDisabled(false);}} disabled={disabled}>{formalName}</Input>
                            </Col>
                        </Row>
                    </Form>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <UsersInCompany companyId={thisCompanyId} companyName={name}></UsersInCompany>
                </TabPanel>
                
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

export default UpdateCompany
