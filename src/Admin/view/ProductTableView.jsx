import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { deleteProduct, findProducts } from "../../State/Product/Action";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../State/store";
import { Avatar, Button, Card, CardHeader } from "@mui/material";

const ProductTableView = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);

  useEffect(()=>{
    const data = {
      category: "Pants",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 0,
      pageSize: 10,
      stock: "",
    };
    dispatch(findProducts(data));
  }, [product.deletedProduct])


  return (
    <div className="p-5">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="Recent Products"></CardHeader>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {product?.products?.content?.slice(0, 5).sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt) ).map((row) => (
                <TableRow
                  key={row?.id+2}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar src={row?.imageUrl}></Avatar>
                  </TableCell>
                  <TableCell align="left">{row?.title}</TableCell>
                  <TableCell align="left">{row?.price}</TableCell>
                  <TableCell align="left">{row?.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};
export default ProductTableView;
