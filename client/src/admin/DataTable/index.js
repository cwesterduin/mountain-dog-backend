import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Avatar } from "@material-ui/core";
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
          (type === "media"
            ? [
                {
                  field: "preview",
                  headerName: "preview",
                  width: 200,
                  renderCell: (params) => (
                    <Avatar variant="square" src={`https://alfie192345.s3.eu-west-2.amazonaws.com/thumbnails/${params.value}`} style={{ height: '100px', width: '100px' }} />
                  ),
                },
              ]
            : []
          )
            .concat([
              {
                field: "edit",
                headerName: "edit",
                width: 100,
                renderCell: (params) => (
                  <strong>
                    <Link to={`./${params.value}`} alt="edit">
                      <EditIcon />
                    </Link>
                  </strong>
                ),
              },
            ])
            .concat(
              Object.keys(results[0])
                .filter((d) => d !== "id")
                .map((d) => ({
                  field: d,
                  headerName: d,
                  width: 200,
                }))
            )
        );
        setRows(Object.values(results).map((d, i) => ({ ...d, edit: String(d.id), preview: type === "media" ? d.Path : null })));
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
