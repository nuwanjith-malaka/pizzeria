import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

import PizzaCard from "../components/PizzaCard";
import Cart from "../components/Cart";

import { useContext } from 'react'
import { Context } from '../Context'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const PizzaList = () => {

    const { State, setState } = useContext(Context)
    const pizzas = State.Pizzas

    const Data = () => {
        if (pizzas){
            return pizzas.map((res, i) => {
                return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key ={i}>
                        <Item component={Card} variant="outlined"><PizzaCard  Pizza={res}  /></Item>
                    </Grid>
                )   
            });
        }
        return <Typography>There are no pizzas yet.</Typography>
            
    };

    return (
        <Grid
            container
            spacing={2}
            direction="row"
            sx={{marginTop:1}}
        >
            <Grid item xs={12} sm={12} md={8} lg={9}>
                <Box>
                    <Typography sx={{marginBottom:3, textAlign: 'center'}} variant="h4" component="div">
                        Pizzas
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1}}>
                    <Grid container spacing={2} >
                        {Data()}
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={0} sm={0} md={4} lg={3} >
                <Box
                    sx={{
                        display:{xs:'none', md:'flex'},
                        }}
                >
                    <Cart></Cart>
                </Box>
                
            </Grid>
        </Grid>
            
        

    );
};

export default PizzaList;
