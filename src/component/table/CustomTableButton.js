import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import AddIcon from "@mui/icons-material/Add";

function CustomTableButton(props) {
    const {children, link, icon,onClick,disabled,color} = props;

  return (
    <Button
    variant="outlined"
    size="small"
    sx={{
        textTransform: "none",
        border:"none",
        padding:"4px 5px",
    }}
    startIcon={icon}
    onClick={onClick}
    disabled={disabled ? disabled : false}
    color={color ? color : "primary"}
    >
        <Link to={link}>{children}</Link>
    </Button>
  )
}

export default CustomTableButton
