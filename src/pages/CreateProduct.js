// CreateProduct Component for add new Product

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';

import { useFormik } from 'formik';
import * as yup from 'yup';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { CssBaseline } from "@mui/material";

import ProductForm from "../components/ProductForm";

import {Link, Routes, Route, useNavigate} from 'react-router-dom';

import { useContext } from 'react'
import { Context } from '../Context'

// CreateProduct Component
const CreateProduct = () => {

	const { State, setState } = useContext(Context)

	const navigate = useNavigate();

	const validationSchema = yup.object({
		id: yup
		.string('Enter your id')
		.required('Id is required'),
		description: yup
		.string('Enter your description')
		.required('description is required'),
		price: yup
		.string('Enter your price')
		.required('Price is required'),
		title: yup
		.string('Enter your title')
		.required('Title is required'),
	});

	const formik = useFormik({
		initialValues: {
			id: '',
			description: '',
			price: '',
			title: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			axios.post(
			'https://s1fc10ik12.execute-api.us-east-1.amazonaws.com/stage1/products',
			JSON.stringify(values, null, 4))
			.then(res => {
				console.log(res)
				setState({
					...State,
						CurrentAlert:{
							...State.CurrentAlert,
							open: true, 
							type: 'success', 
							content: res.data 
							}
				});
				navigate('/');
			})
			.catch(err => {
				console.log(err)
				setState({
					...State,
						CurrentAlert:{
							...State.CurrentAlert,
							open: true, 
							type: 'error', 
							content: err 
					}
				});
			})
		},
	});
	
// Return Product form
return(
	<Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
			<Typography component="h1" variant="h5" sx={{mb: 2}}>
				Create Product
			</Typography>
			<ProductForm 
				formik={formik}
			>
				Create Product
			</ProductForm>
		</Box>
    </Container>
  );
}
// Export CreateProduct Component
export default CreateProduct

