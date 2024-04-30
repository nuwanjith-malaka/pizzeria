import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import CreatePizza from './CreatePizza';
import PizzaList from './ListPizza';
import axios from "axios";

import { useContext } from 'react'
import { Context } from '../Context'

import Grid from '@mui/material/Grid';
import Cart from "../components/Cart";

import * as qs from 'qs'
import { useLocation } from 'react-router-dom';
  
function Home() {

  const { State, setState } = useContext(Context)
  const location = useLocation();

  useEffect(() => {

    //let pizzas = []
    //let extras = []

    function getExtras(){
      return new Promise((resolve, reject)=>{
        console.log('sending axios get request to fetch extras')
        axios
          .get('https://8cs5hz9ybb.execute-api.us-east-1.amazonaws.com/beta/extra?type=list&item=extra')
          .then(({ data }) => {
            //extras = data.content.Items
            //console.log('setting fetched extras to extras v', extras)
            console.log('returning extras', data.content.Items)
            resolve(data.content.Items)
          })
          .catch((error) => {
              console.log('extras fetching request error', error);
          });
      })
    }

    function getPizzas(){
      return new Promise((resolve, reject)=>{
        console.log('sending axios get request to fetch pizzas')
        axios
        .get('https://8cs5hz9ybb.execute-api.us-east-1.amazonaws.com/beta/pizza?type=list&item=pizza')
        .then(({ data }) => {
          //pizzas = data.content.Items
          //console.log('setting fetched pizzas to pizzas v',pizzas)
          console.log('returning pizzas', data.content.Items)
          resolve(data.content.Items)
        })
        .catch((error) => {
          console.log('pizzas fetching request error', error);
        });
      })
    }

    Promise.all([getPizzas(), getExtras()])
      .then(([pizzas, extras]) => {
        console.log('adding pizzas and extras to the state')
        setState({...State, Extras:extras, Pizzas:pizzas});
        console.log('printing state',State)
      })
      .catch((err)=>{
        console.log('promise all error', err)
      });

    const signInUser = (authorizationCode) => {
      console.log('started signinuser')
      const data = {
        grant_type: 'authorization_code',
        client_id: 'qgklh1tp03tvqav39sjaafct2',
        code: authorizationCode,
      };
    
      const p = {
        method: 'post',
        url: 'https://pizzzzeria.auth.us-east-1.amazoncognito.com/oauth2/token',
        data: qs.stringify(data),
    
        auth: {
          username: 'qgklh1tp03tvqav39sjaafct2',
          password: '1arrl07u7ibb4cr8vlo7stentrm4gi96chfk1oh544maqvjla1r6',
        },
      };

      return new Promise(() => {
        axios(p)
          .then(({ response }) => {
            console.log('printing signin response', response)
          })
          .catch((error) => {
            console.log('printing signin request error', error);
          });
          })
    }

    const queryParams = new URLSearchParams(window.location.search);
    console.log('printing URLSearchParams', queryParams)
    if (queryParams.has('code')){
      const authorizationCode = queryParams.get('code'); 
      console.log("authorization code", authorizationCode)
      signInUser(authorizationCode).then()
    }
  }, []);
  return (
        <PizzaList></PizzaList>
     );
}

export default Home;
