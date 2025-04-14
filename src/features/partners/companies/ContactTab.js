import React from 'react'
import Row from '../../../component/grid/Row'
import Col from '../../../component/grid/Col'
import { TextField } from '@mui/material'

function ContactTab(props) {
    const {valueEmail,valuePhone,onChangeEmail,onChangePhone,disabled} = props;

    return (
        <>
            <Row>
                <Col size="6" className="mb-3">
                    <TextField
                    type="text"
                    id="update-partner-phone"
                    size="small"
                    label={"Phone"}
                    variant='outlined'
                    value={valuePhone}
                    onChange={(e) => onChangePhone(e.target.value)}
                    disabled={disabled}
                    fullWidth
                    />
                </Col>
                <Col size="6" className="mb-3">
                    <TextField
                    type="email"
                    id="update-partner-email"
                    size="small"
                    label={"Email"}
                    variant='outlined'
                    value={valueEmail}
                    onChange={(e) => onChangeEmail(e.target.value)}
                    disabled={disabled}
                    fullWidth
                    />
                </Col>
            </Row>
        </>
    )
}

export default ContactTab
