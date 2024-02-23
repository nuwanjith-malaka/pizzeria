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

const Pizza = () => {

    const { State, setState } = useContext(Context)

    const alertHandleClose = () => {
            setState({...State , CurrentAlert:{ ...State.CurrentAlert, open: false }});
        };

    const navigate = useNavigate();

    const Pizza = State.CurrentPizza

    const deletePizza = () => {
        console.log("starting deletePizza method ->" , Pizza)
        axios
        .delete("https://8cs5hz9ybb.execute-api.us-east-1.amazonaws.com/beta/pizza", {params: {type:"item", item:"pizza", pk:`${Pizza.pk}`, sk:`${Pizza.sk}`}})
        .then((res) => {
          console.log("printing delete request response", res)
            setState(
                {...State ,
                  CurrentAlert:{ 
                    ...State.CurrentAlert,
                      open: true, 
                      type: 'success', 
                      content: res.data.msg
            }});
            navigate('/Pizza');
        })
        .catch(err => {
          console.log('catching delete request error', JSON.stringify(err, null, " "))
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
        <Typography variant="h3" component="div" gutterBottom>
          {Pizza.name}
        </Typography>
        <Link href="/">
          <Box
            component="img"
            max-width="100%" 
            height="100%" 
            padding="0" 
            margin="0" 
            alt="Logo"
            src={Pizza.image}
          />
        </Link>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {Pizza.pk}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {Pizza.description}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Starting from 
        </Typography>
        <Typography color="text.secondary" variant="h5">
          ${Pizza["starting price"]}
        </Typography>
        <Box display="flex" justifyContent="space-between" marginTop={5}>
          <Button
          component={Link} 
          to={"/edit-Pizza/" + Pizza.pk} 
          variant="contained" 
          color="primary"
          sx={{marginRight:2}}
        >
          Edit
        </Button>
        <Button 
            onClick={deletePizza}
            size="sm" 
            variant="contained"
            color="error"
        >
            Delete
        </Button>
        </Box>
        </Box>
      </Container>
    );
};

export default Pizza;
