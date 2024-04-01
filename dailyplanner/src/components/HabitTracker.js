import React from 'react';
import {w, h} from '../services/dimensions.js';
import {useState, useEffect} from 'react';
import { Button, Checkbox, Typography, Box, TextField, InputAdornment, IconButton, Tooltip} from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {theme} from './theme.js';
import { ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {get_object, add_object, update_object, delete_object, getAllIndex,} from '../database/backend.js';
import DeleteIcon from '@mui/icons-material/Delete';

import dayjs from 'dayjs';
function HabitTracker({style, date, id}) {
    let [disable, setDisable] = useState(false);
     let [habits, setHabits] = useState([]);
     let [habit, setHabit] = useState(null);
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  /* 
  states: 
  1. month: it has range from 0 to 11. 0 maps to January, 1 maps to February and so on 
  */


  let curr_day = date.date();
  let [month, setMonth] = useState(date.month());
  
  let [year, setYear] = useState(date.year());

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

  function check_disable(curr, target) {
    curr=curr.year();
    target = target.year();
   
    if(curr<target && !disable) {
        setDisable(true);
  
    }
    }
    check_disable(date, dayjs());
    

  function handleMonth(month) {
    
    setMonth(month);
  
    setDates(Array.from({length: daysInMonth[month]}, (_, i) => ({num: i+1, bool: Math.random() >= 0.5})));
    updateHabits(month, year);
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
        (msg)=> {updateHabits(month, year); console.log(msg);}
      )

      
    
  }
  function updateHabits(month, year) {
    
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
          setHabits([]);
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
            (msg)=> {console.log(msg); updateHabits(month, year);}
          )
        }
      )
  }

  function deleteHabit(target) {
    
        delete_object("HabitTracker", target).then(
          (msg)=> {console.log(msg); updateHabits(month, year);}
        )
  }
  useEffect(() => {
    updateHabits(month, year);
}, []);
  
  return (
    <ThemeProvider theme = {theme} style={{padding: 0}}>
   
    <TableContainer id={id} style={{  overflowX: 'scroll', pt: 0,
   
    ...(style? style: null)}}>
    <Box sx={{pb: 1,justifyContent: 'space-between',  display: "flex", flexDirection:"row", borderRadius: '1.125rem'}} style={{paddingLeft: '0px', paddingRight: '0px'}}>
          <Typography variant='componentHeading'>Habit Tracker</Typography>
          <Button disabled={disable} onClick={handleClick} sx={{backgroundColor: 'white', color: 'black', boxShadow: '1', width: 'auto', height: `${h(20)}`}}>+Add Habit</Button>
          <Menu aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          anchorEl={anchorEl}
          aria-expanded={open ? 'true' : undefined}
          open={open}
          onClose={handleClose}
          >
          <MenuItem style={{height:'auto'}}>
          <TextField 
         
         onChange={(e)=> {if(e.target.value.replace(/[\n\r]+$/, '') === habit){setAnchorEl(null); addHabit();}else{console.log("habit value: ", habit);setHabit(e.target.value)}}}

          InputProps={{
            style: {width: `${w(110)}`},
            endAdornment: (
              <InputAdornment position="end">
              <IconButton>
                <img src='submit.png' alt='submit' style={{':hover': {cursor: 'pointer'}}} onClick={addHabit}/>
                </IconButton>
                
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          
          
          label="`Enter Habit"  multiline/>
         
          </MenuItem>
          </Menu>
    </Box>
   
      <Table >
          <TableRow sx={{backgroundColor: 'white', position: 'sticky', top: '0',zIndex: '1', mt: 1, borderTopLeftRadius: '4rem'}}
            style={{borderRadius: '16rem', height: `${h(25)}`}}
          >
            <TableCell sx={{width: '7vw', backgroundColor:'white', }}>
            <MonthDropdown disabled={disable} onChange={handleMonth} default={month}></MonthDropdown>
            </TableCell> 
           
         
          {
            dates.map(
              (date)=> (
                <TableCell sx={{border: 'none', justifyContent:'center', width: '3vw'}}><Typography sx={{px: 'auto',backgroundColor: (date.num ===curr_day)?'#dcdcdc': 'white', width: '1.0vw'}}>{date.num}</Typography></TableCell>
              )
            )
          }
          <TableCell  style={{ backgroundColor:'white'}}><DeleteIcon sx={{opacity: 0.6, visibility: 'hidden',}}/></TableCell>
          </TableRow>
          
       
        {
          
          habits.map(
            (habit) => (
              <TableRow sx={{backgroundColor: 'transparent', overflow: 'scroll', height: '1vh',}}>
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
                title={<span style={{}}>{habit.name}</span>}> <Typography noWrap sx={{width: '7vw',  m: 0, fontWeight:'bold', fontSize:'2vh'}}>{habit.name}</Typography></Tooltip></TableCell>
              
              {
              habit["days"].map(
                (day, index)=> (
                  <TableCell sx={{width: '10vw', backgroundColor: 'transparent'}}><Checkbox disabled={disable} checked={day} onClick={()=> {handleCheck(habit.id, index);}} sx={{width: '1px', height: '1px' ,transform: 'scale(0.95)',backgroundColor: 'transparent', pt: 0, m:0}}/></TableCell>
                )
              )
              
            }
             <TableCell sx={{width: '10vw'}}> 
              
              <Typography customAttribute={habit.id} sx={{transform: 'scale(0.85)', width: '100%', p: 0, m: 0,':hover': {cursor: 'pointer', width: '100%',}}} onClick={(e)=> {if(!disable)deleteHabit(habit.id)}}><DeleteIcon sx={{opacity:0.6}}/></Typography>
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