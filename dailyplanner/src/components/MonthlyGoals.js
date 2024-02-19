import React from 'react';
import {useState, setState} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper, Menu, MenuItem} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {theme} from './theme.js';
import DeleteIcon from '@mui/icons-material/Delete';
import {Container, FormControl, TextField, Input, InputLabel} from '@mui/material';
export default function MonthyGoals() {
   let [goals, setGoals] = useState(['finish chrome extension']);
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
   function addGoal(event) {
    if(event.key=='Enter') {
        console.log(event.target.value);
        let copy_goals = JSON.parse(JSON.stringify(goals));
        copy_goals.push(event.target.value)
        setGoals(copy_goals);
        console.log(copy_goals);
      }
   }

   function deleteGoal(event) {
    console.log("inside delete goal");
    console.log(event.target);
    let target=(event.target.getAttribute('customAttribute'));
    console.log("target: ",target);
    let copy_goals = JSON.parse(JSON.stringify(goals));
     copy_goals= copy_goals.filter((goal)=> {return goal!=target;});
      setGoals(copy_goals);
      console.log(copy_goals);
   }

    return (
        <ThemeProvider theme={theme}>
        <Container align="center" sx={{width: '50vw',  my: 2, maxHeight: '30vh', overflow: 'scroll'}}>
  
            
           
            <FormControl sx={{width: '100%'}}>
                
            <Typography variant='h6'  sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'space-between'}}>
                Monthly Goals
                <Button onClick={handleClick} sx={{backgroundColor: 'white', borderRadius: '10%', color: 'black', boxShadow: '1'}}>+Add Goal</Button>
          <Menu aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          anchorEl={anchorEl}
          aria-expanded={open ? 'true' : undefined}
          open={open}
          onClose={handleClose}
          >
          <MenuItem><TextField onKeyDown={addGoal}/></MenuItem>
          </Menu>
            </Typography>
            
                {
                    goals.map((goal)=> {
                        return (
                    
                        <Paper align="left" elevation='2' sx={{my: 0.5, width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                       
                        <div style={{display: 'inline-block', flexDirection:"row", justifyContent: 'space-between'}}>
                        <Checkbox/>
                        <span>{goal}</span> 
                       
                        </div>
                        <Button customAttribute ={goal}  onClick={deleteGoal}> <DeleteIcon customAttribute ={goal}/></Button>
                       
                       
                        </Paper>
                        )
                    })
                    
                }
            </FormControl>
        </Container>
        </ThemeProvider>
        
    )

};