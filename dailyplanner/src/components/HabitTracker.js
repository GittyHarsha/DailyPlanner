import React from 'react';
import {useState, setState, useEffect} from 'react';
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
import {get_object, add_object, update_object, delete_object, getAllIndex, deleteObject} from '../database/backend.js';

function HabitTracker() {
  
     let [habits, setHabits] = useState([]);
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  /* 
  states: 
  1. month: it has range from 0 to 11. 0 maps to January, 1 maps to February and so on 
  */
  let curr_date = new Date();
  let today = curr_date.toDateString();
  let curr_day = curr_date.getDate();
  let curr_year = curr_date.getFullYear();
  let curr_month = curr_date.getMonth();

  

  console.log("today: ", curr_day);
  let [month, setMonth] = useState(curr_month);
  let [year, setYear] = useState(curr_year);

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
      let habit = {
        name: event.target.value,
        month: curr_month.toString(),
        year: curr_year.toString(),
        days: Array(daysInMonth[curr_month]).fill(false)
      };
      console.log("adding a habit");
      add_object("HabitTracker", habit).then(
        (msg)=> {updateHabits(); console.log(msg);}
      )

      
    }
  }
  function updateHabits() {
    console.log("month: ", month.toString());
    console.log("year: ", year.toString());
    getAllIndex("HabitTracker", "MonthYearIndex", [month.toString(), year.toString()]).then(

      (data) => 
      {
          console.log("obtained data; ",data);
          setHabits(data);
  }
  ).catch(
      (message) => {
          console.log(message);
      } 
  )
  }

  function handleCheck(id, index) {
      get_object("HabitTracker", id)
      .then(
        (habit)=> {
          let habit_copy = {...habit};
          habit_copy.days[index]=!habit_copy.days[index];
          update_object("HabitTracker", habit_copy).then(
            (msg)=> {console.log(msg); updateHabits();}
          )
        }
      )
  }

  function deleteHabit(event) {
    let target=(event.target.getAttribute('customAttribute')).trim();
        delete_object("HabitTracker", target).then(
          (msg)=> {console.log(msg); updateHabits();}
        )
  }
  useEffect(() => {
    updateHabits();
}, []);
  
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
           <MonthDropdown onChange={handleMonth} default={month}></MonthDropdown>
          
          {
            dates.map(
              (date)=> (
                <TableCell sx={{border: 'white', justifyContent:'center',}}><Typography sx={{px: 'auto',backgroundColor: (date.num == curr_day)?'lightgreen': 'white', borderRadius: '50%'}}>{date.num}</Typography></TableCell>
              )
            )
          }
          </TableRow>
        {
          
          habits.map(
            (habit) => (
              <TableRow>
                <Typography variant='h6'>{habit.name}</Typography>
              {
              habit["days"].map(
                (day, index)=> (
                  <TableCell><Checkbox checked={day} onClick={()=> {handleCheck(habit.id, index);}} sx={{width: '1px', height: '1px' ,backgroundColor: (day == curr_day)?'pink': 'white'}}/></TableCell>
                )
              )
              
            }
             <TableCell>
              
              <Typography variant='h6'><Button customAttribute={habit.id} sx={{mx: 1,  transform: 'scale(0.65)'}} onClick={deleteHabit}>{'X'}</Button></Typography>
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