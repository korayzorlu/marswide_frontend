import React from 'react'
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

function FormHeader(props) {
    const {
        children,
        disabled,
        loadingAdd,
        disabledAdd,
        onClickAdd,
        loadingSave,
        disabledSave,
        onClickSave,
        loadingDelete,
        disabledDelete,
        onClickDelete,
    } = props;

    const navigate = useNavigate();

    return (
        <Grid
        container
        spacing={0}
        >
            <Grid
            size={6}
            container
            sx={{
                justifyContent: "flex-start",
                alignItems: "center",
            }}
            >
                <IconButton aria-label='back' onClick={()=>navigate(-1)}>
                    <ArrowBackIosNewIcon/>
                </IconButton>
            </Grid>
            <Grid
            size={6}
            container
            sx={{
                justifyContent: "flex-end",
                alignItems: "center",
            }}
            >
                
                {
                    onClickAdd
                    ?
                    <Button
                    aria-label="add"
                    variant='contained'
                    color="opposite"
                    onClick={() => onClickAdd()}
                    loading={loadingAdd}
                    disabled={disabled || disabledAdd}
                    startIcon={<AddIcon/>}
                    >
                        Create
                    </Button>
                    :
                    <></>
                }

                {
                    onClickSave
                    ?
                    <IconButton
                    aria-label="save"
                    color="opposite"
                    onClick={() => onClickSave()}
                    loading={loadingSave}
                    disabled={disabled || disabledSave}
                    >
                        <SaveIcon/>
                    </IconButton>
                    :
                    <></>
                }

                {
                    onClickDelete
                    ?
                    <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => onClickDelete()}
                    loading={loadingDelete}
                    disabled={disabled || disabledDelete}
                    >
                        <DeleteIcon/>
                    </IconButton>
                    :
                    <></>
                }

            </Grid>
        </Grid>
    )
}

export default FormHeader
