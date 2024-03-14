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

export default function ExtraCard({Extra}) {

  const { State, setState } = useContext(Context)
  
  const navigate = useNavigate();

  return (
    <>
    <CardMedia
        component="img"
        height="200px"
        image={Extra.image}
        alt="Extra Image"
      />
      <CardContent >
        <Typography variant="h6" component="div">
          {Extra.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {Extra.pk}
        </Typography>
        <Typography marginTop="10px" color="text.secondary">starting from</Typography>
        <Typography >${Extra["starting price"]}</Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small"
          onClick={() => {
            setState({
              ...State,
                CurrentExtra: Extra
            })
            navigate('Extra/:' + Extra.pk);
          }}>See More</Button>
      </CardActions>
    
    </>
      
  );
}