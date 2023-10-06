import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deleveredOrder,
  getOrdersPagi,
  shipOrder,
} from "../../../State/Admin/Order/Action";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  //Get State of Store:adminOrder
  const { adminOrder } = useSelector((store) => store);
  //State of dataGridTable
  const [pageState, setPageState] = useState({
    sort: null,
    pageNumber: 0,
    pageSize: 2,
  });

  const [anchorEl, setAnchorEl] = useState([]);
  const open = Boolean(anchorEl);
  //Ban đầu mảng phần tử neo =[] sau mỗi lần click Button sẽ được thêm vào mảng phẩn tử neo ở vị trí 0,1,2... tương ứng với
  //đó là MenuItem có phần tử neo = vị trí 0,1,2... trong mảng vd như Menu0 có phần tử neo index=0
  //Rerender lại tìm thấy phần tử neo của MenuItem và open=true sẽ bật ra
  //Khi close MenuItem sẽ tìm kiếm trog mảng phần tử neo, phần tử nào là phần tử neo của Menu đang muốn đóng, là phần tử có index=index của anchorElement của MenuItem đang muốn đóng và set lại=null
  //Rerender lại lúc này MenuItem sẽ khôg tìm thấy phần tử neo của mình và open=false sẽ đóng menu lại
  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };

  //Close MenuItem
  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };
  //Get rows from server stored in redux: adminOrder
  useEffect(() => {
    // dispatch(getOrders());
    dispatch(getOrdersPagi(pageState));
    //use location.query
    //navigate()
  }, [
    adminOrder.confirmed,
    adminOrder.shipped,
    adminOrder.delivered,
    adminOrder.deletedOrder,
    pageState.pageNumber,
    pageState.pageSize,
  ]);

  //Item Button Shipped
  const handleShippedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    handleClose();
  };
  //Item Button Confirmed
  const handleConfirmOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
    handleClose();
  };
  //Item Button Delivered
  const handleDeleveredOrder = (orderId) => {
    dispatch(deleveredOrder(orderId));
    handleClose();
  };
  //Delete button
  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
    handleClose();
  };
  //PageNumber Change
  const handlePageChange = (newPage) => {
    console.log(newPage);
    setPageState({ ...pageState, pageNumber: newPage });
  };

  // const handlePaginationChange = (event, value) => {
  //   const searchParamms = new URLSearchParams(location.search);
  //   searchParamms.set("page", value);
  //   const query = searchParamms.toString();
  //   navigate({ search: `?${query}` });
  // };
  //PageSize Change
  const handlePageSizeChange = (newPageSize) => {
    console.log(newPageSize);
    setPageState({ ...pageState, pageSize: newPageSize });
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: ({ row: { orderItems } }) => {
        return (
          <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
            {orderItems?.map((orderItem) => (
              <Avatar
                src={orderItem.product?.imageUrl}
                key={orderItem.id}
              ></Avatar>
            ))}
          </AvatarGroup>
        );
      },
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "userEmail",
      headerName: "User Email",
      flex: 1,
      renderCell: ({ row: { user } }) => {
        return <>{user?.email}</>;
      },
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
      // obj:{id:1, field:'status', row:{}, rowNode:{}, colDef:{}, api:{}, cellMode:'view', formattedValue:, getValue:()=>{}, hasFocus:false, isEditable:false, tabIndex:-1, value:}
      renderCell: (obj) => {
        var rowIndex = obj.api.getRowIndex(obj.row.id);
        var orderId = obj.row.id;
        return (
          <>
            <Button
              sx={{ background: `${colors.blueAccent[500]} !important` }}
              id="basic-button"
              aria-haspopup="true"
              onClick={(event) => handleClick(event, rowIndex)}
              aria-controls={`basic-menu-${rowIndex}`}
              aria-expanded={Boolean(anchorEl[rowIndex])}
            >
              {obj.row.orderStatus}
            </Button>
            <Menu
              id={`basic-menu-${rowIndex}`}
              anchorEl={anchorEl === null ? null : anchorEl[rowIndex]}
              open={Boolean(anchorEl[rowIndex])}
              onClose={() => handleClose(rowIndex)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleConfirmOrder(orderId)}>
                Confirmed Order
              </MenuItem>
              <MenuItem onClick={() => handleShippedOrder(orderId)}>
                Shipped Order
              </MenuItem>
              <MenuItem onClick={() => handleDeleveredOrder(orderId)}>
                Delivered Order
              </MenuItem>
            </Menu>
          </>
        );
      },
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
            onClick={() => handleDeleteOrder(id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <Box m="5px 20px 0px">
      <Header title="Orders" subtitle="Managing the orders" />
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
          rows={adminOrder?.orders}
          rowCount={adminOrder?.totalElements}
          loading={adminOrder?.loading}
          columns={columns}
          rowsPerPageOptions={[1, 5, 10, 15, 50]}
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
export default Orders;
