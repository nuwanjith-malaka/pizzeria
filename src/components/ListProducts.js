import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import ProductCard from "./ProductCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const ProductList = () => {
const [Products, setProducts] = useState([]);

useEffect(() => {
	axios
	.get('https://s1fc10ik12.execute-api.us-east-1.amazonaws.com/stage1/products')
	.then(({ data }) => {
		setProducts(data.Items);
        console.log(data)
	})
	.catch((error) => {
		console.log(error);
	});
}, []);

const Data = () => {
	return Products.map((res, i) => {
	    return (
            <Grid item xs={12} sm={6} md={4} lg={3} key ={i}>
                <Item component={Card} variant="outlined"><ProductCard  product={res}  /></Item>
            </Grid>
        )   
	});
};

return (
    <>
    <Box sx={{mb:'30px'}}>
        <Typography variant="h4" component="div">
            Product List
        </Typography>
    </Box>
    
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} >
            {Data()}
        </Grid>
    </Box>
    </>
    

);
};

export default ProductList;
