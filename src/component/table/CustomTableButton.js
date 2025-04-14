import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from 'react-redux';

function CustomTableButton(props) {
    const {children, link, icon,onClick,disabled,color,variant} = props;

    const {dark} = useSelector((store) => store.auth);

  return (
    <Button
    variant={variant || "text"}
    size="small"
    sx={{
        textTransform: "none",
        border:"none",
        padding:"4px 5px",
    }}
    startIcon={icon}
    onClick={onClick}
    disabled={disabled ? disabled : false}
    color={
      color
      ?
      color
      :
      dark
        ?
          "primary"
        :
          "blackhole"
    }
    >
        <Link to={link}>{children}</Link>
    </Button>
  )
}

export default CustomTableButton
