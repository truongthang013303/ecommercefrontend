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

const OrderTableView = () => {
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
        <CardHeader title="Orders Recent"></CardHeader>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Total Discounted Price</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {adminOrder?.orders?.sort((a,b) => Date.parse(b.orderDate) - Date.parse(a.orderDate)).map((row, index) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
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
                  <TableCell align="left">
                    {row?.totalDiscountedPrice}
                  </TableCell>
                  <TableCell align="left">
                        <span className={`text-white px-5 py-2 rounded-full ${row?.orderStatus==='CONFIRMED'?'bg-[#369236]': row.orderStatus==='SHIPPED'?'bg-[#4141ff]': row.orderStatus==='PLACED'?'bg-[#02B290]' : 'bg-[gray]'}`}>{row?.orderStatus}</span>
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
export default OrderTableView;
