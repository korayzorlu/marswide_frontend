import React from 'react'
import Row from '../../../component/grid/Row'
import Col from '../../../component/grid/Col'
import { Stack, TextField } from '@mui/material'
import CountrySelect from '../../../component/select/CountrySelect';
import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';

function ContactTab(props) {
    const {valueEmail,valuePhoneCountry,valuePhoneNumber,onChangeEmail,onChangePhoneCountry,onChangePhoneNumber,disabled} = props;

    return (
        <Stack>
            <Grid container spacing={2}>
                <Grid size={{xs:12,sm:3}}>
                    <CountrySelect
                    label="Phone Code"
                    emptyValue={true}
                    value={valuePhoneCountry}
                    onChange={(value) => onChangePhoneCountry(value)}
                    isPhoneCountry={true}
                    />
                </Grid>
                <Grid size={{xs:12,sm:3}}>
                    <TextField
                    type="number"
                    size="small"
                    label={"Phone Number"}
                    variant='outlined'
                    value={valuePhoneNumber}
                    onChange={(e) => onChangePhoneNumber(e.target.value)}
                    disabled={disabled}
                    fullWidth
                    />
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                    <TextField
                    type="email"
                    size="small"
                    label={"Email"}
                    variant='outlined'
                    value={valueEmail}
                    onChange={(e) => onChangeEmail(e.target.value)}
                    disabled={disabled}
                    fullWidth
                    />
                </Grid>
            </Grid>
        </Stack>
    )
}

export default ContactTab
