import React from 'react';
import {useState, setState} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import {theme} from './theme.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {Container, FormControl, TextField, Input, InputLabel} from '@mui/material';
export default function HighLights() {
    let timestamps = ['6AM', '7AM', '8AM', '9AM', '10AM'];
 return (
    <Container sx={{display: 'flex', flexDirection: 'col', backgroundColor: '#fafafa', width: '25vw'}}>
        <FormControl>
            {
                timestamps.map(
                    (timestamp)=> (
                        
                        <TextField label={timestamp} id={timestamp} variant='standard'/>
                        
                    )
                )
            }
            <Container sx={{mt: 2, mx: 0}}>
                <Typography variant='h6'>
                    Highlight of Today
                </Typography>
                <TextField multiline>Today was a great day</TextField>
            </Container>
        </FormControl>
    </Container>
 )
};