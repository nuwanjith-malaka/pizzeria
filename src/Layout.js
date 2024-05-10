import React from "react";
import {Outlet} from "react-router-dom";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import { Context } from "./Context";

import FormAlert from "./components/FormAlert";


const Layout = () => {

    const [State, setState] = React.useState({
        Pizzas:[],
        Extras:[],
        CurrentAlert: {
            open: false,
            vertical: 'top',
            horizontal: 'center',
            type: '',
            content : ''
        },
        CartItems: [],
        TotalPrice:0,
        User:'guest',
        DialogOpen:false
	}); 

    const alertHandleClose = () => {
      setState({
        ...State,
          CurrentAlert: {
            ...State.CurrentAlert, open: false
          }
      });
    };

 return (
 <>
 <Context.Provider value={{ State, setState }}>
  <AppBar />
  <Container sx={{paddingRight: '0px',marginRight:'0px'}} maxWidth='xl'>
    <CssBaseline/>
    <FormAlert
      handleClose = {alertHandleClose}
      AlertState = {State.CurrentAlert}
    >
    </FormAlert>
    <Outlet />
    <Footer />
    </Container>
 </Context.Provider>

 </>
 );
};

export default Layout;