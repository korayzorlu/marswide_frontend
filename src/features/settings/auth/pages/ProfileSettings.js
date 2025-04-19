import React, { useState } from 'react'
import Form from '../../../../component/form/Form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAlert } from '../../../../store/slices/notificationSlice';
import { fetchUser } from '../../../../store/slices/authSlice';
import BackAndHeader from '../../../../component/card/BackAndHeader';
import Row from '../../../../component/grid/Row';
import Col from '../../../../component/grid/Col';
import Lightbox from '../../../../component/image/Lightbox';
import { Button, IconButton } from '@mui/material';
import VissuallyHiddenInput from '../../../../component/input/VissuallyHiddenInput';
import DeleteIcon from '@mui/icons-material/Delete';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

function Profile() {
    const {user} = useSelector((store) => store.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [image, setImage] = useState(user.image);
    const [prevImage, setPrevImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        
        try {
            const formData = new FormData();
            const jsonData = JSON.stringify({ removeImage });
            formData.append("data", jsonData);

            if (selectedImage) {
                formData.append("image", selectedImage);
            };

            const response = await axios.post(`/users/profile_settings/`, 
                formData,
                {   
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true
                },
            );
            dispatch(setAlert({status:response.data.status,text:response.data.message}));
        } catch (error) {
            dispatch(setAlert({status:error.response.data.status,text:error.response.data.message}));
        } finally {
            dispatch(fetchUser());
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
        setRemoveImage(false);
        setImage(null);
    };

    const handleDeleteImage = () => {
        setRemoveImage(true);
        setSelectedImage(null);
        setPrevImage(null);
        setImage(null);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <BackAndHeader>
                Profile
            </BackAndHeader>
            <Row>
                <Col>
                    <Lightbox
                    src={image || prevImage || require('../../../../images/icons/navbar/user-2.png')}
                    addClass="rounded-circle"
                    height="150"
                    width="150"
                    loading="lazy"
                    >
                    </Lightbox>
                </Col>
            </Row>
            <Row addClass="justify-content-center g-0" className="mb-3">
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
            <Row>
                <Col>
                    <Button type="submit" variant="contained" color="primary" addClass="btn-block" disabled={disabled} fullWidth>Save</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Profile
