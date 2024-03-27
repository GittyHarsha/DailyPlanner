import {w, h} from '../services/dimensions.js'
import React from 'react';
import {useState, useEffect} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper, Menu, MenuItem, InputAdornment, IconButton} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from './theme.js';
import DeleteIcon from '@mui/icons-material/Delete';
import {Container, FormControl, TextField} from '@mui/material';

import {add_object, delete_object, getAllObjects, connectToIndexedDB} from '../database/backend.js';
export default function MonthyGoals({style}) {
   let [goals, setGoals] = useState([]);
   let [goal, setGoal] = useState(null);
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

    if(!goal) return;
    setAnchorEl(null);
        
        let curr_date = new Date();
        let newGoal = 
        {
            month: curr_date.getMonth()+1,
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
        <Container align="center" style={{paddingLeft: 10, paddingRight: 10}} sx={{my: 1, width: '100%', marginLeft: 0,
        ...(style? style: null)
      }}>
  
            
           
            <FormControl sx={{width: '100%'}}>
                
            <Typography variant='h5'  sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'space-between'}}>
              <div  style={{width: '100%', display:'flex', justifyContent:'space-between',padding:'0.5rem',}}> Monthly Goals
                <Button disableRipple onClick={handleClick} sx={{backgroundColor: 'white',color: 'black', boxShadow: '1', width: '7rem', height: '1.6526617647058823rem'}}>+Add Goal</Button></div>
               
          <Menu aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          anchorEl={anchorEl}
          aria-expanded={open ? 'true' : undefined}
          open={open}

          onClose={handleClose}
          style={{display: anchorEl? 'block':'none'}}
          >
          <MenuItem>
       
       
         
          <br/>
          <TextField 
          
          InputProps={{
            
            style: {width: '10rem'},
            endAdornment: (
              
              <InputAdornment position="end">
                <IconButton>
                <img src='submit.png' style={{':hover': {cursor: 'pointer'}}} onClick={addGoal}/>
                  
                </IconButton>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          
          label="Add Goal" multiline onChange={(e)=> {if(e.target.value.replace(/[\n\r]+$/, '') == goal){setAnchorEl(null); addGoal();}else{ console.log("goal value: ", goal);setGoal(e.target.value)}}}/>
        
          </MenuItem>
          </Menu>
            </Typography>
            <div style={{overflow: 'scroll', maxHeight: `${h(80)}`}}>
                {
                    goals.length?(
                    goals.map((goal)=> {
                        return (
                    
                        <Paper id={goal.id} align="left" elevation='2' sx={{my: 0.5, height:`${h(24)}` ,width: '100%', display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                       
                        <div style={{display: 'inline-block', flexDirection:"row", justifyContent: 'space-between'}}>
                        <Checkbox checked={goal.checked} onClick={handleCheck} customAttribute={goal.id}/>
                        <span>{goal.goal}</span> 
                       
                        </div>
                        <Button customAttribute ={goal.id}  sx={{height: '100%'}} onClick={deleteGoal}> <DeleteIcon sx={{opacity:0.6}} customAttribute ={goal.id}/></Button>
                       
                       
                        </Paper>
                        )
                    })
                    ):( <p>No goals found.</p>)
                }
            </div>
                
            </FormControl>
        </Container>
        </ThemeProvider>
        
    )

};
/* 
<button class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-127pno0-MuiButtonBase-root-MuiButton-root" tabindex="0" type="button"> <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button>
*/