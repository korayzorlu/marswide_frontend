import { useEffect, useState } from "react";
import PanelContent from "../../../component/panel/PanelContent";
import ListTable from "../../../component/table/ListTable";
import CustomTableButton from "../../../component/table/CustomTableButton";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../../store/slices/organizationSlice";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BadgeIcon from '@mui/icons-material/Badge';
import { Chip, Divider, ListItemIcon, MenuItem } from "@mui/material";
import { amber,indigo } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import AccountMenu from "../../../component/menu/AccountMenu";
import MessageIcon from '@mui/icons-material/Message';
import AddBoxIcon from '@mui/icons-material/AddBox';

function Companies() {
    const {companies,companiesLoading} = useSelector((store) => store.organization);

    const dispatch = useDispatch();

    const [rows, setRows] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
      dispatch(fetchCompanies());
      setRows(companies);
    }, []);

    const columns = [
        { field: 'company', headerName: 'Name', flex: 1, editable: true, renderCell: (params) => (
            <>
              {
                params.row.is_admin
                  ?
                    <Link
                    to={`/companies/update/${encodeURIComponent(encodeURIComponent(params.value))}/`} 
                    state={{id: params.row.id,companyId: params.row.companyId}}
                    style={{textDecoration:"underline"}}>
                      {params.value.name}
                    </Link>
                  :
                    params.value.name
              }
              
            </>
            
          )
        },
        { field: 'is_admin', headerName: 'Status', width: 150, renderCell: (params) => (
            <>
              {
                params.value
                  ?
                    <>
                      <Chip
                      icon={<ManageAccountsIcon color={amber[900]}/>}
                      label="Manager"
                      sx={{
                        color: amber[900],
                        borderColor: amber[900],
                      }}
                      variant="outlined"/>
                    </>
                  :
                    <>
                      <Chip
                      icon={<BadgeIcon color={indigo[300]}/>}
                      label="Staff"
                      sx={{
                        color: indigo[300],
                        borderColor: indigo[300],
                      }}
                      variant="outlined"/>
                    </>
              }
            </>
          )
        },
        { field: 'owner', headerName: 'Owner', width: 300, renderCell: (params) => (
            <>
              <Chip
              avatar={<Avatar alt="" src={params.row.userImage} />}
              label={params.value} 
              onClick={handleClick}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              />
              <AccountMenu open={open} anchorEl={anchorEl} onClick={handleClose} onClose={handleClose} handleClose={handleClose}>
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <MessageIcon fontSize="small" />
                    </ListItemIcon>
                    Message
                </MenuItem>
              </AccountMenu>
            </>
          )
        },
    ]

    return ( 
            <PanelContent>
                <ListTable
                rows={companies}
                columns={columns}
                getRowId={(row) => row.id}
                loading={companiesLoading}
                customButtons={
                    <CustomTableButton link="/companies/add-company" icon={<AddBoxIcon/>} children="NEW"/>
                }
                ></ListTable>
            </PanelContent>
        
    );
}

export default Companies;