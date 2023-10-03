import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useMemo } from "react";
import { Button } from "@mui/material";
// import SearchBar from "material-ui-search-bar";

const columns = [
  { field: "id", headerName: "ID", width: 90, flex: 1 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
    flex: 1,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
    flex: 1,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
    flex: 1,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    flex: 1,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
const CustomToolbar = (props) => (
  <div>
    <GridToolbarContainer className="flex justify-between">
      {/* <GridToolbarColumnsButton /> */}
      <div><Button variant="contained">Add Product</Button></div>
      <SearchBar {...props}></SearchBar>
    </GridToolbarContainer>
    {/* <SearchBar {...props} /> */}
  </div>
);

export default function DataGridDemo() {
  const [sortModel, setSortModel] = useState([
    { field: "id", sort: "asc" },
  ]);
  const [searchText, setSearchText] = useState("");

  const onSortModelChangeHandler = (a) => {
    console.log(a);
    setSortModel(a);
  };

  // const requestSearch = (e) => {
  //   console.log(e);
  //   console.log(e.target.value);
  //   setSearchText(e.target.value);
  // };

  const requestSearchMeno = useMemo((e)=>(e)=>{
    //console.log(e);
    console.log(e.target.value);
    setSearchText(e.target.value);
  });

  const cancelSearch = () => {
    setSearchText("");
    //requestSearch(searchText);
  };
  return (
    <Box sx={{ height: '90vh', width: "100%" }}>
      <Box sx={{ border: "1px solid #DFDBDB" }}>
        <p className="text-4xl p-5">@mui/x-data-grid@5.17.26</p>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 15, 20]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        sortModel={sortModel}
        onSortModelChange={(newSortModel) =>
          onSortModelChangeHandler(newSortModel)
        }
        disableColumnFilter
        components={{ Toolbar: CustomToolbar }}
        componentsProps={{
          toolbar: {
            value: {searchText},
            onChange: (e) => requestSearchMeno(e),
            onCancelSearch: () => cancelSearch(),
          },
        }}
      />
    </Box>
  );
}
