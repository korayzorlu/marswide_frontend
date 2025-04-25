import { Outlet } from "react-router-dom";
import Grid from '@mui/material/Grid2';

function AuthSettings(props) {
    
    return ( 
        <Grid container spacing={2}>
            <Grid size={12}>
                <Outlet/>
            </Grid>
        </Grid>
    );
}

export default AuthSettings;