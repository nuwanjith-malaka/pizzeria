import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import CreateProduct from './CreateProduct';
import ProductList from '../components/ListProducts';

import { useContext } from 'react'
import { Context } from '../Context'

import FormAlert from "../components/FormAlert";

function Home() {

  const { State, setState } = useContext(Context)

  const alertHandleClose = () => {
		setState({
      ...State,
        CurrentAlert: {
          ...State.CurrentAlert, open: false
        }
    });
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
          <ProductList></ProductList>
        </Box>
      </Container>
    
  );
}

export default Home;
