import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../State/store";
import {confirmOrder, deleteOrder, deleveredOrder, getOrders, shipOrder } from "../../State/Admin/Order/Action";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const OrdersTable = () => {
  const [anchorEl, setAnchorEl] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };
  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };


  const dispatch = useDispatch();

  const { adminOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrders());
  }, [adminOrder.confirmed, adminOrder.shipped, adminOrder.delivered, adminOrder.deletedOrder]);
  const handleProductDelete = (orderId) => {};

  const handleShippedOrder = ((orderId)=>{
    dispatch(shipOrder(orderId));
    handleClose();
  })
  const handleConfirmOrder = ((orderId)=>{
    dispatch(confirmOrder(orderId));
    handleClose();
  })
  const handleDeleveredOrder= ((orderId)=>{
    dispatch(deleveredOrder(orderId));
    handleClose();
  })
  const handleDeleteOrder = ((orderId)=>{
    dispatch(deleteOrder(orderId));
    handleClose();
  })

  return (
    <div className="p-5">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="All Orders"></CardHeader>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Total Items</TableCell>
                <TableCell align="left">Total Price</TableCell>
                <TableCell align="left">Total Discounted Price</TableCell>
                <TableCell align="left">Discounte</TableCell>
                <TableCell align="left">User email</TableCell>
                <TableCell align="left">Street Address</TableCell>
                <TableCell align="left">Order Status</TableCell>
                <TableCell align="left">Created At</TableCell>
                <TableCell align="left">Action Status</TableCell>
                <TableCell align="left">Update</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {adminOrder?.orders?.map((row, index) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row?.id}</TableCell>
                  <TableCell align="left">
                    <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                      {row.orderItems?.map((orderItem) => (
                        <Avatar
                          src={orderItem.product?.imageUrl}
                          key={orderItem.id}
                        ></Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="left">
                    {row.orderItems?.map((orderItem) => (
                      <p key={orderItem.id + 1}>{orderItem.product?.title},</p>
                    ))}
                  </TableCell>
                  <TableCell align="left">{row?.totalItem}</TableCell>
                  <TableCell align="left">{row?.totalPrice}</TableCell>
                  <TableCell align="left">
                    {row?.totalDiscountedPrice}
                  </TableCell>
                  <TableCell align="left">{row?.discounte}</TableCell>
                  <TableCell align="left">{row?.user?.email}</TableCell>
                  <TableCell align="left">
                    {row?.shippingAddress?.streetAddress}
                  </TableCell>
                  <TableCell align="left">
                        <span className={`text-white px-5 py-2 rounded-full ${row?.orderStatus==='CONFIRMED'?'bg-[#369236]': row.orderStatus==='SHIPPED'?'bg-[#4141ff]': row.orderStatus==='PLACED'?'bg-[#02B290]' : 'bg-[gray]'}`}>{row?.orderStatus}</span>
                  </TableCell>
                  <TableCell align="left">{row?.createAt}</TableCell>
                  <TableCell align="left">{row?.orderDate}</TableCell>
                  <TableCell align="left">
                    <Button
                      id="basic-button"
                      aria-haspopup="true"
                      onClick={(event)=>handleClick(event, index)}
                      aria-controls={`basic-menu-${row.id}`}
                      aria-expanded={Boolean(anchorEl[index])}
                    >
                      Status
                    </Button>
                    <Menu
                      id={`basic-menu-${row.id}`}
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={()=>handleClose(index)}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={()=>handleConfirmOrder(row.id)}>Confirmed Order</MenuItem>
                      <MenuItem onClick={()=>handleShippedOrder(row.id)}>Shipped Order</MenuItem>
                      <MenuItem onClick={()=>handleDeleveredOrder(row.id)}>Delivered Order</MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteOrder(row?.id)}

                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};
export default OrdersTable;
