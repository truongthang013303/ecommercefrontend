import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  useTheme,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { findProducts } from "../../../State/Product/Action";
import store from '../../../State/store';

const Product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  //Get State of Store
  const { product } = useSelector((store) => store);
  //State of dataGridTable
  const [pageState, setPageState] = useState({
    sort: null,
    pageNumber: 0,
    pageSize: 2,
  });

  //Get rows from server
  useEffect(() => {
    dispatch(findProducts(pageState));
  }, [
    pageState.pageNumber,
    pageState.pageSize,
  ]);
  //Approach 2: fetch data from api stored in state and rerender with new state
  // const [pageData, setPageData]=useState({
  //   data:[],
  //   totalElements:0,
  //   pageNumber: 0,
  //   pageSize: 2,  
  // })
  // useEffect(()=>{
  //   const fetchData=async()=>{
  //     const res = await fetch(`http://localhost:5454/api/products`);
  //     const json = await res.json();
  //     console.log(json);
  //     setPageData({...pageData, data:json.content, totalElements:json.totalElements})
  //   }
  //   fetchData();
  // },[pageData.pageNumber, pageData.pageSize])

  //Approach 3: Async/await like Promise
  //   useEffect(()=>{
  //   const fetchData=async()=>{
  //     const res = await fetch(`http://localhost:5454/api/products`);
  //     const json = await res.json();
  //     return json;
  //   }
  //   fetchData().then(data=>setPageData({...pageData, data:json.content, totalElements:json.totalElements}));
  // },[pageData.pageNumber, pageData.pageSize])

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
  const handleDelete = (id)=>{
    
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "imageUrl",
      headerName: "Image",
      flex: 1,
      renderCell: ({ row: { id, imageUrl } }) => {
        return (
              <Avatar
                src={imageUrl}
                key={id}
              ></Avatar>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      headerAlign: "left",
      align: "left",
      renderCell: ({row:{price}}) => (
        <Typography color={colors.greenAccent[500]}>
          ${price}
        </Typography>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: ({ row: { category } }) => {
        return <>{category?.name}</>;
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
      <Header title="Products" subtitle="Managing the products" />
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
        {/* Trong trường hợp gọi api bị lỗi product.products sẽ không chứa 1 object {content:[], totalElements:4, pageSize:2, totalPage:2} từ api trả về
        để cta .content lấy ra 1 mảng obj project gán cho rows của DataGrid. Mà nó sẽ NOT Present sẽ gây lỗi
        vì thế nếu lỗi cta trả ra 1 mảng chứa 1 object rỗng
        Có thể sửa lại trong Product Reducer: mặc định gán giá trị .products=[] .totalElements=0
        lúc này khi gọi api lỗi vẫn Present giá trị của .products=[] gán cho rows, .totalElement=0 gán cho rowCount
        tuy nhiên do liên quán đến xử lý bên customer page nên tạm thời không đụng đến 
        Hoặc dùng fetch gọi API sau khi thành công lưu lại giá trị vào state, setState lại cho compoment
        lúc này sau khi lấy dữ liệu từ API thành công compo sẽ rerender với giá trị mới thay vì giá trị rỗng ban đầu trong state 
        */}
        <DataGrid
          checkboxSelection
          rows={product?.products?.content==undefined?[{id:0}]:product?.products?.content}
          rowCount={product?.products?.totalElements==undefined?0:product?.products?.totalElements}
          loading={product?.loading}
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
export default Product;
