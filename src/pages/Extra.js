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

const Extra = () => {

    const { State, setState } = useContext(Context)

    const alertHandleClose = () => {
            setState({...State , CurrentAlert:{ ...State.CurrentAlert, open: false }});
        };

    const navigate = useNavigate();

    const Extra = State.CurrentExtra

    const deleteExtra = () => {
        console.log("starting deleteExtra method ->" , Extra)
        axios
        .delete("https://8cs5hz9ybb.execute-api.us-east-1.amazonaws.com/beta/extra", {params: {type:"item", item:"extra", pk:`${Extra.pk}`, sk:`${Extra.sk}`}})
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
            navigate('/Extra');
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
      <Box sx={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
        <FormAlert
        handleClose = {alertHandleClose}
        AlertState = {State.CurrentAlert}
        >
        </FormAlert>
        <Typography variant="h4" component="div" gutterBottom>
          {Extra.name}
        </Typography>
        <Link href="/">
          <Box
            component="img"
            max-width="100%" 
            height="100%" 
            padding="0" 
            margin="0" 
            alt="Logo"
            src={Extra.image}
          />
        </Link>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {Extra.pk}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {Extra.description}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Starting from 
        </Typography>
        <Typography color="text.secondary" variant="h5">
          ${Extra["starting price"]}
        </Typography>
        <Box display="flex" justifyContent="space-between" marginTop={5}>
          <Button
          component={Link} 
          to={"/edit-Extra/" + Extra.pk} 
          variant="contained" 
          color="primary"
          sx={{marginRight:2}}
        >
          Edit
        </Button>
        <Button 
            onClick={deleteExtra}
            size="sm" 
            variant="contained"
            color="error"
        >
            Delete
        </Button>
        </Box>
        </Box>
    );
};

export default Extra;