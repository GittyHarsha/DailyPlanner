import React from 'react';
import {useState, setState, useEffect} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import {theme} from './theme.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {Container, FormControl, TextField, Input, InputLabel, TableContainer} from '@mui/material';
import {useForm, Controller, control} from 'react-hook-form';
import {get_object, add_object, update_object} from '../database/backend.js';

export default function HighLights() {
    const {register, handleSubmit, control, setValue} = useForm();
    useEffect(() => {
        let today = new Date();
        today = today.toDateString();
       
        get_object("Highlights", today).then(
    
            (data) => 
            {
                console.log("obtained data; ",data);
                for(let order in data ) {
                    console.log("order: ", order);
                    if(order!='date')
                    setValue(order ,data[order]);
                }
        }
        ).catch(
            (message) => {
                let obj={"date": today};
             
                
                console.log("key: ", today, "not found: ", obj);
                add_object("Highlights", obj).then((msg)=> {
                    console.log("new object added for today's current date", msg);
                });
            } 
        )
    });
    function onSubmit(data) {
        let today = new Date(); today = today.toDateString();
        console.log("form values: ", data);
        update_object('Highlights', {...data, "date": today}).then(
            (msg)=> {}
        );
    }
    let timestamps = ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM'];
 return (

    <TableContainer sx={{display: 'flex', flexDirection: 'col', height: '100vh', width: '25vw', right: '0px', mt: -10}}>
       
        <FormControl>
            <form onSubmit = {handleSubmit(onSubmit)}>
            <div style={{overflow: 'scroll'}}>
            <Typography align="center" variant='h4'>How was the day?
            <Button type='submit'>submit</Button>
            </Typography>
            {
                timestamps.map(
                    (timestamp)=> (
                        <Controller
                name={timestamp}
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField {...field} sx={{width: '25vw'}} label={timestamp} variant='standard'/>
                )}
            />
                       
                        
                    )
                )
            }
            </div>
            <Container sx={{mt: 2, mx: 0, borderRadius: 0, boxshadow: '0', transform: 'scale(1.15)'}}>
                <Typography variant='h6'>
                    Highlight of Today
                </Typography>
                <Paper>
                <Controller
                name="highlight_of_the_day"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField {...field} sx={{width: '25vw'}} multiline variant='standard'/>
                )}
            />
                </Paper>
            </Container>
            </form>
        </FormControl>
    </TableContainer>
 )
};