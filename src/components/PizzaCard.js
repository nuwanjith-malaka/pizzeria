import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
      <CardMedia
        component="img"
        height="200px"
        image={Pizza.image}
        alt="Pizza Image"
      />
      <CardContent>
        <Box sx={{height:'100px'}}>
          <Typography variant="h6" >
          {Pizza.name}
        </Typography>
        </Box>
        <Box>
          <Typography color="text.secondary" gutterBottom>
          {Pizza.pk}
        </Typography>
        <Typography variant="body2">
          {Pizza.description.slice(0, 40)}
        </Typography>
        <Typography marginTop="10px" color="text.secondary">starting from</Typography>
        <Typography >${Pizza["starting price"]}</Typography>
        </Box>
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