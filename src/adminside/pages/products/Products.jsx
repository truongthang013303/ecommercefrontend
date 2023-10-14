import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DialogFormDynamic from "../../components/DialogFormDynamic";
import { createProduct, findProducts } from "../../../State/Product/Action";
import {
  filterCategories,
  getAllCategories,
} from "../../../State/Category/Action";

const columns = [
  //   { field: "id", headerName: "ID" },
  {
    field: "imageUrl",
    headerName: "ImageUrl",
    type: "text",
    headerAlign: "left",
    align: "left",
    flex: 1,
    renderCell: ({ row }) => {
      return <Avatar src={row.imageUrl} />;
    },
  },
  {
    field: "title",
    headerName: "Title",
    headerAlign: "left",
    align: "left",
    flex: 1,
    type: "text",
  },
  {
    field: "description",
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
];

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [pageState, setPageState] = useState({
    sort: null,
    pageNumber: 0,
    pageSize: 1,
  });

  const { product, category } = useSelector((store) => store);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const sizesOri = [
    { name: "S", quantity: 0 },
    { name: "M", quantity: 0 },
    { name: "L", quantity: 0 },
    { name: "XL", quantity: 0 },
  ];

  const [initStateFormikDialog, setInitStateFormikDialog] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    discountPercent: "",
    quantity: "",
    brand: "",
    color: "",
    // sizes: [
    //   { name: "S", quantity: 0 },
    //   { name: "M", quantity: 0 },
    //   { name: "L", quantity: 0 },
    //   { name: "XL", quantity: 0 },
    // ],
    imageUrl: "",
  });
  const additionalColsDataGrid = [
    {
      field: "category",
      headerName: "Category",
      type: "text",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
  ];

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
              sx={{
                background: `${colors.blueAccent[500]} !important`,
                marginLeft: "1em",
              }}
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
      discountedPrice: "",
      discountPercent: "",
      quantity: "",
      brand: "",
      color: "",
      // sizes: [
      //   { name: "S", quantity: 0 },
      //   { name: "M", quantity: 0 },
      //   { name: "L", quantity: 0 },
      //   { name: "XL", quantity: 0 },
      // ],
      imageUrl: "",
    });
    setOpen(false);
    setIsEdit(false);
  };
  const handleEditButton = (row) => {
    console.log("handleEditButton-row:", row);
    //Sizes missing. s,m,l missing xl => add it to row.sizes
    const rowSizesName = row.sizes.map((s) => s.name);
    const differ = sizesOri.filter((s) => !rowSizesName.includes(s.name));
    if (differ.length != 0) {
      row.sizes = [...row.sizes, ...differ];
    }
    setInitStateFormikDialog(row);
    setOpen(!open);
    setIsEdit(true);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageState({ ...pageState, pageSize: newPageSize });
  };

  const handlePageNumberChange = (newPage) => {
    setPageState({ ...pageState, pageNumber: newPage });
  };

  const handleFormSubmit = (values, isEdit) => {
    console.log(values);
    if (isEdit) {
      //   dispatch(updateUser(values));
    } else {
      //   dispatch(addUser(values));
      dispatch(
        createProduct({
          ...values,
          topLevelCategory: values.category.parentCategory.parentCategory.name,
          secondLevelCategory: values.category.parentCategory.name,
          thirdLevelCategory: values.category.name,
        })
      );
    }
    handleClose();
  };

  const handleDelete = (id) => {
    // dispatch(deleteUser(id));
  };

  const handleAddNew = () => {
    setOpen(true);
    setIsEdit(false);
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
          onClick={() => handleAddNew()}
        >
          Add New Product
        </Button>
      </div>
      {/* DataGridTable */}
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
        {console.log("datagrid")}
        <DataGrid
          rows={
            product?.products?.content == undefined
              ? [{ id: 1 }]
              : product?.products?.content
          }
          columns={[...columns, ...additionalColsDataGrid, actionColumn]}
          rowCount={
            product?.totalElements == undefined ? 0 : product.totalElements
          }
          loading={product?.loading}
          pagination
          page={pageState?.pageNumber}
          pageSize={pageState?.pageSize}
          paginationMode="server"
          onPageChange={(newPage) => handlePageNumberChange(newPage)}
          onPageSizeChange={(newPageSize) => handlePageSizeChange(newPageSize)}
          rowsPerPageOptions={[1, 2, 5, 10, 15, 50]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>

      {/* Formik Edit, Add */}
      <DialogFormDynamic
        open={open}
        onClose={handleClose}
        isEdit={isEdit}
        initStateFormikDialog={{
          ...initStateFormikDialog,
          categories: category.categories.filter((c) => c.level === 3),
        }}
        handleFormSubmit={handleFormSubmit}
        columns={[
          ...columns,
          {
            field: "sizes",
            headerName: "Sizes",
            type: "arrayProductSizes",
          },
          {
            field: "category",
            type: "selectCategoryProduct",
            headerName: "Category",
          },
        ]}
      />
    </div>
  );
};

export default Products;
