import React from 'react';
import {useState, setState} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {theme} from './theme.js';
import {Container, FormControl, TextField, Input, InputLabel} from '@mui/material';
export default function Priority() {
   
    return (
        <ThemeProvider theme={theme}>
        <Container align="center" sx={{width: '22vw'}}>
  
            
           
            <FormControl>
                
            <Typography variant='h6'  sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'space-between'}}>
                Meetings/Tasks
                <Button>+New</Button>
            </Typography>
                
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
        </ThemeProvider>
        
    )

};