import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  useTheme
} from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { getUsersPagi } from "../../../State/Admin/User/Action";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  //Get State of Store
  const { adminUser } = useSelector((store) => store);
  //State of dataGridTable
  const [pageState, setPageState] = useState({
    sort: null,
    pageNumber: 0,
    pageSize: 2,
  });

  //Get rows from server stored in redux: adminOrder
  useEffect(() => {
    // dispatch(getOrders());
    dispatch(getUsersPagi(pageState));
    //use location.query
    //navigate()
  }, [
    pageState.pageNumber,
    pageState.pageSize,
  ]);

  //Delete button
  const handleDelete = (id) => {
    // dispatch(deleteOrder(id));
    // handleClose();
  };
  //PageNumber Change
  const handlePageChange = (newPage) => {
    console.log(newPage);
    setPageState({ ...pageState, pageNumber: newPage });
  };

  //PageSize Change
  const handlePageSizeChange = (newPageSize) => {
    console.log(newPageSize);
    setPageState({ ...pageState, pageSize: newPageSize });
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "firstName",
      headerName: "First Name",
      headerAlign: "left",
      align: "left",
      flex: 1
    },
    {
      field: "lastName",
      headerName: "Last Name",
      headerAlign: "left",
      align: "left",
      flex: 1
    },
    {
      field: "mobile",
      headerName: "Mobile",
      type: "tel",
      headerAlign: "left",
      align: "left",
      flex: 1
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      headerAlign: "left",
      align: "left",
      flex: 1
    },
   {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Button
            variant="outlined"
            sx={{ background: `${colors.blueAccent[500]} !important` }}
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="5px 20px 0px">
      <Header title="Users" subtitle="Managing the users" />
      <Box
        m="1em 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={adminUser?.users}
          rowCount={adminUser?.totalElements}
          loading={adminUser?.loading}
          columns={columns}
          rowsPerPageOptions={[1, 2, 5, 10, 15, 50]}
          onPageChange={(newPage) => handlePageChange(newPage)}
          onPageSizeChange={(newPageSize) => handlePageSizeChange(newPageSize)}
          pagination
          page={pageState.pageNumber}
          pageSize={pageState.pageSize}
          paginationMode="server"
        />
      </Box>
    </Box>
  );
};
export default Users;
