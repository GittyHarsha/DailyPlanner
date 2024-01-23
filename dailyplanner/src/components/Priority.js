import React from 'react';
import {useState, setState} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {Container, FormControl, TextField, Input, InputLabel} from '@mui/material';
export default function Priority() {
   
    return (
        
        <Container align="center">
            <Typography variant='h5' >
                Top 3 Priority
            </Typography>
            <FormControl>
                
                <Paper elevation='2' sx={{my: 0.5}}>
                <TextField id='1'/>
                </Paper>
                <Paper elevation='2' id='2' sx={{my: 0.5}}>
                <TextField/>
                </Paper>
                <Paper elevation='2' id='3' sx={{my: 0.5}}>
                <TextField/>
                </Paper>
            </FormControl>
        </Container>
        
    )

};