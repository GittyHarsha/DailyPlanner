import React from 'react';
import {w, h} from '../services/dimensions.js';
import {useState, setState, useEffect} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import dayjs from 'dayjs';
import {theme} from './theme.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {Container, FormControl, TextField, Input, InputLabel, TableContainer} from '@mui/material';
import {useForm, Controller, control} from 'react-hook-form';
import {get_object, add_object, update_object} from '../database/backend.js';
import _ from 'lodash';
export default function HighLights({style, date}) {
    let today = dayjs().format('DD-MM-YYYY');
  
    console.log("highlights: date obtained: ", date);
    const {register, handleSubmit, control, setValue, getValues, getValue, formState: {dirty}} = useForm();

    let [disable, setDisable] = useState(false);
    let [highlights, setHighlights] = useState({});
    
    function check_disable(curr, target) {
        curr=curr.startOf('day');
        target = target.startOf('day');
        if(curr.isBefore(target && !disable)) {
            setDisable(true);
        }
    }
    
    
    
    useEffect(() => {
        
        let today = new Date();
        today = today.toDateString();
        let data={};
       for(let timestamp of timestamps) {
        data.timestamp='';
       }
       setHighlights(data);
        get_object("Highlights", today).then(
    
            (data) => 
            {
                console.log("obtained data; ",data);
                
                for(let timestamp of timestamps) {
                    if(!data[timestamp]) {
                        data[timestamp]='';
                    }
                }
                setHighlights(data);
             
                for(let order in data ) {
                    console.log("order: ", order);
                    if(order!='date') {
                    setValue(order ,data[order]);
                   
                    }
                   console.log("highlights: ", highlights);
                }
        }
        ).catch(
            (message) => {
                let obj={"date":today, "dayjs":dayjs()};
             
                add_object("Highlights", obj).then((msg)=> {
                   
                }).catch((msg)=> {console.log(msg)});
            } 
        )
    }, []);
    function onSubmit(data) {

        console.log("form values: ", data);
        update_object('Highlights', {...data, "date": today, "dayjs":dayjs()}).then(
            (msg)=> {}
        );
    }
    const debouncedSubmit = _.debounce(() => {
        
     
            let data = getValues();
            console.log("debounce dude");
            update_object('Highlights', {...data, "date": today, "dayjs": dayjs()}).then(
                (msg)=> {}
            );
        
      
      }, 1000);
    let timestamps = ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM', '12AM'];
 return (
    <ThemeProvider theme={theme}>
       
    <Container sx={{display: 'flex', flexDirection: 'column', width: '10.13355997624703rem',   overflowX: 'hidden', margin:0, transform: 'scale(1.0)', overflowY:'hidden',
        ...(style? style:null),
    }}>
        <div>
        <Typography align="center" sx={{fontFamily: 'Itim',m:0,}} variant='h4'>How was the day?
          
          </Typography>
        </div>
           
            <div>
            <div style={{overflowY: 'scroll', height: '68%', zIndex:10}}>
            
            {
                timestamps.map(
                    (timestamp)=> (
                       
               
                <div style={{display: 'flex', justifyContent: 'space-between', width: '95%'}}>
                   <Typography sx={{fontFamily: 'Inria Sans', pt: 2}}>{timestamp}: </Typography> <TextField  defaultValue={highlights[timestamp]}multiline InputProps = {{style: {fontSize: '1.25rem'}}} name={timestamp} onChange = {(event)=> {setValue(timestamp.toString(), event.target.value); console.log("timetamps"); debouncedSubmit()}} sx={{width: '30vw', left: '0.5rem', right: '0px'}} variant='standard'/>
                   </div>
                
            
                       
                        
                    )
                )
            }
            </div>
            <div style={{ marginLeft: 0, borderRadius: 0, boxshadow: '0', transform: 'scale(1.0)', position:'fixed', bottom: '0.2rem', width: `${w(234)}`}}>
                <Typography variant='h6' sx={{my: 1}}>
                    Highlight of Today
                </Typography>
                <Paper sx={{width: `${w(230)}`}}>
                    <TextField  InputProps={{ disableUnderline: true,}} name="highlight_of_the_day"  onChange = {(event)=> {setValue("hightlight_of_the_day", event.target.value); console.log("hello there");debouncedSubmit()}}sx={{width: `${w(230)}`, left: '5px'}} multiline variant='standard'/>
                </Paper>
            </div>
            </div>
  
    </Container>
    </ThemeProvider>
 )
};