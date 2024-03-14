import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import CreatePizza from './CreatePizza';
import PizzaList from './ListPizza';
import axios from "axios";

import { useContext } from 'react'
import { Context } from '../Context'

function Home() {

  const { State, setState } = useContext(Context)

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
    
  }, []);
  return (<PizzaList></PizzaList> );
}

export default Home;
