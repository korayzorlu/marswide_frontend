import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import MUIDialog from '@mui/material/Dialog';
import { setAlert } from '../../../store/slices/notificationSlice';
import { fetchCompanies, fetchUsersInCompany } from '../../../store/slices/organizationSlice';
import axios from 'axios';

function OutUserInCompanyDialog(props) {
    const {children,openInviteDialog,handleClose,id,companyId,companyName,userEmail} = props;

    const dispatch = useDispatch();

    const handleOutUserInCompany = async () => {
        try {
            const response = await axios.post(`/companies/delete_user_company/`,
                {id,userEmail},
                { withCredentials: true},
            );
            if (response.status === 200){
                dispatch(setAlert({color:"secondary",text:"User removed from company!",icon:"check-circle"}));
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
            dispatch(fetchUsersInCompany(companyId));
            handleClose();
        }
    };

    return (
        <MUIDialog
        open={openInviteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        elevation={3}
        variant="outlined"
        >
            <DialogTitle id="alert-dialog-title">
            Invite
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Are you sure you want to remove this user from {companyName}.
                </DialogContentText>
            </DialogContent>
            <DialogActions className=''>
                <Button color="neutral" onClick={handleClose}>Cancel</Button>
                <Button variant="outlined" color="error" onClick={handleOutUserInCompany} autoFocus>Remove</Button>
            </DialogActions>
        </MUIDialog>
    )
}

export default OutUserInCompanyDialog
