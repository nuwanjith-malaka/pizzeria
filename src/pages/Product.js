import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import {Link, Routes, Route, useNavigate, useLocation} from 'react-router-dom';

import { useContext } from 'react'
import { Context } from '../Context'

import FormAlert from "../components/FormAlert";

const Product = () => {

    const { State, setState } = useContext(Context)

    const alertHandleClose = () => {
            setState({...State , CurrentAlert:{ ...State.CurrentAlert, open: false }});
        };

    const navigate = useNavigate();

    const product = State.CurrentProduct

    const deleteProduct = () => {

        axios
        .delete(`https://s1fc10ik12.execute-api.us-east-1.amazonaws.com/stage1/products/${product.id}`)
        .then((res) => {
            console.log(res)
            setState(
                {...State ,
                  CurrentAlert:{ 
                    ...State.CurrentAlert,
                      open: true, 
                      type: 'success', 
                      content: res.data 
            }});
            navigate('/');
        })
        .catch(err => {
            console.log(err)
            setState(
                {...State ,
                  CurrentAlert:{ 
                    ...State.CurrentAlert,
                      open: true, 
                      type: 'error', 
                      content: err.message
                }});
        })
    };

    return (
        <Container>
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <FormAlert
        handleClose = {alertHandleClose}
        AlertState = {State.CurrentAlert}
        >
        </FormAlert>
        <Typography variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {product.id}
        </Typography>
        <Typography variant="body2">
          {product.description}
        </Typography>
        <Typography color="text.secondary">
          ${product.price}
        </Typography>
        <Link 
            className="edit-link"
            to={"/edit-product/" + product.id}
        >
            Edit
        </Link>
        <Button 
            onClick={deleteProduct}
            size="sm" 
            variant="danger"
        >
            Delete
        </Button>
        </Box>
      </Container>
    );
};

export default Product;
