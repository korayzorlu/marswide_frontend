import { useState } from "react";
import Form from "../../../../component/form/Form";
import Input from "../../../../component/input/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../../store/slices/notificationSlice";
import { fetchUser } from "../../../../store/slices/authSlice";
import { Button } from "@mui/material";

function PasswordReset() {
    const {user} = useSelector((store) => store.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        
        try {
            const response = await axios.post(`/users/password_settings/`, 
                {
                    email : user.email,
                    password : currentPassword,
                    newPassword : newPassword,
                    newPasswordConfirmation : newPasswordConfirmation
                },
                {withCredentials: true},
            );
            if (response.status === 200){
                dispatch(setAlert({color:"secondary",text:"Successfully saved!",icon:"check-circle"}));
                navigate("/auth/login")
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
                    <p className="text-end fw-bold">Password Reset</p>
                </div>
            </div>
            <Input type="password" id="settings-auth-currentPassword" label={"Current Password"} onChange={(e) => setCurrentPassword(e.target.value)} disabled={disabled}></Input>
            <Input type="password" id="settings-auth-newPassword" label={"New Password"} onChange={(e) => setNewPassword(e.target.value)} disabled={disabled}></Input>
            <Input type="password" id="settings-auth-newPasswordConfirmation" label={"New Password Confirm"} onChange={(e) => setNewPasswordConfirmation(e.target.value)} disabled={disabled}></Input>
            <Button type="submit" variant="contained" color="primary" addClass="btn-block" disabled={disabled} fullWidth>Save</Button>
        </Form>
    );
}

export default PasswordReset;