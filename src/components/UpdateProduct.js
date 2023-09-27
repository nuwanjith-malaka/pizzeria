// EditProduct Component for update Product data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useFormik } from 'formik';
import * as yup from 'yup';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Alert, CssBaseline } from "@mui/material";

import ProductForm from "./ProductForm";
import FormAlert from "./FormAlert";

import { useContext } from 'react'
import { Context } from '../Context'

import {Link, Routes, Route, useNavigate, useLocation} from 'react-router-dom';

// EditProduct Component
const EditProduct = (props) => {

    const { State, setState } = useContext(Context)

	const alertHandleClose = () => {
		setState({ ...State, CurrentAlert: {...State.CurrentAlert, open: false }});
	};

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
		initialValues: State.CurrentProduct,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			axios.post(
			'https://s1fc10ik12.execute-api.us-east-1.amazonaws.com/stage1/products',
			JSON.stringify(values, null, 4))
			.then(res => {
				setState({
					...State, 
					CurrentProduct:values,
					CurrentAlert: {
						...State.CurrentAlert,
						open: true, 
						type: 'success', 
						content: res.data 
					}
				});
				navigate('/product/:' + values.id);
			})
			.catch(err => {
				console.log(err)
				setState({
					...State,
						CurrentAlert: {
							...State.CurrentAlert,
							open: true, 
							type: 'error', 
							content: err 
				}});
			})
		},
	});

// Load data from server and reinitialize Product form
// useEffect(() => {
// 	axios
// 	.get(
// 		'https://s1fc10ik12.execute-api.us-east-1.amazonaws.com/stage1/products'
// 		+ props.match.params.id
// 	)
// 	.then((res) => {
// 		const { id, description, price, title } = res.data;
// 		formik.initialValues = {
// 			id: id,
// 			description: description,
// 			price: price,
// 			title: title,
// 		}
// 	})
// 	.catch((err) => console.log(err));
// }, []);

// Return Product form
return (
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
			<FormAlert
				handleClose = {alertHandleClose}
				AlertState = {State.CurrentAlert}
			></FormAlert>
			<Typography component="h1" variant="h5">
				Edit Product
			</Typography>
			<ProductForm 
				formik={formik}
			>
				Edit Product
			</ProductForm>
		</Box>
    </Container>
);
};

// Export EditProduct Component
export default EditProduct;
