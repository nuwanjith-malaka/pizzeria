// Cart.jsx
import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Box, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
const Cart = ({ cartItems }) => {
  // let box = document.getElementsByClassName('MuiGrid-root.MuiGrid-item.MuiGrid-grid-md-4.MuiGrid-grid-lg-3.css-e33yfj-MuiGrid-root');
  // let width = box.offsetWidth;
  return (
    <Box
      sx={{
        display:'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        display:{xs:'none', md:'flex'},
        border:'1px solid',
        position:'relative',
        textAlign:'center'
        
      }}>
        <Box 
          sx={{
            display:'flex',
            flexDirection: 'row', 
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop:'10px',
            paddingBottom:'10px',
            border: '1px solid',
            width:'100%',
          }}
        >
          <ShoppingCartIcon></ShoppingCartIcon>
          <Typography variant="h6">Your cart</Typography>
        </Box>
        <Box 
          sx={{
            borderRight: '1px solid',
            borderLeft: '1px solid',
            display:'flex',
            flexDirection: 'column', 
            padding: '10px 5px 5px 10px',
            width:'100%',
            maxHeight: '485px',
            minHeight: '485px',
            overflow:'auto',
            marginBottom:'50px'
          }}>
          {cartItems.length === 0 ? (
            <>
            <Typography variant="p"> Your Cart looks a little empty.</Typography>
            <br></br>
            <Typography variant="p"> Check out some of our unbeatable deals.</Typography>
            </>
          ) : (
            cartItems.map((item) => (
              <Box sx={{
              }}>
              <List disablePadding>
              <ListItem key={item.id} disablePadding>
                <ListItemAvatar><Avatar alt={item.name} src={item.image} /></ListItemAvatar>
                <ListItemText primary={item.name} disablePadding></ListItemText>
              </ListItem>
              </List>
              <List>
                <ListItem disablePadding>
                  <ListItemButton><ListItemIcon sx={{display:'flex', justifyContent:'center', }}><RemoveIcon></RemoveIcon></ListItemIcon></ListItemButton>
                  <ListItemText primary={`${item.quantity}`}></ListItemText>
                  <ListItemButton><ListItemIcon sx={{display:'flex', justifyContent:'center', MaxWidth:'30px'}}> <AddIcon></AddIcon></ListItemIcon></ListItemButton>
                  <ListItemButton><DeleteIcon></DeleteIcon></ListItemButton>
                </ListItem>
                <Divider variant="middle" component="li" />
              </List>
              </Box>
              
            ))
          )}
        </Box>
        <Box
          sx={{
            position:'absolute',
            bottom:'0px',
            border:'1px solid',
            width:'100%',
          }}
        >
          <Button
            component={Link}
            to={'/CheckOut'}
            sx={{
              justifyContent:'center',
              width:'80%',
            }}
            variant="contained"
            color='success'
          >
            Checkout Rs. 2000.00
          </Button>
        </Box>
    </Box>
    
  );
};

export default Cart;