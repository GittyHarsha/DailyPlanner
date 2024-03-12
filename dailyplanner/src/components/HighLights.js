import React from 'react';
import {useState, setState, useEffect} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import {theme} from './theme.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {Container, FormControl, TextField, Input, InputLabel, TableContainer} from '@mui/material';
import {useForm, Controller, control} from 'react-hook-form';
import {get_object, add_object, update_object} from '../database/backend.js';
import _ from 'lodash';
export default function HighLights() {
    const {register, handleSubmit, control, setValue, getValues, getValue, formState: {dirty}} = useForm();
    let [highlights, setHighlights] = useState({});
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
                let obj={"date": today};
             
                add_object("Highlights", obj).then((msg)=> {
                   
                }).catch((msg)=> {console.log(msg)});
            } 
        )
    }, []);
    function onSubmit(data) {
        let today = new Date(); today = today.toDateString();
        console.log("form values: ", data);
        update_object('Highlights', {...data, "date": today}).then(
            (msg)=> {}
        );
    }
    const debouncedSubmit = _.debounce(() => {
        
       
            let today = new Date(); today = today.toDateString();
            let data = getValues();
            console.log("debounce dude");
            update_object('Highlights', {...data, "date": today}).then(
                (msg)=> {}
            );
        
      
      }, 3000); // Delay submission by 750ms
    let timestamps = ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM', '12AM'];
 return (

    <TableContainer sx={{display: 'flex', flexDirection: 'col', height: 'auto', width: '25vw', right: '0px', mt: -10, overflowX: 'hidden'}}>
    
        <FormControl>
            <form onSubmit = {handleSubmit(onSubmit)}>
            <Typography align="center" sx={{fontFamily: 'Itim' }} variant='h4'>How was the day?
          
            </Typography>
            <div style={{overflow: 'scroll', maxHeight: '80vh'}}>
            
            {
                timestamps.map(
                    (timestamp)=> (
                       
               
                <div style={{display: 'flex', justifyContent: 'space-between', width: '95%'}}>
                   <Typography sx={{fontFamily: 'Inria Sans', pt: 2}}>{timestamp}: </Typography> <TextField  defaultValue={highlights[timestamp]}multiline InputProps = {{style: {fontSize: '1.25rem'}}} name={timestamp} onChange = {(event)=> {setValue(timestamp.toString(), event.target.value); console.log("timetamps"); debouncedSubmit()}} sx={{width: '25vw', left: '0.5rem', right: '0px'}} variant='standard'/>
                   </div>
                
            
                       
                        
                    )
                )
            }
            </div>
            <Container sx={{mt: 2, mx: 0, borderRadius: 0, boxshadow: '0', transform: 'scale(1.15)'}}>
                <Typography variant='h6'>
                    Highlight of Today
                </Typography>
                <Paper>
                    <TextField  InputProps={{ disableUnderline: true,}} name="highlight_of_the_day"  onChange = {(event)=> {setValue("hightlight_of_the_day", event.target.value); console.log("hello there");debouncedSubmit()}}sx={{width: '25vw', left: '5px'}} multiline variant='standard'/>
                </Paper>
            </Container>
            </form>
        </FormControl>
    </TableContainer>
 )
};