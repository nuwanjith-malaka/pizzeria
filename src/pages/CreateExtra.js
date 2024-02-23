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

import ExtraForm from "../components/ExtraForm";

import {Link, Routes, Route, useNavigate} from 'react-router-dom';

import { useContext } from 'react'
import { Context } from '../Context'

// CreateExtra Component
const CreateExtra = () => {

	const { State, setState } = useContext(Context)

	const navigate = useNavigate();

	const validationSchema = yup.object({
		pk: yup
		.string('Enter pizza primary key')
		.required('primary key is required'),
		sk: yup
		.string('Enter pizza sort key')
		.required('sort key is required'),
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
			pk:'',
			sk:'',
			name:'',
			starting_price:'',
			personal_price:'',
			medium_price:'',
			large_price:'',
			file: null,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const data = {
				pk: values.pk,
				sk: values.sk,
				'entity type': 'extra',
				GSI1PK: 'extra',
				GSI1SK: values.pk,
				name: values.name,
				options:  {
					personal:values.personal_price,
					large: values.large_price,
					medium: values.medium_price,
						},
				'starting price': values.starting_price,
				file:values.file
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
	
// Return Extra form
return(
	<Container component="main" maxWidth="xs">
			<Typography component="h4" variant="h4" sx={{mb: 2, textAlign:'center'}}>
				Create Extra
			</Typography>
			<ExtraForm 
				formik={formik}
			>
				Create Extra
			</ExtraForm>
    </Container>
  );
}
// Export CreateExtra Component
export default CreateExtra