import { useEffect, useMemo, useState } from "react";
import Card from "../../../../component/card/Card";
import CardBody from "../../../../component/card/CardBody";
import PanelContent from "../../../../component/panel/PanelContent";
import DataTable from "../../../../component/table/DataTable";
import Table from "../../../../component/table/Table";
import TableContent from "../../../../component/table/TableContent";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useMockServer } from '@mui/x-data-grid-generator';
import axios from "axios";

function Companies() {
    const {theme} = useSelector((store) => store.auth);
    const {tableLightTheme,tableDarkTheme} = useSelector((store) => store.table);

    const [rows, setRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [filterModel, setFilterModel] = useState({ items: [] });
    const [sortModel, setSortModel] = useState([]);
    
    useEffect(() => {
        const fetcher = async () => {
          // fetch data from server
          const response = await axios.get(`/users/api/users/`, {withCredentials: true});
          setRows(response.data);
        };
        fetcher();
    }, [paginationModel, sortModel, filterModel]);
  
    console.log(rows)
    const columns = ["set","ket"]

    //<Table columns={columns} rows={rows}></Table>

    return ( 
            <PanelContent>
                <TableContent>
                    <DataGridPro
                    columns={columns}
                    rows={rows}
                    pagination
                    sortingMode="server"
                    filterMode="server"
                    paginationMode="server"
                    onPaginationModelChange={setPaginationModel}
                    onSortModelChange={setSortModel}
                    onFilterModelChange={setFilterModel}
                    />;
                </TableContent>
            </PanelContent>
        
    );
}

export default Companies;