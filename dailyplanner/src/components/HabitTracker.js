import React from 'react';
import {useState, setState} from 'react';
import { Button, Checkbox, Grid, Typography, Box} from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {theme} from './theme.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';


function HabitTracker() {
      const habits = ['Exercise', 'Writing', 'Coding'];
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  /* 
  states: 
  1. month: it has range from 0 to 11. 0 maps to January, 1 maps to February and so on 
  */
  
 
  let [month, setMonth] = useState(0);
  let[dates, setDates] = useState(Array.from({length: daysInMonth[month]}, (_, i) => ({num: i+1, bool: Math.random() >= 0.5})));

  function handleMonth(input) {
    console.log("hello, input: ", input);
    setMonth(input);
    setDates(Array.from({length: daysInMonth[input]}, (_, i) => ({num: i+1, bool: Math.random() >= 0.5})));
  }
  
  return (
    <ThemeProvider theme = {theme}>
   
    <TableContainer>
    <Box sx={{justifyContent: 'space-between',  display: "flex", flexDirection:"row"}}>
          <Typography variant='h5'>Habit Tracker</Typography>
          <Button sx={{backgroundColor: 'white', borderRadius: '10%', color: 'black', boxShadow: '1'}}>+Add Habit</Button>
    </Box>
      <Table>
          <TableRow>
           <MonthDropdown onChange={handleMonth}></MonthDropdown>
          
          {
            dates.map(
              (date)=> (
                <TableCell><Typography>{date.num}</Typography></TableCell>
              )
            )
          }
          </TableRow>
        {
          
          habits.map(
            (habit) => (
              <TableRow>
              <TableCell><Typography variant='h6'>{habit}</Typography></TableCell>
              {
              dates.map(
                (date)=> (
                  <TableCell><Checkbox sx={{width: '1px', height: '1px' ,backgroundColor: 'white'}}/></TableCell>
                )
              )
            }
            </TableRow>
            )
          )
        }
      </Table>
    </TableContainer>
    </ThemeProvider>
  );
}

export default HabitTracker;



/* 

{
    habit_name: {
        january: []
    ]
}



*/