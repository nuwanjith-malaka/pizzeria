import React from "react";
import {Outlet} from "react-router-dom";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import { Context } from "./Context";

import FormAlert from "./components/FormAlert";
import Cart from "./components/Cart";

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
        CartItems: []
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
  <Container sx={{paddingRight: '0px',marginRight:'0px', border:'5px solid'}} maxWidth='xl'>
    <CssBaseline/>
    <FormAlert
      handleClose = {alertHandleClose}
      AlertState = {State.CurrentAlert}
    >
    </FormAlert>
    <Grid
      container
      spacing={2}
      direction="row"
      sx={{marginTop:1}}
    >
      <Grid sx={{border:'1px solid'}} item xs={12} sm={12} md={8} lg={9}>
        <Outlet />
      </Grid>
      <Grid id='cart' sx={{border:'1px solid'}} item xs={0} sm={0} md={4} lg={3} >
          <Cart 
            cartItems={State.CartItems}
          ></Cart>
      </Grid>
    </Grid>
    <Footer />
    </Container>
 </Context.Provider>

 </>
 );
};

export default Layout;