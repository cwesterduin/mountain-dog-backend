import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useParams } from "@reach/router"
import { getData } from '../requests'
import { Link } from 'gatsby'

import EditIcon from '@material-ui/icons/Edit';

export default function DataTable() {
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])

    const { type } = useParams()

    useEffect(() => {
      async function fetchTableData() {
        const { results } = await getData(type);
        console.log(results);
        setColumns(
        [{ field: "edit",
            headerName: "edit",
            width: 100,
            renderCell: (params) => (
              <strong>
                <Link
                  to={`./${params.value}`}
                  alt="edit"
                >
                  <EditIcon/>
                </Link>
              </strong>
            ),}].concat(Object.keys(results[0]).filter(d => d !== 'id').map((d) => ({
              field: d,
              headerName: d,
              width: 200,
            })))
        );
        setRows(Object.values(results).map((d, i) => ({ ...d, edit: String(d.id) })));
      }
      fetchTableData();
    }, [type]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        checkboxSelection 
        columns={columns}
        rows={rows}/>
    </div>
  );
}
