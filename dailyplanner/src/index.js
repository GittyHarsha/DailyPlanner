import React from 'react';

import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {getAllIndex} from './database/backend';
import dayjs from 'dayjs';
import axios from 'axios';
const root = ReactDOM.createRoot(document.getElementById('root'));
let d = document.getElementById('root');
console.log("client width: ",d.clientWidth);
if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}


/*
let today = dayjs().format('DD-MM-YYYY');
 getAllIndex("ApiCache", "DateTypeIndex",[today, 'quote']).then(
                    (res)=> {
                         
                           setQuote(res.content.quote);
                           alert("quote set");
                         
                    }
                  )

getAllIndex("ApiCache", "DateTypeIndex", [today, 'quote']).then(
  (e)=> {
    alert("found indexes", e);
  }

).catch(err=> alert("couldnt find index"))*/
root.render(
  <App/>
   

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
