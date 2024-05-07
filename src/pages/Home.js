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
    console.log('latest deployment => 16:00')

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

    const getUserTokens = (queryParams) => {
      console.log('started getUserTokens')
      let authorizationCode = ''

      if (queryParams.has('code')){
          authorizationCode = queryParams.get('code'); 
          console.log("authorization code", authorizationCode)
      }
      else {
        return new Promise(()=>{})
      }
      
      return new Promise((resolve) => {
        axios
          .post(
            'https://pizzzzeria.auth.us-east-1.amazoncognito.com/oauth2/token', 
            {
              grant_type: 'authorization_code',
              client_id: 'qgklh1tp03tvqav39sjaafct2',
              client_secret: '1arrl07u7ibb4cr8vlo7stentrm4gi96chfk1oh544maqvjla1r6',
              redirect_uri:'https://pizzzzeria.com',
              code: authorizationCode,
            },
            {
              headers: {
                'Authorization': 'Basic cWdrbGgxdHAwM3R2cWF2MzlzamFhZmN0MjoxYXJybDA3dTdpYmI0Y3I4dmxvN3N0ZW50cm00Z2k5NmNoZmsxb2g1NDRtYXF2amxhMXI2',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
              }
            }
          )
          .then(({ tokens }) => {
            console.log('printing getUserTokens response', tokens)
            resolve(tokens)
          })
          .catch((error) => {
            console.log('printing getUserTokens request error', error);
          });
      })
    }

    const queryParams = new URLSearchParams(window.location.search);
    console.log('printing URLSearchParams', queryParams)
    
    Promise.all([getPizzas(), getExtras(), getUserTokens(queryParams)])
      .then(([pizzas, extras, tokens]) => {
        console.log('adding pizzas and extras to the state')
        setState({...State, Extras:extras, Pizzas:pizzas, User:tokens});
        console.log('printing state',State)
      })
      .catch((err)=>{
        console.log('promise all error', err)
      });

    
  }, []);
  return (
        <PizzaList></PizzaList>
     );
}

export default Home;

// curl -X POST https://pizzzzeria.auth.us-east-1.amazoncognito.com/oauth2/token&Content-Type='application/x-www-form-urlencoded'&Authorization=Basic grant_type=authorization_code&client_id=&code=AUTHORIZATION_CODE

// curl -X POST https://pizzzzeria.auth.us-east-1.amazoncognito.com/oauth2/token -H "Content-Type"="application/x-www-form-urlencoded" -H "Authorization"="Basic cWdrbGgxdHAwM3R2cWF2MzlzamFhZmN0MjoxYXJybDA3dTdpYmI0Y3I4dmxvN3N0ZW50cm00Z2k5NmNoZmsxb2g1NDRtYXF2amxhMXI2" -d '{"grant_type": "authorization_code", "client_id": "qgklh1tp03tvqav39sjaafct2", "client_secret": "1arrl07u7ibb4cr8vlo7stentrm4gi96chfk1oh544maqvjla1r6", "code": "d328df29-6421-47c3-9c12-23d24213f5f5"}' 
                            
//                             grant_type=authorization_code&
//                             client_id=1example23456789&
//                             code=AUTHORIZATION_CODE&
//                             redirect_uri=com.myclientapp://myclient/redirect

// curl -X GET https://pizzzzeria.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=qgklh1tp03tvqav39sjaafct2&response_type=code&scope=openid+profile+aws.cognito.signin.user.admin+email+phone&redirect_uri=https%3A%2F%2Fpizzzzeria.com&state=abcdefg"

// curl -X POST https://pizzzzeria.auth.us-east-1.amazoncognito.com/oauth2/token -H "Content-Type"="application/x-www-form-urlencoded" -H "Authorization"="Basic cWdrbGgxdHAwM3R2cWF2MzlzamFhZmN0MjoxYXJybDA3dTdpYmI0Y3I4dmxvN3N0ZW50cm00Z2k5NmNoZmsxb2g1NDRtYXF2amxhMXI2" -d "grant_type=authorization_code&client_id=qgklh1tp03tvqav39sjaafct2&client_secret=1arrl07u7ibb4cr8vlo7stentrm4gi96chfk1oh544maqvjla1r6&code=d7825675-d258-4d54-a84b-56db10b32d93&redirect_uri=https://pizzzzeria.com"
