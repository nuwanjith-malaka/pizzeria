// EditPizza Component for update Pizza data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useFormik } from 'formik';
import * as yup from 'yup';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Alert, CssBaseline } from "@mui/material";

import PizzaForm from "./PizzaForm";
import FormAlert from "./FormAlert";

import { useContext } from 'react'
import { Context } from '../Context'

import {Link, Routes, Route, useNavigate, useLocation} from 'react-router-dom';

// EditPizza Component
const EditPizza = (props) => {

    const { State, setState } = useContext(Context)

	const alertHandleClose = () => {
		setState({ ...State, CurrentAlert: {...State.CurrentAlert, open: false }});
	};

	const navigate = useNavigate();

	const validationSchema = yup.object({
		pk: yup
		.string('Enter pizza primary key')
		.required('primary key is required'),
		sk: yup
		.string('Enter pizza sort key')
		.required('sort key is required'),
		description: yup
		.string('Enter pizza description')
		.required('description is required'),
		starting_price: yup
		.number('Enter pizza starting_price')
		.required('Starting_price is required'),
		name: yup
		.string('Enter pizza name')
		.required('Name is required'),
		file: yup.mixed()
		.required('Image is required'),
	});

	const formik = useFormik({
		initialValues: {
			pk: State.CurrentPizza.pk,
			sk: State.CurrentPizza.sk,
			description: State.CurrentPizza.description,
			'entity type': 'pizza',
			GSI1PK: 'pizza',
			GSI1SK: State.CurrentPizza.pk,
			name: State.CurrentPizza.name,
			pan_large_price:State.CurrentPizza.options.pan.large,
			pan_medium_price:State.CurrentPizza.options.pan.medium,
			pan_personal_price:State.CurrentPizza.options.pan.personal,
			sausage_large_price:State.CurrentPizza.options.sausage.large,
			sausage_medium_price:State.CurrentPizza.options.sausage.medium,
			sausage_personal_price:State.CurrentPizza.options.sausage.personal,
			starting_price: State.CurrentPizza['starting price'],
			file: State.CurrentPizza.image,
		  },
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log('starting useFormik onSubmit');
			const data = {
				pk: values.pk,
				sk: values.sk,
				description: values.description,
				'entity type': 'pizza',
				GSI1PK: 'pizza',
				GSI1SK: values.pk,
				name: values.name,
				options: {
				    pan: {
						personal: values.pan_personal_price,
						large: values.pan_large_price,
						medium: values.pan_medium_price
					   },
					sausage: {
						large:  values.sausage_large_price,
						medium: values.sausage_medium_price,
						personal: values.sausage_personal_price
						},
					},
				'starting price': values.starting_price,
				image : State.CurrentPizza.image
			  };

			if (typeof values.file !== "string"){
				console.log('printing image to be uploaded',values.file);
				const readFile = new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.readAsBinaryString(values.file);
					reader.onloadend = function() {
						const base64Image = btoa(reader.result);
						//let base64Image = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
						resolve(base64Image) 
					}
				})
				readFile
					.then(res =>{
						console.log('printing base64 image', res)
						data['image'] = res
					})
					.catch(err => {
						console.log('printing base64 image error', err)
					})
			}
			else{
				data.image = ""
			}
			
			setTimeout(()=>{
				console.log('data before stringified', data);
				const stringifiedData = JSON.stringify(data)
				console.log('data after stringified', stringifiedData);
				const requestJSON = JSON.parse(stringifiedData)
				console.log('data after json parse', requestJSON);
				console.log('printing base64image after parse', requestJSON.image)
				axios.post(
				'https://8cs5hz9ybb.execute-api.us-east-1.amazonaws.com/beta/pizza', stringifiedData)
				.then(res => {
					console.log('update pizza request response',res)
					setState({
						...State, 
						CurrentPizza:res.data.content,
						CurrentAlert: {
							...State.CurrentAlert,
							open: true, 
							type: 'success', 
							content: res.data.msg
						}
					});
					navigate('/Pizza/:' + data.pk);
				})
				.catch(err => {
					console.log('printing update pizza request error', err)
					setState({
						...State,
							CurrentAlert: {
								...State.CurrentAlert,
								open: true, 
								type: 'error', 
								content: err.message
					}});
				})
			}, 2000);
			
		},
	});

// Load data from server and reinitialize Pizza form
// useEffect(() => {
// 	axios
// 	.get(
// 		'https://s1fc10ik12.execute-api.us-east-1.amazonaws.com/stage1/Pizzas'
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

// Return Pizza form
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
				Edit Pizza
			</Typography>
			<PizzaForm 
				formik={formik}
			>
				Edit Pizza
			</PizzaForm>
		</Box>
    </Container>
);
};

// Export EditPizza Component
export default EditPizza;
