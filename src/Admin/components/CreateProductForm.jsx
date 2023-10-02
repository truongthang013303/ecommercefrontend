import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../State/Product/Action';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const initialSizes=[
    {name:'S', quantity:0},
    {name:'M', quantity:0},
    {name:'L', quantity:0}
]

const CreateProductForm = () => {
    const [productData, setProductData] = useState({
        imageUrl:'',
        brand:'',
        title:'',
        color:'',
        discountedPrice:'',
        price:'',
        discountPercent:'',
        size: initialSizes,
        quantity:'',
        topLevelCategory:'',
        secondLevelCategory:'',
        thirdLevelCategory:'',
        description:'',


    })

    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');

    const handleChange=(e)=>{
        const {name, value} = e.target;
        setProductData((prevState)=>({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSizeChange = (e, index)=>{
        let {name, value} = e.target;
        name==='size_quantity'?name='quantity':name=e.target.name;

        const sizes=[...productData.size];

        sizes[index][name]=value;

        setProductData((prevState)=>({
            ...prevState,
            size: sizes
        }))
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(createProduct({data: productData, jwt}));
        console.log(productData);
    }

    return (
        <div className='p-10'>
            <Typography variant='h3' sx={{textAlign:'center'}} className='py-10 text-center'>
                Add New Product
            </Typography>

            <form onSubmit={(e)=>handleSubmit(e)} className='min-h-screen'>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth label='Image URL' name='imageUrl' value={productData.imageUrl} onChange={(e)=>handleChange(e)}>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Brand' name='brand' value={productData.brand} onChange={(e)=>handleChange(e)}>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Title' name='title' value={productData.title} onChange={(e)=>handleChange(e)}>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Color' name='color' value={productData.color} onChange={(e)=>handleChange(e)}>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Quantity' name='quantity' value={productData.quantity} onChange={(e)=>handleChange(e)} type='number'>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth label='Price' name='price' value={productData.price} onChange={(e)=>handleChange(e)} type='number'>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth label='Discounted Price' name='discountedPrice' value={productData.discountedPrice} onChange={(e)=>handleChange(e)} type='number'>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField fullWidth label='Discount Percent' name='discountPercent' value={productData.discountPercent} onChange={(e)=>handleChange(e)} type='number'>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Top Level Category</InputLabel>
                        <Select name='topLevelCategory' value={productData.topLevelCategory} onChange={(e)=>handleChange(e)} label='Top Level Category'>
                            <MenuItem value='men'>Men</MenuItem>
                            <MenuItem value='woman'>Woman</MenuItem>
                            <MenuItem value='kids'>Kids</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Second Level Category</InputLabel>
                        <Select name='secondLevelCategory' value={productData.secondLevelCategory} onChange={(e)=>handleChange(e)} label='Second Level Category'>
                            <MenuItem value='clothing'>clothing</MenuItem>
                            <MenuItem value='accessories'>accessories</MenuItem>
                            <MenuItem value='brands'>brands</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Third Level Category</InputLabel>
                        <Select name='thirdLevelCategory' value={productData.thirdLevelCategory} onChange={(e)=>handleChange(e)} label='Third Level Category'>
                            <MenuItem value='top'>Top</MenuItem>
                            <MenuItem value='women_dress'>Women Dress</MenuItem>
                            <MenuItem value='t-shirts'>T-Shirts</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField fullWidth label='Description' id='outlined-multiline-static' multiline rows={3} name='description' value={productData.description} onChange={(e)=>handleChange(e)}>
                    </TextField>
                </Grid>

                {productData.size.map((size, index)=>(
                    <Grid container item spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField label='Size Name' name='name' value={size.name} onChange={(e)=>handleSizeChange(e, index)} required fullWidth></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label='Quantity' name='size_quantity' onChange={(e)=>handleSizeChange(e, index)} required fullWidth type='number'></TextField>
                        </Grid>
                    </Grid>  
                ))}

                <Grid item xs={12} sm={6}>
                    <Button variant='contained' sx={{p:1.8}} className='py-20' size='large' type='submit'>Add New Product</Button>
                </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default CreateProductForm;