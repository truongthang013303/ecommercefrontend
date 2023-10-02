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

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);

  // useEffect(() => {
  //   const data = {
  //     category: "Pants",
  //     colors: [],
  //     sizes: [],
  //     minPrice: 0,
  //     maxPrice: 100000000,
  //     minDiscount: 0,
  //     sort: "price_low",
  //     pageNumber: 1,
  //     pageSize: 2,
  //     stock: "",
  //   };
  //   dispatch(findProducts(data));
  // }, [product.deletedProduct]);

  useEffect(()=>{
    const data = {
      category: "Pants",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 1,
      pageSize: 2,
      stock: "",
    };
    dispatch(findProducts(data));
  }, [product.deletedProduct])

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div className="p-5">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="All Products"></CardHeader>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Id</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Brand</TableCell>
                <TableCell align="left">Color</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Discounted Price</TableCell>
                <TableCell align="left">Discount Percent</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Created At</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {product?.products?.content?.map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar src={row?.imageUrl}></Avatar>
                  </TableCell>
                  <TableCell align="left">{row?.id}</TableCell>
                  <TableCell align="left">{row?.title}</TableCell>
                  <TableCell align="left">{row?.category?.name}</TableCell>
                  <TableCell align="left">{row?.brand}</TableCell>
                  <TableCell align="right">{row?.color}</TableCell>
                  <TableCell align="left">{row?.price}</TableCell>
                  <TableCell align="left">{row?.discountedPrice}</TableCell>
                  <TableCell align="left">{row?.discountPercent}</TableCell>
                  <TableCell align="left">{row?.quantity}</TableCell>
                  <TableCell align="left">{row?.createdAt}</TableCell>
                  <TableCell align="left">{row?.description}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      onClick={() => handleProductDelete(row?.id)}
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
export default ProductsTable;
