import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';

import {Link, Routes, Route, useNavigate, useLocation} from 'react-router-dom';

import { useContext } from 'react'
import { Context } from '../Context'

import FormAlert from "../components/FormAlert";
import Cart from "../components/Cart";

const Pizza = () => {

    const { State, setState } = useContext(Context)
    const [OrderItem, setOrderItem] = useState(State.CurrentPizza)

    const alertHandleClose = () => {
            setState({...State , CurrentAlert:{ ...State.CurrentAlert, open: false }});
        };

    const navigate = useNavigate();

    const Pizza = State.CurrentPizza
    console.log("current pizza", Pizza)

    const deletePizza = () => {
        console.log("starting deletePizza method ->" , Pizza)
        axios
        .delete("https://8cs5hz9ybb.execute-api.us-east-1.amazonaws.com/beta/pizza", {params: {type:"item", item:"pizza", pk:`${Pizza.pk}`, sk:`${Pizza.sk}`}})
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
            navigate('/Pizza');
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

    const onAddToCart = (OrderItem) => {
      setState({...State,
                  CartItems:[
                    ...State.CartItems,
                    { ...OrderItem, quantity: 1 }
                  ]
        })};

    const getExtras = () => {
      return (
        State.Extras.map(
          (extra)=>{
            return(
              <FormControlLabel 
                value={extra.pk}
                control={<Radio />} 
                label={
                  <Card
                    sx={{
                      width:'120px',
                      height:'140px',
                      marginBottom:'10px'
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="50px"
                      image={extra.image}
                      alt="Extra Image"
                    />
                    <CardContent >
                      <Typography>
                        {extra.name}
                      </Typography>
                      <Typography color="text.secondary">${extra["starting price"]}</Typography>
                    </CardContent>
                  </Card>
                } 
              />
              
            )
          }
        )
      )
    }

    return (
      <Grid
      container
      spacing={2}
      direction="row"
      sx={{marginTop:1}}
      >
        <Grid 
          item xs={12} sm={12} md={3} lg={3}
          sx={{
            border:'1px solid',
            justifyContent:'center', 
            textAlign:'center',
          }} 
        >
          <FormAlert
          handleClose = {alertHandleClose}
          AlertState = {State.CurrentAlert}
          >
          </FormAlert>
          <Typography variant="h5" component="div" gutterBottom>
            {Pizza.name}
          </Typography>
            <Box
              display="flex"
              component="img"
              maxWidth="300px" 
              width='100%'
              height="auto" 
              maxHeight='250px'
              alt="Logo"
              src={Pizza.image}
            />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {Pizza.pk}
          </Typography>
          <Typography  gutterBottom>
            {Pizza.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Starting from 
          </Typography>
          <Typography color="text.secondary" variant="h5">
            ${Pizza["starting price"]}
          </Typography>
          <Box display="flex" justifyContent="center" marginTop={5}>
            <Button
            component={Link} 
            to={"/edit-Pizza/" + Pizza.pk} 
            variant="contained" 
            color="primary"
            sx={{marginRight:2}}
            >
            Edit
            </Button>
            <Button 
                onClick={deletePizza}
                size="sm" 
                variant="contained"
                color="error"
            >
              Delete
            </Button>
            </Box>
        </Grid>
        <Grid sx={{border:'1px solid'}} item xs={12} sm={12} md={6} lg={6} >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Select crust *
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl >
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel 
                        value="pan" 
                        control={<Radio />} 
                        label={<img src="https://malakas3.s3.amazonaws.com/pizzeria/pizzas/pan.jpg" alt="pan" style={{width: "80px"}} />} 
                      />
                      <FormControlLabel 
                        value="sausage" 
                        control={<Radio />} 
                        label={<img src="https://malakas3.s3.amazonaws.com/pizzeria/pizzas/sus.jpg" alt="sausage" style={{width: "80px"}} />} 
                      />
                    </RadioGroup>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Select size *
                </AccordionSummary>
                  <AccordionDetails>
                     <FormControl >
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      sx={{
                        display:'flex',
                        flexWrap:'wrap',
                        alignItems:'center',
                        justifyContent:'left',
                        border:'1px solid',
                        gap:'15px'
                      }}
                    >
                      <FormControlLabel 
                        value="large" 
                        control={<Radio />} 
                        label={
                          <Box
                            sx={{
                              display:'flex',
                              alignItems:'center',
                              justifyContent:'space-between',
                              border:'1px solid',
                              
                            }}>
                              <img src="https://malakas3.s3.amazonaws.com/pizzeria/pizzas/largepz.jpg" alt="pan" style={{maxWidth: "50px", maxHeight:'50px'}} />
                            <Box sx={{marginLeft:'10px'}}>
                              <Typography sx={{display:'block'}}>Large</Typography>
                              <Typography sx={{display:'block'}}>Rs.{OrderItem.options.pan.large}</Typography>
                            </Box>
                          </Box>
                        } 
                      />
                      <FormControlLabel 
                        value="medium" 
                        control={<Radio />} 
                        label={
                          <Box
                            sx={{
                              display:'flex',
                              alignItems:'center',
                              justifyContent:'space-between',
                              border:'1px solid'
                            }}>
                              <img src="https://malakas3.s3.amazonaws.com/pizzeria/pizzas/mediumpz.jpg" alt="pan" style={{maxWidth: "50px", maxHeight:'50px'}} />
                            <Box>
                              <Typography sx={{display:'block'}}>Medium</Typography>
                              <Typography sx={{display:'block'}}>Rs.{OrderItem.options.pan.medium}</Typography>
                            </Box>
                          </Box>
                        } 
                      />
                      <FormControlLabel 
                        value="personal" 
                        control={<Radio />} 
                        label={
                          <Box
                            sx={{
                              display:'flex',
                              alignItems:'center',
                              justifyContent:'space-between',
                              border:'1px solid'
                            }}
                          >
                              <img src="https://malakas3.s3.amazonaws.com/pizzeria/pizzas/smallpz.jpg" alt="pan" style={{maxWidth: "50px", maxHeight:'50px'}} />
                            <Box>
                              <Typography sx={{display:'block'}}>Personal</Typography>
                              <Typography sx={{display:'block'}}>Rs.{OrderItem.options.pan.personal}</Typography>
                            </Box>
                          </Box>
                        } 
                      />
                    </RadioGroup>
                  </FormControl>
                  </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Add something extra 
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display:'flex',
                    flexWrap:'wrap',
                    gap:'2%',
                  }}
                >
                   <FormControl >
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{
                          display:'flex',
                          flexWrap:'wrap',
                          alignItems:'center',
                          justifyContent:'left',
                          border:'1px solid',
                          gap:'15px'
                        }}
                      >
                      {getExtras()}
                    </RadioGroup>
                   </FormControl>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Any special instructions?
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    id="special-instructions"
                    multiline
                    rows={3}
                    sx={{
                      width:'100%'
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            <Box
              sx={{
                flexWrap:'wrap',
                marginTop: '20px',
                marginBottom:'20px',
                border:'1px solid',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                gap: '15px 40px'
              }}
            >
              <Button><RemoveIcon></RemoveIcon></Button>
              <Typography>1</Typography>
              <Button><AddIcon></AddIcon></Button>
              <Button 
                size="sm" 
                variant="contained"
                color="success"
                onClick={() => onAddToCart(OrderItem)}
              >
                Add to Cart Rs. 2000.00
              </Button>  
            </Box>
        </Grid>
        <Grid 
          item xs={12} sm={12} md={3} lg={3}
          sx={{
            border:'1px solid',
          }} 
        >
          <Cart 
            cartItems={State.CartItems}
          ></Cart>
        </Grid>
    </Grid>
      
        
    );
};

export default Pizza;
