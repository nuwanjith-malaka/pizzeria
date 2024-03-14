// EditExtra Component for update Extra data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useFormik } from 'formik';
import * as yup from 'yup';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Alert, CssBaseline } from "@mui/material";

import ExtraForm from "./ExtraForm";
import FormAlert from "./FormAlert";

import { useContext } from 'react'
import { Context } from '../Context'

import {Link, Routes, Route, useNavigate, useLocation} from 'react-router-dom';

// EditExtra Component
const EditExtra = (props) => {

    const { State, setState } = useContext(Context)

	const alertHandleClose = () => {
		setState({ ...State, CurrentAlert: {...State.CurrentAlert, open: false }});
	};

	const navigate = useNavigate();

	const validationSchema = yup.object({
		pk: yup
		.string('Enter Extra primary key')
		.required('primary key is required'),
		sk: yup
		.string('Enter Extra sort key')
		.required('sort key is required'),
		starting_price: yup
		.number('Enter Extra starting_price')
		.required('Starting_price is required'),
		name: yup
		.string('Enter Extra name')
		.required('Name is required'),
		file: yup.mixed()
		.required('Image is required'),
	});

	const formik = useFormik({
		initialValues: {
			pk: State.CurrentExtra.pk,
			sk: State.CurrentExtra.sk,
			'entity type': 'extra',
			GSI1PK: 'extra',
			GSI1SK: State.CurrentExtra.pk,
			name: State.CurrentExtra.name,
			large_price:State.CurrentExtra.options.large,
			medium_price:State.CurrentExtra.options.medium,
			personal_price:State.CurrentExtra.options.personal,
			starting_price: State.CurrentExtra['starting price'],
			file: State.CurrentExtra.image,
		  },
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log('starting useFormik onSubmit');
			const data = {
				pk: values.pk,
				sk: values.sk,
				'entity type': 'extra',
				GSI1PK: 'extra',
				GSI1SK: values.pk,
				name: values.name,
				options: {
						personal: values.personal_price,
						large: values.large_price,
						medium: values.medium_price
					},
				'starting price': values.starting_price,
				image : State.CurrentExtra.image
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
				'https://8cs5hz9ybb.execute-api.us-east-1.amazonaws.com/beta/extra', stringifiedData)
				.then(res => {
					console.log('update extra request response',res)
					setState({
						...State, 
						CurrentExtra:res.data.content,
						CurrentAlert: {
							...State.CurrentAlert,
							open: true, 
							type: 'success', 
							content: res.data.msg
						}
					});
					navigate('/Extra/:' + data.pk);
				})
				.catch(err => {
					console.log('printing update extra request error', err)
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

// Load data from server and reinitialize Extra form
// useEffect(() => {
// 	axios
// 	.get(
// 		'https://s1fc10ik12.execute-api.us-east-1.amazonaws.com/stage1/Extras'
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

// Return Extra form
return (
	<Container component="main" maxWidth="xs">
			<FormAlert
				handleClose = {alertHandleClose}
				AlertState = {State.CurrentAlert}
			></FormAlert>
			<Typography component="h4" variant="h4" sx={{mb: 2, textAlign:'center'}}>
				Edit Extra
			</Typography>
			<ExtraForm 
				formik={formik}
			>
				Edit Extra
			</ExtraForm>
    </Container>
);
};

// Export EditExtra Component
export default EditExtra;