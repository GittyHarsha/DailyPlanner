import React from 'react';
import {useState, setState} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {Container, FormControl, TextField, Input, InputLabel, Menu, MenuItem} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
export default function Priority() {
    let [num, setNum] = useState(3);
    function addPriority(e) {
        setNum(e.target.value);
    }
    
    return (
        
        <Container align="center">
          
            <Typography variant='h5'align='center' >
                Top 3 Priority
            </Typography>
            <Menu>
            <MenuItem>
          <TextField onKeyDown={addPriority}/>
          </MenuItem>
            </Menu>
            <FormControl>
                
            <Paper elevation='2' id='2' sx={{my: 1}}>
                <TextField variant='standard' />
                </Paper>
                <Paper elevation='2' id='2' sx={{my: 1}}>
                <TextField variant='standard' />
                </Paper>
                <Paper elevation='2' id='2' sx={{my: 1}}>
                <TextField variant='standard' />
                </Paper>
            </FormControl>
        </Container>
        
    )

};