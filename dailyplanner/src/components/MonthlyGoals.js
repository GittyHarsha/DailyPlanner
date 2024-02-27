import React from 'react';
import {useState, setState, useContext, useEffect} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper, Menu, MenuItem} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {theme} from './theme.js';
import DeleteIcon from '@mui/icons-material/Delete';
import {Container, FormControl, TextField, Input, InputLabel} from '@mui/material';

import {add_object, delete_object, getAllObjects, connectToIndexedDB} from '../database/backend.js';
export default function MonthyGoals() {
   let [goals, setGoals] = useState([]);
   console.log("goals: ", goals);
   useEffect(
    () => {
        getAllObjects("MonthlyGoals").then((goals)=> {if(goals==undefined) {setGoals([])} else setGoals(goals);});
    }, []);
   
 
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
  function SetGoals() {
   
        getAllObjects("MonthlyGoals")
        .then(
        
            (goals)=> {
                setGoals(goals);
            }
        );
  }
    
  
   function addGoal(event) {

    if(event.key=='Enter') {
        let goal = event.target.value;
        console.log(goal);
        
        let curr_date = new Date();
        const newGoal = 
        {
            month: curr_date.getMonth(),
            year: curr_date.getFullYear(),
            goal: goal,
            checked: false,
            
        };        
      add_object("MonthlyGoals", newGoal).then(
        (message)=> {
            getAllObjects("MonthlyGoals")
            .then(
            
                (goals)=> {
                    setGoals(goals);
                }
            );
        }
      ).catch(
        (error)=> {console.log(error);}
      )

      }
   }
   function handleCheck(event) {
    let id=(event.currentTarget.getAttribute('customAttribute'));
    connectToIndexedDB().then(
      (db)=> {
        const transaction = db.transaction("MonthlyGoals", "readwrite");
        const objectStore = transaction.objectStore("MonthlyGoals");
        const getRequest = objectStore.get(id);
        getRequest.onsuccess = (event) =>{
          let obj = event.target.result; 
          obj.checked=!obj.checked;
          const putRequest = objectStore.put(obj);
          putRequest.onsuccess = (event) => {
            console.log("object with id: ", id, "updated successfully");
          }

        }
        transaction.onsuccess=(event) => {console.log("transaction success");}
        SetGoals();
        db.close();
      }
     
    )
   }
   function deleteGoal(event) {
    console.log("inside delete goal");
    console.log(event.currentTarget);
    let target=(event.currentTarget.getAttribute('customAttribute'));
      delete_object("MonthlyGoals", target).then(
        (message)=> {
            getAllObjects("MonthlyGoals")
            .then(
            
                (goals)=> {
                    setGoals(goals);
                }
            );
        }
      ).catch(
        (error)=> {console.log(error);}
      )
   }
    return (
        <ThemeProvider theme={theme}>
        <Container align="center" sx={{my: 1, minHeight: 150, maxHeight: 300, overflow: 'scroll'}}>
  
            
           
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
                    goals.length?(
                    goals.map((goal)=> {
                        return (
                    
                        <Paper id={goal.id} align="left" elevation='2' sx={{my: 0.5, width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                       
                        <div style={{display: 'inline-block', flexDirection:"row", justifyContent: 'space-between'}}>
                        <Checkbox checked={goal.checked} onClick={handleCheck} customAttribute={goal.id}/>
                        <span>id: {goal.id}</span> 
                       
                        </div>
                        <Button customAttribute ={goal.id}  onClick={deleteGoal}> <DeleteIcon customAttribute ={goal.id}/></Button>
                       
                       
                        </Paper>
                        )
                    })
                    ):( <p>No goals found.</p>)
                }
                    
                
            </FormControl>
        </Container>
        </ThemeProvider>
        
    )

};
/* 
<button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-127pno0-MuiButtonBase-root-MuiButton-root" tabindex="0" type="button"> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button>
*/