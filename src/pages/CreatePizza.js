// CreatePizza Component for add new Pizza

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';

import { useFormik } from 'formik';
import * as yup from 'yup';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { CssBaseline } from "@mui/material";

import PizzaForm from "../components/PizzaForm";

import {Link, Routes, Route, useNavigate} from 'react-router-dom';

import { useContext } from 'react'
import { Context } from '../Context'

// CreatePizza Component
const CreatePizza = () => {

	const { State, setState } = useContext(Context)

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

	function SendCreatePizzaRequest(data){
		console.log('data before stringified', data);
		const stringifiedData = JSON.stringify(data)
		console.log('data after stringified', stringifiedData);
		const requestJSON = JSON.parse(stringifiedData)
		console.log('data after json parse', requestJSON);
		console.log('printing base64image after parse', requestJSON.image)
		axios.post(
			'https://8cs5hz9ybb.execute-api.us-east-1.amazonaws.com/beta/pizza', 
			stringifiedData, 
			{
				headers: {
				'Authorization': `Bearer ${State.User.tokens.access_token}`,
				'Access-Control-Allow-Origin': '*'
				}
			}
		)
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
	}

	const formik = useFormik({
		initialValues: {
			pk:'',
			sk:'',
			name:'',
			description:'',
			starting_price:'',
			pan_personal_price:'',
			pan_medium_price:'',
			pan_large_price:'',
			sausage_personal_price:'',
			sausage_medium_price:'',
			sausage_large_price:'',
			file: null,
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
				image:values.file
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
						SendCreatePizzaRequest(data)
					})
					.catch(err => {
						console.log('printing base64 image error', err)
					})
			}
			else{
				data.image = ""
				SendCreatePizzaRequest(data)
			}
		},
	});
	
// Return Pizza form
return(
	<Container maxWidth="xs">
			<Typography component="h4" variant="h4" sx={{mb: 2, textAlign:'center'}}>
				Create Pizza
			</Typography>
			<PizzaForm 
				formik={formik}
			>
				Create Pizza
			</PizzaForm>
    </Container>
  );
}
// Export CreatePizza Component
export default CreatePizza

