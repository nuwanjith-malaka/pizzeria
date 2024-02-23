import React from "react";
import {Outlet} from "react-router-dom";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import { Context } from "./Context";

import FormAlert from "./components/FormAlert";

const Layout = () => {

    const [State, setState] = React.useState({
        CurrentAlert: {
            open: false,
            vertical: 'top',
            horizontal: 'center',
            type: '',
            content : ''
        }
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
 <AppBar />
 <Context.Provider value={{ State, setState }}>
        {console.log('printing state ',State)}
        <Container>
        <CssBaseline/>
        <FormAlert
          handleClose = {alertHandleClose}
          AlertState = {State.CurrentAlert}
        >
        </FormAlert>
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        > 
         <Outlet />
        </Box>
        </Container>
 </Context.Provider>
 <Footer />
 </>
 );
};

export default Layout;