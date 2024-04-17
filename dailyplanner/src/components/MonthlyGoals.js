import {w, h} from '../services/dimensions.js'
import React from 'react';
import {useState, useEffect, createRef, forwardRef} from 'react';
import { Button, Checkbox, Typography, Paper, Menu, MenuItem, InputAdornment, IconButton, TableContainer} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import {theme} from './theme.js';
import DeleteIcon from '@mui/icons-material/Delete';
import {Container, FormControl, TextField} from '@mui/material';

import {add_object, delete_object, getAllObjects, connectToIndexedDB, getAllIndex} from '../database/backend.js';
export default function MonthyGoals({style, date, id}) {
   let [goals, setGoals] = useState([]);
   let [goal, setGoal] = useState(null);
   let [disable, setDisable] = useState(false);
   let month =date.month().toString();
   let year = date.year().toString();

   function check_disable(curr, target) {
    curr=curr.startOf('day');
    target = target.startOf('day');
    if(curr.isBefore(target) && !disable) {
        setDisable(true);
  
    }
    }
   check_disable(date, dayjs());
   console.log("goals: ", goals);
   useEffect(
    () => {
        getAllIndex("MonthlyGoals", "MonthYearIndex", [month, year]).then((goals)=> {setGoals(goals);}).catch((err)=> {setGoals([])});
    }, []);
   
 
   const [anchorEl, setAnchorEl] = useState(null);
  let open = Boolean(anchorEl);
  const handleClick = (event) => {
    if(disable) return;
   
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
        
        let curr_date = dayjs();
        let newGoal = 
        {
            month: curr_date.month().toString(),
            year: curr_date.year().toString(),
            goal: goal,
            checked: false,
            
        };        
      add_object("MonthlyGoals", newGoal).then(
        
        (message)=> {
            getAllIndex("MonthlyGoals", "MonthYearIndex", [month, year])
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
    if(disable) return;
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
        <TableContainer id={id}align="center" style={{paddingLeft: 10, paddingRight: 0,...(style?style:null)}} sx={{my: 1, mx:0, overflow:'clip',
        
      }}>
  
            
           
            <FormControl sx={{width: '100%'}}>
                
            <Typography variant='h5'  sx={{mx:0,display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'space-between'}}>
              <div  style={{width: '100%', display:'flex', justifyContent:'space-between',padding:'0.5vw', paddingRight: '1vw', paddingTop:'0.05vh', paddingBottom:'0.05vh',fontSize:'2.5vh', fontFamily:'Arial'}}> Monthly Goals
                <Button disabled={disable} disableRipple onClick={handleClick} sx={{backgroundColor: 'white',color: 'black', boxShadow: '1', width: 'auto', }}>+Add Goal</Button></div>
               
          <Menu aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          anchorEl={anchorEl}
          aria-expanded={open ? 'true' : undefined}
          open={open}

          onClose={handleClose}
          style={{display: anchorEl? 'block':'none'}}
          >
         
       
      
          <TextField 
          sx={{'& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: 'gray',
          },}}
          autoFocus 
          variant ={'outlined'}
        
          InputProps={{
            
            style: {width: `${w(110)}`},
            endAdornment: (
              
              <InputAdornment position="end">
                <IconButton>
                <img src='submit.png' alt='submit.png' style={{':hover': {cursor: 'pointer'}}} onClick={addGoal}/>
                  
                </IconButton>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
         
          label="*Enter Goal" multiline onChange={(e)=> {if(e.target.value.replace(/[\n\r]+$/, '') === goal){setAnchorEl(null); addGoal();}else{ console.log("goal value: ", goal);setGoal(e.target.value)}}}/>
       
          </Menu>
            </Typography>
            <div style={{overflow: 'scroll', height:'15vh',maxHeight: '15vh', paddingBottom:'0px'}}>
                {
                    goals.length?(
                    goals.map((goal)=> {
                        return (
                    
                        <Paper id={goal.id} align="left" elevation='2' sx={{my: 0.5, height:`${h(24)}` ,width: '98%', display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                       
                        <div style={{display: 'inline-block', flexDirection:"row", justifyContent: 'space-between'}}>
                        <Checkbox disabled={disable} checked={goal.checked} onClick={handleCheck} customAttribute={goal.id}/>
                        <span>{goal.goal}</span> 
                       
                        </div>
                       <DeleteIcon  onClick={deleteGoal} visible={disable? 'hidden': 'visible'} sx={{opacity:0.6, mx: 2, '&:hover': {cursor:'pointer'}}} customAttribute ={goal.id}/>
                       
                       
                        </Paper>
                        )
                    })
                    ):( <p></p>)
                }
            </div>
                
            </FormControl>
        </TableContainer>
        </ThemeProvider>
        
    )

};
