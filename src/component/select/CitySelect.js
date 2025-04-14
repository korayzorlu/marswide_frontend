import { Autocomplete, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useCallback, useDeferredValue, useEffect, useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCities, fetchCities, setSelectedCity } from '../../store/slices/dataSlice';
import debounce from 'lodash/debounce';

function CitySelect(props) {
    const {emptyValue, value, onChange} = props;

    const {cities,citiesLoading,selectedCountry,selectedCity} = useSelector((store) => store.data);

    const dispatch = useDispatch();

    const [isPending, startTransition] = useTransition();

    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        dispatch(deleteCities());
        setInputValue("");
    }, [selectedCountry,dispatch])

    const handleOpen = async () => {
        if(inputValue.length > 2){
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
        if(inputValue.length === 0){
            dispatch(deleteCities());
        };
    };

    const handleChange = (newValue) => {
        onChange(newValue ? newValue.id : 0);
        dispatch(setSelectedCity(newValue ? newValue : null));
    }

    const debouncedHandleInputChange = useCallback(
        debounce((newInputValue) => {
            if (newInputValue.length > 2) {
                startTransition(() => {
                    dispatch(fetchCities({ country: selectedCountry.iso2, name: newInputValue }));
                })
            } else if (newInputValue.length <= 2) {
                dispatch(deleteCities());
            }
        }, 400),
        [dispatch, selectedCountry.iso2]
    );
    
    const handleInputChange = (newInputValue) => {
        setInputValue(newInputValue);
        debouncedHandleInputChange(newInputValue);
        
    }
    

    return (
        // <FormControl size="small" variant="outlined" fullWidth>
        //     <Select
        //         onChange={(e) => {onChange(e.target.value);setSelectedValue(e.target.value);}}
        //         defaultValue={0}
        //         value={cities.some((city) => city.id === selectedValue) ? selectedValue : 0}
        //     >   
        //         {
        //             emptyValue
        //             ?
        //             <MenuItem value={0} className='d-flex justify-content-start'>
        //                 <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        //                     -- Select City --
        //                 </Typography>
        //             </MenuItem>
        //             :
        //             <></>
        //         }
        //         {
        //             cities.map((city,index) => {
        //                 return <MenuItem key={index} value={city.id} className='d-flex justify-content-start'>
        //                                 <Typography variant="body1" sx={{ color: 'text.primary' }}>
        //                                     {city.name}
        //                                 </Typography>
        //                         </MenuItem>
        //             })
        //         }
        //     </Select>
        // </FormControl>

        <Autocomplete
        size='small'
        variant="outlined"
        fullWidth
        open={open}
        options={cities}
        loading={citiesLoading}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={(e, newValue) => handleChange(newValue)}
        onInputChange={(event, newInputValue) => handleInputChange(newInputValue)}
        value={selectedCity}
        inputValue={inputValue}
        isOptionEqualToValue={(option, val) => option.id === val.id}
        autoHighlight
        getOptionLabel={(option) =>  option.name || ""}
        // filterOptions={(options, state) => {
        //     return options.filter((option) =>
        //       option.name.toLowerCase().includes(state.inputValue.toLowerCase())
        //     );
        // }}
        renderOption={(props,option) => {
            const { key, ...optionProps } = props;
            return (
                <Typography key={key} variant="body1" sx={{ color: 'text.primary' }} {...optionProps}>
                    {option.name}
                </Typography>
            )
            
        }}
        renderInput={(params) => (
            <TextField
                {...params}
                label="City"
                variant='outlined'
                placeholder='Type at least 3 characters to search for a city...'
            />
            )}
        />
    )
}

export default CitySelect
