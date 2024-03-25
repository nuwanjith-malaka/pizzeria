import React, { useState, useEffect } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Box from '@mui/material/Box';
import { pink } from '@mui/material/colors';
import { Typography } from "@mui/material";
import Container from '@mui/material/Container';

const OrderSuccess = () => {
    return (
            <Box
                sx={{
                    display:'flex',
                    position:'static',
                    flexDirection:'column',
                    justifyContent:'center',
                    textAlign:'center',
                    border:'1px solid',
                    marginTop:'50px',
                    gap:'20px'
                }}
            >
                <CheckCircleOutlineIcon 
                    sx={{ 
                        fontSize: 100,
                        color: pink[500] ,
                        border:'1px solid',
                        margin:'auto'
                    }}
                >
                </CheckCircleOutlineIcon>
                <Typography>Hey firstname lastname</Typography>
                <Typography variant="h5">Your Order is Confirmed!</Typography>
                <Typography>We will send you a delivery confirmation email as soon as your order delivers.</Typography>
            </Box>
        
    )
};

export default OrderSuccess;