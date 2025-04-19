import React, { useState } from 'react'
import Card from '../../../component/card/Card'
import CardBody from '../../../component/card/CardBody'
import BackAndHeader from '../../../component/card/BackAndHeader'
import Form from '../../../component/form/Form'
import Input from '../../../component/input/Input'
import CardFooter from '../../../component/card/CardFooter'
import Button from '../../../component/button/Button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAlert } from '../../../store/slices/notificationSlice'
import { fetchUser } from '../../../store/slices/authSlice'
import axios from 'axios'
import CardHeader from '../../../component/card/CardHeader'
import Row from '../../../component/grid/Row'
import Col from '../../../component/grid/Col'
import Lightbox from '../../../component/image/Lightbox'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VissuallyHiddenInput from '../../../component/input/VissuallyHiddenInput'
import { fetchCompanies } from '../../../store/slices/organizationSlice'

function AddCompany() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [prevImage, setPrevImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState("");
    const [formalName, setFormalName] = useState("");
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        
        try {
            const formData = new FormData();
            const jsonData = JSON.stringify({ name, formalName });
            formData.append("data", jsonData);

            if (selectedImage) {
                formData.append("image", selectedImage);
            };

            const response = await axios.post(`/companies/add_company/`, 
                formData,
                {   
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true
                },
            );
            dispatch(setAlert({status:response.data.status,text:response.data.message}));
            navigate("/companies");
        } catch (error) {
            dispatch(setAlert({status:error.response.data.status,text:error.response.data.message}));
        } finally {
            dispatch(fetchCompanies());
            setDisabled(false);
        };
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
        };
    };

    const handleDeleteImage = () => {
        setSelectedImage(null);
        setImage(null);
    };

    return (
        <Card>
            <Form onSubmit={handleSubmit}>
                <CardHeader>
                    <BackAndHeader>Add Company</BackAndHeader>
                </CardHeader>
                <CardBody>
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
                            <Input type="text" id="update-company-name" label={"Name"} onChange={(e) => {setName(e.target.value)}} disabled={disabled}>{name}</Input>
                        </Col>
                        <Col size="6">
                            <Input type="text" id="update-company-formalName" label={"Formal Name"} onChange={(e) => {setFormalName(e.target.value)}} disabled={disabled}>{formalName}</Input>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter addClass="text-end">
                    <Button type="submit" addClass="bg-mui-blue text-dark" disabled={disabled}>Create</Button>
                </CardFooter>
            </Form>
        </Card>
    )
}

export default AddCompany
