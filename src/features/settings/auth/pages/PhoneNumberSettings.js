import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAlert } from '../../../../store/slices/notificationSlice';
import { fetchUser, setVerifyPhoneNumber } from '../../../../store/slices/authSlice';
import Form from '../../../../component/form/Form';
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import Row from '../../../../component/grid/Row';
import Col from '../../../../component/grid/Col';
import { fetchCountries } from '../../../../store/slices/dataSlice';

function PhoneNumberSettings() {
    const {user} = useSelector((store) => store.auth);
    const {countries} = useSelector((store) => store.data);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
    const [disabled, setDisabled] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [iso2, setIso2] = useState("TR");

    useEffect(() => {
      dispatch(fetchCountries());
    }, [])
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        setButtonDisabled(true);
        
        try {
            const response = await axios.post(`/users/phone_number_settings/`, 
                {   
                    iso2 : iso2,
                    phoneNumber : phoneNumber,
                },
                {withCredentials: true},
            );
            dispatch(setAlert({status:response.status,text:response.data.message}));
            dispatch(setVerifyPhoneNumber(phoneNumber.slice(-2)))
            navigate(
                "/phone-number-verify",
                {
                    state: {iso2:iso2,phoneNumber:phoneNumber}
                }
            );
        } catch (error) {
            dispatch(setAlert({status:error.status,text:error.response.data.message}));
        } finally {
            dispatch(fetchUser());
            setDisabled(false);
        };
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="row g-0">
                <div className="col">
                    <p className="text-start fw-bold">
                        <Button type="button" color="tertary" addClass="shadow-0 p-0 fs-5" onClick={()=>navigate(-1)}><i className="fas fa-arrow-left"></i></Button>
                    </p>
                </div>
                <div className="col">
                    <p className="text-end fw-bold">Phone Number</p>
                </div>
            </div>
            <Row>
                <Col size="5" addClass="mb-3">
                    <FormControl size="small" variant="outlined" fullWidth>
                        <Select
                            id="demo-simple-select"
                            onChange={(e) => {setIso2(e.target.value);setButtonDisabled(false);}}
                            defaultValue={user.phone_country || "TR"}
                        >
                            {
                                countries.map((country,index) => {
                                    return <MenuItem value={country.iso2} className='d-flex justify-content-start'>
                                                {/* <img className='me-2' src={country.flag} alt="" height={16} width={24} loading='lazy'/> */}
                                                <span>{country.emoji} ({country.dialCode}) {country.name} - {country.iso2}</span>
                                            </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Col>
                <Col size="7" addClass="mb-3">
                    <TextField
                    type="number"
                    id="settings-auth-phone-number"
                    size="small"
                    label={"Phone Number"}
                    variant='outlined'
                    value={phoneNumber}
                    onChange={(e) => {setPhoneNumber(e.target.value);setButtonDisabled(false);}}
                    disabled={disabled}
                    fullWidth
                    />
                </Col>
            </Row>
            <Button type="submit" variant="contained" color="primary" disabled={buttonDisabled} fullWidth>Send SMS With Code</Button>
        </Form>
    )
}

export default PhoneNumberSettings
