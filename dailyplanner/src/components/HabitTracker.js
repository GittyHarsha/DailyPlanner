import React from 'react';
import {useState, setState} from 'react';
import { Button, Checkbox, Grid, Typography, Box, TextField} from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {theme} from './theme.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CustomMenu from './MenuItem.js';

function HabitTracker() {
  
     let [habits, setHabits] = useState(['Exercise', 'Writing', 'Coding']);
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  /* 
  states: 
  1. month: it has range from 0 to 11. 0 maps to January, 1 maps to February and so on 
  */
  
 
  let [month, setMonth] = useState(0);
  let[dates, setDates] = useState(Array.from({length: daysInMonth[month]}, (_, i) => ({num: i+1, bool: Math.random() >= 0.5})));
  const [anchorEl, setAnchorEl] = useState(null);
  let open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("+ add habit clicked");
    console.log('target: ', event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleMonth(input) {
    console.log("hello, input: ", input);
    setMonth(input);
    setDates(Array.from({length: daysInMonth[input]}, (_, i) => ({num: i+1, bool: Math.random() >= 0.5})));
  }
  function addHabit(event) {
    if(event.key=='Enter') {
      console.log(event.target.value);
      let copy_habits = JSON.parse(JSON.stringify(habits));
      copy_habits.push(event.target.value)
      setHabits(copy_habits);
      console.log(copy_habits);
    }
  }

  function deleteHabit(event) {
    let target=(event.target.getAttribute('customAttribute')).trim();
    console.log(target=='Exercise');
    let copy_habits = JSON.parse(JSON.stringify(habits));
     copy_habits= copy_habits.filter((habit)=> {return habit!=target;});
      setHabits(copy_habits);
      console.log(copy_habits);
  }
  
  return (
    <ThemeProvider theme = {theme}>
   
    <TableContainer style={{maxHeight: 400, width: '100%', minHeight: 200}}>
    <Box sx={{justifyContent: 'space-between',  display: "flex", flexDirection:"row"}}>
          <Typography variant='h5'>Habit Tracker</Typography>
          <Button onClick={handleClick} sx={{backgroundColor: 'white', borderRadius: '10%', color: 'black', boxShadow: '1'}}>+Add Habit</Button>
          <Menu aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          anchorEl={anchorEl}
          aria-expanded={open ? 'true' : undefined}
          open={open}
          onClose={handleClose}
          >
          <MenuItem><TextField onKeyDown={addHabit}/></MenuItem>
          </Menu>
    </Box>
      <Table>
          <TableRow sx={{backgroundColor: 'white', border: 'none'}}>
           <MonthDropdown onChange={handleMonth}></MonthDropdown>
          
          {
            dates.map(
              (date)=> (
                <TableCell sx={{border: 'white'}}><Typography>{date.num}</Typography></TableCell>
              )
            )
          }
          </TableRow>
        {
          
          habits.map(
            (habit) => (
              <TableRow>
                <Typography variant='h6'>{habit}</Typography>
              {
              dates.map(
                (date)=> (
                  <TableCell><Checkbox customAttribute ={habit} sx={{width: '1px', height: '1px' ,backgroundColor: 'white'}}/></TableCell>
                )
              )
              
            }
             <TableCell>
              
              <Typography variant='h6'><Button customAttribute={habit} sx={{mx: 1,  transform: 'scale(0.65)'}} onClick={deleteHabit}>{'X'}</Button></Typography>
              </TableCell>
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