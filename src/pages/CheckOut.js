import React, { useState, useEffect } from "react";
import axios from 'axios';

import { useFormik } from 'formik';
import * as yup from 'yup';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { CssBaseline } from "@mui/material";
import Button from '@mui/material/Button';

import CheckOutForm from "../components/CheckOutForm";

import {Link, Routes, Route, useNavigate} from 'react-router-dom';

import { useContext } from 'react'
import { Context } from '../Context'

const CheckOut = () => {
    const { State, setState } = useContext(Context)

	const navigate = useNavigate();

	const validationSchema = yup.object({
		delivery_address: yup
		.string('Enter delivery address')
		.required('Delivery Address is required'),
		delivery_date: yup
		.string('Enter delivery date')
		.required('Delivery Date is required'),
		first_name: yup
		.string('Enter your fist name')
		.required('First Name is required'),
		last_name: yup
		.string('Enter your last name')
		.required('Last Name is required'),
		Phone_number: yup
		.number('Enter your phone number')
		.required('Phone Number is required'),
		email: yup
		.string('Enter your email ')
		.required('Email is required'),
	});

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

	const formik = useFormik({
		initialValues: {
			delivery_address:'',
			delivery_date:currentDate,
			first_name:State.User.info.given_name,
			last_name:State.User.info.family_name,
      Phone_number:'',
			email:State.User.info.email,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log('starting useFormik onSubmit');
      const pk = new Date().valueOf();
			const data = {
        pk:`o#${pk}`,
        sk:`o#${pk}`,
				delivery_address:values.delivery_address,
        delivery_date:values.delivery_date,
        first_name:values.first_name,
        last_name:values.last_name,
        phone_number:values.Phone_number,
        email:values.email,
			};
			
      console.log('data before stringified', data);
      const stringifiedData = JSON.stringify(data)
      console.log('data after stringified', stringifiedData);
      const requestJSON = JSON.parse(stringifiedData)
      console.log('data after json parse', requestJSON);
      axios.post(
      'https://8cs5hz9ybb.execute-api.us-east-1.amazonaws.com/beta/order', stringifiedData)
      .then(res => {
          console.log('create order request response',res)
          setState({
              ...State, 
              CurrentAlert: {
                  ...State.CurrentAlert,
                  open: true, 
                  type: 'success', 
                  content: res.data.msg
              }
          });
          navigate('/OrderSuccess');
      })
      .catch(err => {
          console.log('printing create order request error', err)
          setState({
              ...State,
                  CurrentAlert: {
                      ...State.CurrentAlert,
                      open: true, 
                      type: 'error', 
                      content: err.message
          }});
      })
			
		},
	});

    return (
      <Container maxWidth="xs" sx={{marginTop:'20px'}}>
        <Typography component="h4" variant="h4" sx={{mb: 2, textAlign:'center'}}>
          Order Details
        </Typography>
        <CheckOutForm 
          formik={formik}
        >
          Place Order
        </CheckOutForm>
      </Container>
    )
};

export default CheckOut;

