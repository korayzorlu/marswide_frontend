import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../../../component/form/Form";
import Button from "../../../../component/button/Button";
import Input from "../../../../component/input/Input";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../../store/slices/notificationSlice";
import { fetchUser } from "../../../../store/slices/authSlice";

function EmailSettings() {
    const {user} = useSelector((store) => store.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState(user.email);
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        
        try {
            const response = await axios.post(`/users/email_settings/`, 
                {
                    email : email,
                },
                {withCredentials: true},
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
                    <p className="text-end fw-bold">Email</p>
                </div>
            </div>
            <Input type="email" id="settings-auth-email" label={"Email Address"} onChange={(e) => setEmail(e.target.value)} disabled={disabled}>{email}</Input>
            <Button type="submit" color="primary" addClass="btn-block" disabled={disabled}>Save</Button>
        </Form>
    );
}

export default EmailSettings;