import { Autocomplete, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function CurrencySelect(props) {
    const {emptyValue,label,value,onChange} = props;

    const {currencies,currenciesLoading} = useSelector((store) => store.data);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    
    const handleOpen = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        //dispatch(deleteCountries());
    };

    const handleChange = (newValue) => {
        onChange(newValue ? newValue.code : 0);
        setSelectedValue(newValue ? newValue.code : 0);
    }

    return (
        <Autocomplete
        size='small'
        variant="outlined"
        fullWidth
        options={currencies}
        open={open}
        loading={currenciesLoading}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={(e, newValue) => handleChange(newValue)}
        value={currencies.find((currency) => currency.code === selectedValue)}
        isOptionEqualToValue={(option, val) => option.code === val.code}
        autoHighlight
        getOptionLabel={(option) =>  option.code}
        renderOption={(props,option) => {
            const { key, ...optionProps } = props;
            return (
                <Typography key={key} variant="body1" sx={{ color: 'text.primary' }} {...optionProps}>
                    {option.code}
                </Typography>
            )
        }}
        renderInput={(params) => (
            <TextField
              {...params}
              label={label || "Currency"}
              variant='outlined'
              placeholder='Choose a currency'
            />
          )}
        />
    )
}

export default CurrencySelect
