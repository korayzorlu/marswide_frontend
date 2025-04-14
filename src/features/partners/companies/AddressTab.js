import React from 'react'
import Row from '../../../component/grid/Row';
import Col from '../../../component/grid/Col';
import CountrySelect from '../../../component/select/CountrySelect';
import CitySelect from '../../../component/select/CitySelect';
import { TextField } from '@mui/material';

function AddressTab(props) {
    const {valueCountry,valueCity,valueAddress,onChangeCountry,onChangeCity,onChangeAddress,disabled} = props;

    return (
        <>
            <Row>
                <Col size="6" className="mb-3">
                    <CountrySelect
                    emptyValue={true}
                    value={valueCountry}
                    onChange={(value) => onChangeCountry(value)}
                    />
                </Col>
                <Col size="6" className="mb-3">
                    <CitySelect
                    emptyValue={true}
                    onChange={(value) => onChangeCity(value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="mb-3">
                    <TextField
                    type="text"
                    id="update-partner-address"
                    size="small"
                    label={"Address Line"}
                    variant='outlined'
                    value={valueAddress}
                    onChange={(e) => onChangeAddress(e.target.value)}
                    disabled={disabled}
                    fullWidth
                    />
                </Col>
            </Row>
        </>
    )
}

export default AddressTab
