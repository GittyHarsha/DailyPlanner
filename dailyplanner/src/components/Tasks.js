import React from 'react';
import {useState, setState} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {theme} from './theme.js';
import {Container, FormControl, TextField, Input, InputLabel} from '@mui/material';
export default function Tasks() {
   let [tasks, setTasks] = useState([]);
    return (
        <ThemeProvider theme={theme}>
        <Container align="center" sx={{width: 'auto',}}>
  
            
           
            <FormControl>
                
            <Typography variant='h6'  sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'space-between'}}>
                Meetings/Tasks
                <Button>+New</Button>
            </Typography>
            {
                tasks.map((task) => (
                    <Paper elevation='2' sx={{my: 1}}>
                    <TextField variant='standard' id='1'/>
                    </Paper>
                ))
            }
            </FormControl>
        </Container>
        </ThemeProvider>
        
    )

};