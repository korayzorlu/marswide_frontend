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

function Companies() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchData = async () => {
        try {
            const response = await axios.get("/companies/api/companies/");
            setRows(response.data);
        } catch (error) {
            console.error("Veri çekilirken bir hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
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
        { field: 'name', headerName: 'Name', width: 250, editable: true, renderCell: (params) => (
            <Link to={`/companies/update/${encodeURIComponent(encodeURIComponent(params.value))}`} state={{id: params.row.id}} style={{textDecoration:"underline"}}>
              {params.value}
            </Link>
          )
        },
        { field: 'formalName', headerName: 'Formal Name', flex: 1 },
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
                rows={rows}
                columns={columns}
                getRowId={(row) => row.id}
                loading={loading}
                customButtons={
                    <CustomTableButton link="/companies/add-company" icon={<AddIcon/>} children="NEW"/>
                }
                ></ListTable>
            </PanelContent>
        
    );
}

export default Companies;