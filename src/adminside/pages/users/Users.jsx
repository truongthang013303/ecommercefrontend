import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, getUsersPagi, updateUser } from "../../../State/Admin/User/Action";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Form from "../form";
import { tokens } from "../../../theme";
import { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DialogFormDynamic from "../../components/DialogFormDynamic";
// import { useQuery } from "@tanstack/react-query";

const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "firstName",
    headerName: "First Name",
    headerAlign: "left",
    align: "left",
    flex: 1,
    type: "text",
  },
  {
    field: "lastName",
    headerName: "Last Name",
    headerAlign: "left",
    align: "left",
    flex: 1,
    type: "text",
  },
  {
    field: "mobile",
    headerName: "Mobile",
    type: "text",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    type: "email",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
  {
    field: "password",
    headerName: "Password",
    type: "password",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
];

const fields = [
  {
    field: "firstName",
    name: "First Name",
    type: "text",
    variant: "filled",
    girdColumn: "span 2",
  },
  {
    field: "lastName",
    name: "Last Name",
    type: "text",
    variant: "filled",
    girdColumn: "span 2",
  },
];

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { adminUser } = useSelector((store) => store);

  const [open, setOpen] = useState(false);
  const [initStateFormikDialog, setInitStateFormikDialog] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile:"",
    password:"",
    // contact: "",
    // address1: "",
    // address2: "",
  });
  const [pageState, setPageState] = useState({
    sort: null,
    pageNumber: 0,
    pageSize: 1,
  });

  const actionColumn = useMemo(
    () => ({
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: ({ row }) => {
        return (
          <div className="action">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleEditButton(row)}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              sx={{ background: `${colors.blueAccent[500]} !important` , marginLeft: '1em'}}
              onClick={() => handleDelete(row.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    }),
    []
  );

  const isEdit = useMemo(
    (initStateFormikDialog) => (initStateFormikDialog) => {
      const keys1 = Object.keys(initStateFormikDialog);
      for (let key of keys1) {
        if (initStateFormikDialog[key] !== "") {
          return true;
        }
      }
      return false;
    },
    []
  );

  useEffect(() => {
    dispatch(getUsersPagi(pageState));
    //use location.query
    //navigate()
  }, [pageState.pageSize, pageState.pageNumber]);

  const handleClose = () => {
    setInitStateFormikDialog({
      firstName: "",
      lastName: "",
      email: "",
      mobile:"",
      password:"",
      // contact: "",
      // address1: "",
      // address2: "",
    });
    setOpen(false);
  };

  // const getRowFromChildrenDataTable = (row) => {
  //   console.log("row from child DataTable.jsx:", row);
  //   setInitStateFormikDialog(row);
  //   setOpen(!open);
  // };
  const handleEditButton = (row) => {
    console.log("row from handleEditButton:", row);
    setInitStateFormikDialog(row);
    setOpen(!open);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageState({ ...pageState, pageSize: newPageSize });
  };

  const handlePageChange = (newPage) => {
    setPageState({ ...pageState, pageNumber: newPage });
  };

  const handleFormSubmit = (values, isEdit) => {
    console.log('handleFormSubmit-Users.jsx:', values);
    console.log('isEdit:', isEdit);
    if(isEdit){
      dispatch(updateUser(values));
    }else{
      dispatch(addUser(values));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    console.log('handleDelete', id);
  };
  return (
    <div className="users h-4/5 w-full">
      {/* header of table */}
      <div className="info">
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          Users
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(true)}
        >
          Add New User
        </Button>
      </div>

      {/* DataGrid Table */}
      {/* <DataTable
        slug="users"
        columns={columns}
        rows={adminUser?.users}
        getRowFromChildrenDataTable={getRowFromChildrenDataTable}
      /> */}
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
          className="dataGrid"
          rows={adminUser?.users}
          columns={[...columns, actionColumn]}
          rowCount={adminUser?.totalElements}
          loading={adminUser?.loading}
          pagination
          page={adminUser?.pageNumber}
          pageSize={adminUser?.pageSize}
          paginationMode="server"
          onPageChange={(newPage) => handlePageChange(newPage)}
          onPageSizeChange={(newPageSize) => handlePageSizeChange(newPageSize)}
          rowsPerPageOptions={[1, 2, 5, 10, 15, 50]}

          // onSelectionModelChange={(ids) => {
          //   const selectedIDs = new Set(ids);
          //   const selectedRowData = adminUser?.users.filter((row) =>
          //     // if id of row is number, convert to String row.id.toString()
          //     selectedIDs.has(row.id)
          //   );
          //   console.log(
          //     "selectedRowData-onSelectionModelChange:",
          //     selectedRowData
          //   );
          // }}

          // slots={{ toolbar: GridToolbar }}
          // slotProps={{
          //   toolbar: {
          //     showQuickFilter: true,
          //     quickFilterProps: { debounceMs: 500 },
          //   },
          // }}
          checkboxSelection
          // disableRowSelectionOnClick
          // disableColumnFilter
          // disableDensitySelector
          // disableColumnSelector
        />
      </Box>

      {/* Dialog */}
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isEdit(initStateFormikDialog) == true ? "Update" : "Add New User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Form
            initialValues={initStateFormikDialog}
            handleFormSubmit={handleFormSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog> */}

      <DialogFormDynamic
        open={open}
        onClose={handleClose}
        initStateFormikDialog={initStateFormikDialog}
        handleFormSubmit={handleFormSubmit}
        columns={columns}
      />
    </div>
  );
};

export default Users;
