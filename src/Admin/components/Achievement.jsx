import React from 'react';
import {Button, Card, CardContent, Typography, styled} from '@mui/material'

const TrignleImg = styled("img")({
    right:0,
    bottom:0,
    height: 170,
    position: "absolute"
})

const TropyImg = styled("img")({
    right: 36,
    bottom: 20,
    height: 98,
    position: 'absolute'
}) 

const Achievement = () => {
    return (
        <Card sx={{position:'relative'}}>
                <CardContent>
                    <Typography variant='h6' sx={{letterSpacing:'.25px'}}>
                        Shop With Me    
                    </Typography>

                    <Typography variant='body2'>Congratulations</Typography>
                    <Typography variant='h5' sx={{my: 3.1}}> 420.8k</Typography>
                    <Button size='small' variant='contained'>View Sales</Button>
                    <TrignleImg src=''></TrignleImg>
                    <TropyImg src='https://shopwithzosh.vercel.app/images/misc/trophy.png'></TropyImg>
                </CardContent>
        </Card>
    );
};

export default Achievement;