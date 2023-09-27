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

export default function ProductCard({product}) {

  const { State, setState } = useContext(Context)
  
  const navigate = useNavigate();

  return (
    <>
      <CardContent>
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
      </CardContent>
      <CardActions>
        <Button 
          size="small"
          onClick={() => {
            setState({
              ...State,
                CurrentProduct: product
            })
            navigate('product/:' + product.id);
          }}>See More</Button>
      </CardActions>
    
    </>
      
  );
}