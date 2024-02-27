import React from 'react';
import {useState, setState} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import {theme} from './theme.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {Container, FormControl, TextField, Input, InputLabel, TableContainer} from '@mui/material';

export default function HighLights() {
    let timestamps = ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM'];
 return (

    <TableContainer sx={{display: 'flex', flexDirection: 'col', height: '100vh', width: '25vw', right: '0px', mt: -10}}>
       
        <FormControl>
            <div style={{overflow: 'scroll'}}>
            <Typography align="center" variant='h4'>How was the day?</Typography>
            {
                timestamps.map(
                    (timestamp)=> (
                        
                        <TextField sx={{width: '25vw'}} label={timestamp} id={timestamp} variant='standard'/>
                        
                    )
                )
            }
            </div>
            <Container sx={{mt: 2, mx: 0, borderRadius: 0, boxshadow: '0', transform: 'scale(1.15)'}}>
                <Typography variant='h6'>
                    Highlight of Today
                </Typography>
                <Paper>
                <TextField variant='standard' multiline>Today was a great day</TextField>
                </Paper>
            </Container>
        </FormControl>
    </TableContainer>
 )
};