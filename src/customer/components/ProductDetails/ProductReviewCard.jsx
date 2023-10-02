import React from 'react';
import { Avatar, Box, Grid, Rating } from '@mui/material';

const ProductReviewCard = () => {
    return (
        <div>
            <Grid container spacing={3} gap={3}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar className='text-white' sx={{width:56, height:56, bgcolor:'#9155fd'}}></Avatar>
                    </Box>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <div className="space-y-2">
                    <div>
                        <p className='font-semibold text-lg'>Raam</p>
                        <p className='opacity-70'>April 5, 2023</p>
                    </div>
                </div>

                <Rating value={4.5} name='half-rating' readOnly precision={.5}/>
                <p>nice product i love this shirt</p>
            </Grid>
        </div>
    );
};

export default ProductReviewCard;