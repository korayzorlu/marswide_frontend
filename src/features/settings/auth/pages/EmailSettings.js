import { useState } from "react";
import Form from "../../../../component/form/Form";
import Input from "../../../../component/input/Input";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../../store/slices/notificationSlice";
import { fetchUser } from "../../../../store/slices/authSlice";
import { Button, Typography } from "@mui/material";
import BackAndHeader from "../../../../component/card/BackAndHeader";
import Row from "../../../../component/grid/Row";
import Col from "../../../../component/grid/Col";
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import EmailIcon from '@mui/icons-material/Email';

function EmailSettings() {
    const {user} = useSelector((store) => store.auth);

    const dispatch = useDispatch();

    const [email, setEmail] = useState(user.email);
    const [edit, setEdit] = useState(false);
    const [changed, setChanged] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setAlert({color:"secondary",text:"Please wait...",icon:"hourglass"}));
        setDisabled(true);
        setButtonDisabled(true);
        setEdit(false);
        
        try {
            const response = await axios.post(`/users/email_settings/`, 
                {
                    email : email,
                },
                {withCredentials: true},
            );
            dispatch(setAlert({status:response.status,text:response.data.message}));
            setChanged(true);
        } catch (error) {
            dispatch(setAlert({status:error.status,text:error.response.data.message}));
        } finally {
            dispatch(fetchUser());
            setDisabled(false);
            setButtonDisabled(false);
        };
    };


    return ( 
        <Form onSubmit={handleSubmit}>
            <BackAndHeader className="mb-3">
                Email
            </BackAndHeader>
            {
                changed
                ?
                    <>
                        <EmailIcon sx={{fontSize:"32px"}}></EmailIcon>
                        <Typography>
                            Check your mailbox
                        </Typography>
                    </>
                :
                    (
                        !edit
                        ?
                        <>
                            <Row>
                                <Col addClass="mb-3">
                                    <Typography>
                                        {
                                            user.is_email_verified
                                            ?
                                                <>
                                                    <VerifiedIcon/> This email address verified!
                                                </>
                                            :
                                                <>
                                                    <NewReleasesIcon/> This email address not verified!
                                                </>
                                        }
                                    </Typography>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col addClass="mb-3">
                                            <Typography>
                                                {user.email}
                                            </Typography>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button type="button" variant="contained" color="primary" onClick={() => setEdit(true)} disabled={buttonDisabled} fullWidth>Change Email</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </>
                        :
                        <>
                            <Row>
                                <Col>
                                    <Input type="email" id="settings-auth-email" label={"Email Address"} onChange={(e) => {setEmail(e.target.value);setButtonDisabled(false);}} disabled={disabled}>{email}</Input>
                                </Col>
                            </Row>
                            <Row>
                                <Col addClass="mb-3">
                                    <Button type="submit" variant="contained" color="primary" fullWidth>Send Verification Email</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col addClass="mb-3">
                                    <Button type="button" variant="contained" color="error" onClick={() => setEdit(false)} fullWidth>Cancel</Button>
                                </Col>
                            </Row>
                        </>
                    )
            }
            
            
        </Form>
    );
}

export default EmailSettings;