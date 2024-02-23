import * as React from 'react';
import Button from '@mui/material/Button';
import CreatePizza from './CreatePizza';
import PizzaList from './ListPizza';

import { useContext } from 'react'
import { Context } from '../Context'

function Home() {

  return (<PizzaList></PizzaList> );
}

export default Home;
