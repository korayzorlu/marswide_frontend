import { Autocomplete, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies } from '../../store/slices/dataSlice';
import User from '../navbar/User';

function CurrencySelect(props) {
    const {emptyValue,label,value,onChange} = props;

    const {user,dark} = useSelector((store) => store.auth);
    const {currencies,currenciesLoading} = useSelector((store) => store.data);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    
    const handleOpen = async () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (newValue) => {
        onChange(newValue ? newValue.code : 0);
        setSelectedValue(newValue ? newValue : null);
    }

    useEffect(() => {
        setSelectedValue(currencies.find((currency) => currency.code === value));
    }, [currencies])
    

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
        value={selectedValue}
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
