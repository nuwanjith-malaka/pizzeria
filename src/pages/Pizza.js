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
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import {Link, Routes, Route, useNavigate, useLocation} from 'react-router-dom';

import { useContext } from 'react'
import { Context } from '../Context'

import FormAlert from "../components/FormAlert";
import Cart from "../components/Cart";
import OnlyTwoExtraDialog from "../components/OnlyTwoExtraDialog";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

const Pizza = () => {

    const { State, setState } = useContext(Context)

    const Pizza = State.CurrentPizza
    console.log("current pizza", Pizza)

    const [OrderItem, setOrderItem] = useState(
      {
        pk: Pizza.pk,
        name: Pizza.name,
        image: Pizza.image,
        crust:'',
        size:'',
        options:Pizza.options,
        extras:[],
        specialInstructions:'',
        price:0,
        quantity:1,
        totalPrice:0
      }
    )

    const extras = State.Extras.map((extra) => {
      return {pk: extra.pk,
              name: extra.name,
              image: extra.image,
              size:'',
              options:extra.options,
              price:'',
              checked: false}
      }
    )

    const [Extras, setExtras] = useState(extras)

    const navigate = useNavigate();

    console.log('printing extras', extras)

    const alertHandleClose = () => {
      setState({...State , CurrentAlert:{ ...State.CurrentAlert, open: false }});
    };

    console.log("Order Item", OrderItem)

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
                    OrderItem
                  ],
                  TotalPrice: State.TotalPrice + OrderItem.totalPrice
        })};

    const handleCrustChange = (event) => {
      setOrderItem({...OrderItem, 
                      crust:event.target.value, 
                      size:'',
                      extras:[]
                  });
    }
    const handleSizeChange = (event) => {
      const price = OrderItem.options[OrderItem.crust][event.target.value]
      setOrderItem({...OrderItem, 
                      size:event.target.value, 
                      price:price,
                      totalPrice:price,
                      extras:[]
                    });
      setExtras(prevExtras => prevExtras.map((extra,i) => {
        let price = extra.options[event.target.value]
        return {...extra, 
                  size:event.target.value,
                  checked:false,
                  price:price}
      }))
    }

    const handleExtrasChange = (event, extra1) => {
      console.log('onclick executing', event, extra1)
      if (OrderItem.extras.length === 2 && event.target.checked === true){
        setState({...State, DialogOpen:true})
        return
      }
      setOrderItem(()=>{
        if (event.target.checked === true){
          const {checked, options, ...extraItem} = extra1
          OrderItem.extras.push(extraItem)
          return {...OrderItem, 
                    price:OrderItem.price + extra1.price,
                    totalPrice:OrderItem.totalPrice + extra1.price
                }
        }
        else{
          return {...OrderItem, 
                    extras:OrderItem.extras.filter((extra)=>extra.pk !== extra1.pk), 
                    price:OrderItem.price - extra1.price,
                    totalPrice:OrderItem.totalPrice - extra1.price
                  }
        }
      })
      setExtras(prevExtras => prevExtras.map((extra2,i)=>{
        if (extra2.pk === extra1.pk){
          return {...extra2, 
                    checked:event.target.checked}
        }
        return extra2
      }))
    };

    const handleSpecialInstructionsChange = (event) => {
      setOrderItem({...OrderItem, 
                      specialInstructions:event.target.value});
    }
    const handleSizeOptions = (crust) => {
      let sizeOptions = Object.entries(Pizza.options[crust]);
      console.log('printing sizeoptions', sizeOptions)
      let formControlLables = []
      for (let [key, value] of sizeOptions){
        formControlLables.push(
          <FormControlLabel 
            value={key}
            checked={OrderItem.size === key}
            control={<Radio />} 
            label={
              <Box
                sx={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-between',
                  border:'1px solid',
                  
                }}>
                  <img src={`https://malakas3.s3.amazonaws.com/pizzeria/pizzas/${key}pz.jpg`} alt="pan" style={{maxWidth: "50px", maxHeight:'50px'}} />
                <Box sx={{marginLeft:'10px'}}>
                  <Typography sx={{display:'block'}}>{key}</Typography>
                  <Typography sx={{display:'block'}}>Rs.{value}</Typography>
                </Box>
              </Box>
            } 
          />
        )
         }
      return formControlLables
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
              border='1px solid'
              component="img"
              maxWidth="300px" 
              width='100%'
              height="auto" 
              margin='auto'
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
            <OnlyTwoExtraDialog></OnlyTwoExtraDialog>
            </Box>
        </Grid>
        <Grid sx={{border:'1px solid'}} item xs={12} sm={12} md={6} lg={6} >
              <Accordion defaultExpanded>
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
                      value={OrderItem.crust}
                      onChange={handleCrustChange}
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
                  {(OrderItem.crust) 
                    ?
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
                          value={OrderItem.size}
                          onChange={handleSizeChange}
                        >
                          {handleSizeOptions(OrderItem.crust)}
                        </RadioGroup>
                      </FormControl>
                    :
                      <Typography>Please select the crust first.</Typography>
                  }
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
                >
                  {(OrderItem.crust && OrderItem.size) 
                    ?
                    <FormControl>
                      <FormGroup
                        row={true}
                      >
                        {
                          Extras.map(
                            (extra)=>{
                              return <FormControlLabel 
                                        value={extra.pk}
                                        control={
                                          <Checkbox checked={OrderItem.extras.length !== 0 && extra.checked} onClick={event => handleExtrasChange(event, extra)} name={extra.name} />
                                        }
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
                                              <Typography 
                                                color="text.secondary"
                                              >
                                                ${extra.price}
                                              </Typography>
                                            </CardContent>
                                          </Card>
                                        } 
                                      />
                            }
                          )
                        }
                      </FormGroup>
                    </FormControl>
                    :
                      <Typography>Please select the size first.</Typography>
                  }
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
                    value={OrderItem.specialInstructions}
                    onChange={(event) => {handleSpecialInstructionsChange(event)}}
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
              <Button 
                onClick={() => {
                  if (OrderItem.quantity === 1){
                    return
                  }
                  setOrderItem((prevOrderItem) => 
                                {return {...prevOrderItem, 
                                            quantity:prevOrderItem.quantity - 1,
                                            totalPrice:prevOrderItem.totalPrice - prevOrderItem.price
                                        }})}}>
                <RemoveIcon></RemoveIcon>
              </Button>
              <Typography>{OrderItem.quantity}</Typography>
              <Button 
                onClick={() => 
                  setOrderItem((prevOrderItem) => 
                                {return {...prevOrderItem, 
                                            quantity:prevOrderItem.quantity + 1,
                                            totalPrice:prevOrderItem.totalPrice + prevOrderItem.price
                                        }})}>
                <AddIcon></AddIcon></Button>
              <Button 
                size="sm" 
                variant="contained"
                color="success"
                onClick={() => onAddToCart(OrderItem)}
              >
                Add to Cart Rs. {OrderItem.totalPrice}.00
              </Button>  
            </Box>
        </Grid>
        <Grid 
          item xs={12} sm={12} md={3} lg={3}
          sx={{
            border:'1px solid',
          }} 
        >
          <Cart></Cart>
        </Grid>
    </Grid>
      
        
    );
};

export default Pizza;
