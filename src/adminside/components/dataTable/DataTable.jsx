import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { number } from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Form from "../../pages/form";
import { useState } from "react";

const DataTable = (props) => {
  const [open, setOpen] = useState(false);
  const [initStateFormikDialog, setInitStateFormikDialog] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClick = (row)=>{
      setInitStateFormikDialog(row);
      setOpen(!open);
  }
  const handleDelete = (id) => {
    //delete the item
    // mutation.mutate(id)
  };

  // const actionColumn= {
  //   field: "action",
  //   headerName: "Action",
  //   width: 200,
  //   renderCell: (params) => {
  //     return (
  //       <div className="action">
  //         <Link to={`/${props.slug}/${params.row.id}`}>
  //           <img src="/view.svg" alt="" />
  //         </Link>
  //         <div className="delete" onClick={() => handleDelete(params.row.id)}>
  //           <img src="/delete.svg" alt="" />
  //         </div>
  //       </div>
  //     );
  //   },
  // };
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: ({ row }) => {
      return (
        <div className="action">
          {/* cach 3 */}
          {/* <Button variant="contained" color="secondary" onClick={()=>handleEditClick(row)}>
            Edit
          </Button> */}

          {/* cach 1 */}
          <Button variant="contained" color="secondary" onClick={()=>props.getRowFromChildrenDataTable(row)}>
            Edit
          </Button>
        </div>
      );
    },
  };
  return (
    <div className="dataTable w-full h-full">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        // rowCount={adminUser?.totalElements}
        rowsPerPageOptions={[1, 2, 5, 10, 15, 50]}
        // onSelectionModelChange={(ids) => {
        //   console.log(ids);}}

        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = props.rows.filter((row) =>
            // if id of row is number, convert to String row.id.toString()
            selectedIDs.has(row.id)
          );
          console.log('selectedRowData-onSelectionModelChange:',selectedRowData);
        }}
        // page={pageState.pageNumber}
        // pageSize={pageState.pageSize}
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 10,
        //     },
        //   },
        // }}

        // slots={{ toolbar: GridToolbar }}
        // slotProps={{
        //   toolbar: {
        //     showQuickFilter: true,
        //     quickFilterProps: { debounceMs: 500 },
        //   },
        // }}
        // pageSizeOptions={[5]}
        checkboxSelection
        // disableRowSelectionOnClick
        // disableColumnFilter
        // disableDensitySelector
        // disableColumnSelector
      />

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Form initialValues={initStateFormikDialog}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
