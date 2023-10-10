import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DialogFormDynamic from "../../components/DialogFormDynamic";
import { findProducts } from "../../../State/Product/Action";

const columns = [
//   { field: "id", headerName: "ID" },
  {
    field: "title",
    headerName: "Title",
    headerAlign: "left",
    align: "left",
    flex: 1,
    type: "text",
  },
  {
    field: "descrioption",
    headerName: "Description",
    headerAlign: "left",
    align: "left",
    flex: 1,
    type: "text",
  },
  {
    field: "price",
    headerName: "Price",
    type: "text",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
  {
    field: "discountedPrice",
    headerName: "Discounted Price",
    type: "text",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
  {
    field: "discountPercent",
    headerName: "discount Percent",
    type: "text",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "text",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
  {
    field: "brand",
    headerName: "Brand",
    type: "text",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
  {
    field: "color",
    headerName: "Color",
    type: "text",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
  {
    field: "size",
    headerName: "Size",
    type: "text",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
  {
    field: "imageUrl",
    headerName: "ImageUrl",
    type: "text",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    type: "text",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
];

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [pageState, setPageState] = useState({
    sort: null,
    pageNumber: 0,
    pageSize: 1,
  });

  const { product } = useSelector((store) => store);

  const [open, setOpen] = useState(false);
  const [initStateFormikDialog, setInitStateFormikDialog] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile:"",
    password:"",
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
  useEffect(() => {
    dispatch(findProducts(pageState));
    //use location.query
    //navigate()
  }, [pageState.pageSize, pageState.pageNumber]);

  const handleClose = () => {
    setInitStateFormikDialog({
      title: "",
      description: "",
      price: "",
      discountedPrice:"",
      discountPercent:"",
      quantity:"",
    });
    setOpen(false);
  };
  const handleEditButton = (row) => {
    setInitStateFormikDialog(row);
    setOpen(!open);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageState({ ...pageState, pageSize: newPageSize });
  };

  const handlePageNumberChange = (newPage) => {
    setPageState({ ...pageState, pageNumber: newPage });
  };

  const handleFormSubmit = (values, isEdit) => {
    if(isEdit){
    //   dispatch(updateUser(values));
    }else{
    //   dispatch(addUser(values));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    // dispatch(deleteUser(id));
  };

  return (
    <div className="h-4/5 w-full">
      {/* header of table */}
      <div className="flex justify-between items-center gap-5 m-5 space">
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          Products
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(true)}
        >
          Add New Product
        </Button>
      </div>

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
          rows={product?.products?.content==undefined?[{id:1}]:product?.products?.content}
          columns={[...columns, actionColumn]}
          rowCount={product?.totalElements==undefined?0:product.totalElements}
          loading={product?.loading}
          pagination
          page={pageState?.pageNumber}
          pageSize={pageState?.pageSize}
          paginationMode="server"
          onPageChange={(newPage) => handlePageNumberChange(newPage)}
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
          disableSelectionOnClick
          // disableRowSelectionOnClick
          // disableColumnFilter
          // disableDensitySelector
          // disableColumnSelector
        />
      </Box>

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

export default Products;
