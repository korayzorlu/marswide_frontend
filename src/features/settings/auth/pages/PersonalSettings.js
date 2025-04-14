import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../../../component/form/Form";
import Input from "../../../../component/input/Input";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../../store/slices/notificationSlice";
import { fetchUser } from "../../../../store/slices/authSlice";
import { Button } from "@mui/material";

function PersonalSettings() {
    const {user} = useSelector((store) => store.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        
        try {
            const response = await axios.put(`/users/api/users/${user.id}/`, 
                {
                    id : user.id,
                    email : user.email,
                    username : user.username,
                    phone_number : user.phone_number,
                    is_email_verified : user.is_email_verified,
                    first_name : firstName,
                    last_name : lastName
                },
                {withCredentials: true},
            );
            dispatch(setAlert({status:response.status,text:"Saved successfully!"}));
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
                    <p className="text-end fw-bold">Personal</p>
                </div>
            </div>
            <Input type="text" id="settings-auth-firstName" label={"First Name"} onChange={(e) => setFirstName(e.target.value)} disabled={disabled}>{firstName}</Input>
            <Input type="text" id="settings-auth-lastName" label={"Last Name"} onChange={(e) => setLastName(e.target.value)} disabled={disabled}>{lastName}</Input>
            <Button type="submit" variant="contained" color="primary" addClass="btn-block" disabled={disabled} fullWidth>Save</Button>
        </Form>
    );
}

export default PersonalSettings;