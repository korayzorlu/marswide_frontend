import { useEffect, useState } from "react";
import PanelContent from "../../../component/panel/PanelContent";
import axios from "axios";
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
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import { Chip, Divider, ListItemIcon, MenuItem } from "@mui/material";
import { lime,amber,blueGrey,indigo,cyan } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import AccountMenu from "../../../component/menu/AccountMenu";
import MessageIcon from '@mui/icons-material/Message';

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

    const handleSaveClick = (id) => () => {
        setRows({ ...rows, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRows({
          ...rows,
          [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    
        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
          setRows(rows.filter((row) => row.id !== id));
        }
    };

    const handleEditClick = (id) => () => {
        setRows({ ...rows, [id]: { mode: GridRowModes.Edit } });
    };

    const handleDeleteClick = (id) => () => {
      setRows(rows.filter((row) => row.id !== id));
    };

    const columns = [
        { field: 'company', headerName: 'Name', flex: 1, editable: true, renderCell: (params) => (
            <>
              {
                params.row.is_admin
                  ?
                    <Link
                    to={`/companies/update/${encodeURIComponent(encodeURIComponent(params.value))}`} 
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
        { field: 'actions', headerName: 'Actions', width: 100, type: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rows[id]?.mode === GridRowModes.Edit;
        
                if (isInEditMode) {
                  return [
                    <GridActionsCellItem
                      icon={<SaveIcon />}
                      label="Save"
                      sx={{
                        color: 'primary.main',
                      }}
                      onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                      icon={<CancelIcon />}
                      label="Cancel"
                      className="textPrimary"
                      onClick={handleCancelClick(id)}
                      color="inherit"
                    />,
                  ];
                }

                return [
                    <GridActionsCellItem
                      icon={<EditIcon />}
                      label="Edit"
                      className="textPrimary"
                      onClick={handleEditClick(id)}
                      color="inherit"
                    />,
                    <GridActionsCellItem
                      icon={<DeleteIcon />}
                      label="Delete"
                      onClick={handleDeleteClick(id)}
                      color="inherit"
                    />,
                  ];
            }
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
                    <CustomTableButton link="/companies/add-company" icon={<AddIcon/>} children="NEW"/>
                }
                ></ListTable>
            </PanelContent>
        
    );
}

export default Companies;