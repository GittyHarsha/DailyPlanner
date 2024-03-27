import React from 'react';
import {w, h} from '../services/dimensions.js';
import {useState, setState, useEffect} from 'react';
import { Button, Checkbox, Grid, Typography, Box, TextField, InputAdornment, IconButton, Icon, Tooltip} from '@mui/material';
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
import DeleteIcon from '@mui/icons-material/Delete';
import { transform } from 'lodash';
function HabitTracker({style}) {
  
     let [habits, setHabits] = useState([]);
     let [habit, setHabit] = useState(null);
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

  let local_month = curr_month;
  let local_year = curr_year;
  console.log("curr_month: ", curr_month);
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
    updateHabits(input);
  }
  
  function addHabit(event) {
  
     
      if(!habit) return;
      setAnchorEl(null);
      let habit_object = {
        name: habit,
        month: month.toString(),
        year: year.toString(),
        days: Array(daysInMonth[month]).fill(false)
      };
      console.log("adding a habit");
      add_object("HabitTracker", habit_object).then(
        (msg)=> {updateHabits(month); console.log(msg);}
      )

      
    
  }
  function updateHabits(month) {
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
            (msg)=> {console.log(msg); updateHabits(month);}
          )
        }
      )
  }

  function deleteHabit(target) {
    
        delete_object("HabitTracker", target).then(
          (msg)=> {console.log(msg); updateHabits(month);}
        )
  }
  useEffect(() => {
    updateHabits(month);
}, []);
  
  return (
    <ThemeProvider theme = {theme} style={{padding: 0}}>
   
    <TableContainer style={{  overflowX: 'scroll', pt: 0, ...(style? style: null)}}>
    <Box sx={{pb: 1,justifyContent: 'space-between',  display: "flex", flexDirection:"row", borderRadius: '1.125rem'}} style={{paddingLeft: '0px', paddingRight: '0px'}}>
          <Typography variant='h5' sx={{fontFamily:'Itim'}}>Habit Tracker</Typography>
          <Button onClick={handleClick} sx={{backgroundColor: 'white', color: 'black', boxShadow: '1', width: '7rem', height: '1.6526617647058823rem'}}>+Add Habit</Button>
          <Menu aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          anchorEl={anchorEl}
          aria-expanded={open ? 'true' : undefined}
          open={open}
          onClose={handleClose}
          >
          <MenuItem>
          <TextField 
         
         onChange={(e)=> {if(e.target.value.replace(/[\n\r]+$/, '') == habit){setAnchorEl(null); addHabit();}else{console.log("habit value: ", habit);setHabit(e.target.value)}}}

          InputProps={{
            style: {width: '15rem'},
            endAdornment: (
              <InputAdornment position="end">
              <IconButton>
                <img src='submit.png' style={{':hover': {cursor: 'pointer'}}} onClick={addHabit}/>
                </IconButton>
                
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          
          
          label="Add Habit"  multiline/>
         
          </MenuItem>
          </Menu>
    </Box>
   
      <Table >
          <TableRow sx={{backgroundColor: 'white', position: 'sticky', top: '0',zIndex: '1', mt: 1, borderTopLeftRadius: '4rem'}}
            style={{borderRadius: '16rem', height: `${h(25)}`}}
          >
            <TableCell sx={{width: '7vw', backgroundColor:'white', }}>
            <MonthDropdown onChange={handleMonth} default={month}></MonthDropdown>
            </TableCell> 
           
         
          {
            dates.map(
              (date)=> (
                <TableCell sx={{border: 'none', justifyContent:'center', width: '6vw'}}><Typography sx={{px: 'auto',backgroundColor: (date.num == curr_day)?'#dcdcdc': 'white', width: '1.0vw'}}>{date.num}</Typography></TableCell>
              )
            )
          }
          <TableCell  style={{ backgroundColor:'white'}}><DeleteIcon sx={{opacity: 0.6, visibility: 'hidden',}}/></TableCell>
          </TableRow>
          
       
        {
          
          habits.map(
            (habit) => (
              <TableRow sx={{backgroundColor: 'transparent', overflow: 'scroll', height: '1rem'}}>
                <TableCell> 
                  <Tooltip 
                 PopperProps={{
                  sx: {
                    "& .MuiTooltip-tooltip": {
                      color: "black",
                      backgroundColor: "white"
                    }
                  }
                }}
                title={<span>{habit.name}</span>}> <Typography noWrap sx={{width: '7vw',  m: 0, fontWeight:'bold'}} variant='h6'>{habit.name}</Typography></Tooltip></TableCell>
              
              {
              habit["days"].map(
                (day, index)=> (
                  <TableCell sx={{width: '10vw', backgroundColor: 'transparent'}}><Checkbox checked={day} onClick={()=> {handleCheck(habit.id, index);}} sx={{width: '1px', height: '1px' ,transform: 'scale(0.95)',backgroundColor: 'transparent', pt: 0, m:0}}/></TableCell>
                )
              )
              
            }
             <TableCell sx={{width: '10vw'}}> 
              
              <Typography customAttribute={habit.id} sx={{transform: 'scale(0.85)', width: '100%', p: 0, m: 0,':hover': {cursor: 'pointer', width: '100%',}}} onClick={(e)=> {deleteHabit(habit.id)}}><DeleteIcon sx={{opacity:0.6}}/></Typography>
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