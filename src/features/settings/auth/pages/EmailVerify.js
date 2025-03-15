import React, { useState } from 'react'
import PanelContent from '../../../../component/panel/PanelContent'
import Row from '../../../../component/grid/Row'
import Col from '../../../../component/grid/Col'
import Card from '../../../../component/card/Card'
import CardBody from '../../../../component/card/CardBody'
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setAlert } from '../../../../store/slices/notificationSlice';
import { fetchUser } from '../../../../store/slices/authSlice'
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';

function EmailVerify() {
    const {user} = useSelector((store) => store.auth);

    const dispatch = useDispatch();

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const sendEmail = async () => {
        setButtonDisabled(true);
        
        try {
            const response = await axios.post(`/users/email_settings/`, 
                {
                    email : user.email,
                },
                {withCredentials: true},
            );
            if (response.status === 200){
                (setAlert({color:"secondary",text:"Successfully sent!",icon:"check-circle"}));
                await dispatch(fetchUser()).unwrap();
            };
        } catch (error) {
            if (error.status === 401){
                dispatch(setAlert({color:"danger",text:error.response.data.message,icon:"times-circle"}));
            } else if (error.status === 400){
                dispatch(setAlert({color:"danger",text:error.response.data.message,icon:"times-circle"}));
            } else {
                dispatch(setAlert({color:"danger",text:"Sorry, something went wrong!",icon:"times-circle"}));
            };
        }
    };

    return (
        <PanelContent>
            <Row addClass="m-0">
                <Col size="6" addClass="ms-auto me-auto">
                    <Card>
                        <CardBody>
                            <Row>
                                <Col size="8" addClass="mb-3 ms-auto me-auto text-center">
                                    <EmailIcon sx={{fontSize:"64px"}}></EmailIcon>
                                </Col>
                            </Row>
                            <Row>
                                <Col size="8" addClass="mb-3 ms-auto me-auto text-center">
                                    <Typography>
                                        Verification required
                                    </Typography>
                                </Col>
                            </Row>
                            <Row>
                                <Col size="8" addClass="mb-3 ms-auto me-auto text-center">
                                    <Typography variant="body2" sx={{color:"text.secondary"}}>
                                    Your account ({user.email}) has not been verified yet. Please verify your account to log in. If you haven’t received the verification email, you can request a new one below.
                                    </Typography>
                                </Col>
                            </Row>
                            <Row>
                                <Col size="6" addClass="mb-3 ms-auto me-auto text-center">
                                    <Button
                                    type="button"
                                    onClick={sendEmail}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<VerifiedIcon />}
                                    disabled={buttonDisabled}
                                    fullWidth
                                    >
                                        Resend Verification Email
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </PanelContent>
    )
}

export default EmailVerify
