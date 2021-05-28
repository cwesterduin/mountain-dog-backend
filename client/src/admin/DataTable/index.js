import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

export default function DataTable() {
    const rows = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'XGrid', col2: 'is Awesome' },
        { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
      ];
      
      const columns = [
        { field: 'col1', headerName: 'Column 1', flex: 1 },
        { field: 'col2', headerName: 'Column 2', flex: 1 },
      ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        checkboxSelection 
        columns={columns}
        rows={rows}/>
    </div>
  );
}
