import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';

import { useContext } from 'react'
import { Context } from '../Context'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function PizzaCard({Pizza}) {

  const { State, setState } = useContext(Context)
  
  const navigate = useNavigate();
  
  return (
    <>
      <CardContent>
        <Link href="/">
          <Box
            component="img"
            max-width="100%" 
            height="200px" 
            padding="0" 
            margin="0" 
            alt="Logo"
            src={Pizza.image}
          />
        </Link>
        <Typography variant="h6" component="div">
          {Pizza.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {Pizza.pk}
        </Typography>
        <Typography variant="body2">
          {Pizza.description}
        </Typography>
        <Typography marginTop="10px" color="text.secondary">starting from</Typography>
        <Typography >${Pizza["starting price"]}</Typography>

      </CardContent>
      <CardActions>
        <Button 
          size="small"
          onClick={() => {
            setState({
              ...State,
                CurrentPizza: Pizza
            })
            navigate('pizza/:' + Pizza.pk);
          }}>See More</Button>
      </CardActions>
    
    </>
      
  );
}