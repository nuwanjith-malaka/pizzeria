import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import PizzaCard from "../components/PizzaCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const PizzaList = () => {
const [Pizzas, setPizzas] = useState([]);

useEffect(() => {
    console.log('sending axios get request')
	axios
	.get('https://8cs5hz9ybb.execute-api.us-east-1.amazonaws.com/beta/pizza?type=list&item=pizza')
	.then(({ data }) => {
        console.log(data)
		setPizzas(data.content.Items);
	})
	.catch((error) => {
		console.log(error);
	});
}, []);

const Data = () => {
	return Pizzas.map((res, i) => {
	    return (
            <Grid item xs={12} sm={6} md={4} lg={3} key ={i}>
                <Item component={Card} variant="outlined"><PizzaCard  Pizza={res}  /></Item>
            </Grid>
        )   
	});
};

return (
    <>
    <Box >
        <Typography sx={{marginBottom:5}} variant="h4" component="div">
            Pizzas
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

export default PizzaList;
