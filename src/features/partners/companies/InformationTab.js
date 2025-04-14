import React from 'react'
import Row from '../../../component/grid/Row';
import Col from '../../../component/grid/Col';
import { TextField } from '@mui/material';

function InformationTab(props) {
    const {valueName,valueFormalName,onChangeName,onChangeFormalName,disabled} = props;

    return (
        <>
            <Row>
                <Col size="6" className="mb-3">
                    <TextField
                    type="text"
                    id="update-partner-name"
                    size="small"
                    label={"Name * "}
                    variant='outlined'
                    value={valueName}
                    onChange={(e) => onChangeName(e.target.value)}
                    disabled={disabled}
                    fullWidth
                    />
                </Col>
                <Col size="6" className="mb-3">
                    <TextField
                    type="text"
                    id="update-partner-formal-name"
                    size="small"
                    label={"Formal Name * "}
                    variant='outlined'
                    value={valueFormalName}
                    onChange={(e) => onChangeFormalName(e.target.value)}
                    disabled={disabled}
                    fullWidth
                    />
                </Col>
            </Row>
        </>
    )
}

export default InformationTab
