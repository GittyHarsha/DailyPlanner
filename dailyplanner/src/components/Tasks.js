import React from 'react';
import FlexDiv from './FlexDiv.js'
import {useState, setState, useEffect} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Done from '@mui/icons-material/Done'

import {w, h} from '../services/dimensions.js';

import Divider from '@mui/material/Divider';
import _ from 'lodash';
import dayjs from 'dayjs';
import DatePicker from "./DatePicker.js";
import TimePicker from "./TimePicker.js";
import {theme} from './theme.js';
import {useForm, Controller, control} from 'react-hook-form';
import {get_object, add_object, update_object, getAllObjects, delete_object, connectToIndexedDB} from '../database/backend.js';
import {Container, FormControl, TextField, Input, InputLabel, Menu, MenuItem} from '@mui/material';
import PopUpMenu from './PopupMenu.js';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Tasks({style}) {
   let [tasks, setTasks] = useState([]);
   const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
   let [tasksData, setTaskData] = useState({});
   let [date, setDate] = useState({"date": null, "time: ": null});
   let tasks_data={};
   let [detach, setDetach] = useState(false);
   
   const {register, handleSubmit, control, setValue, getValues} = useForm();
   const [anchorEl, setAnchorEl] = useState(null);
   let open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
     let _date = {...date};
     _date["date"]=null;
     _date["time"]=null;
     setDate(_date);
    
  
   };
   const handleClose = () => {
     setAnchorEl(null);
   };
   function convertTo12HourFormat(hour, minute) {
    let period = 'AM';
    if (hour >= 12) {
        period = 'PM';
    }
    if (hour === 0) {
        hour = 12;
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    minute = minute < 10 ? '0' + minute : minute;
    return `${hour}:${minute} ${period}`;
}
function isBeforeCurrentTime(year, month, day, hour, minute) {
  
    const inputTime = dayjs(new Date(year, month, day, hour, minute));
    
   
    const currentTime = dayjs();
    
   
    return inputTime.isBefore(currentTime);
  }
  
 

  
   function updateTasks() {
    let today = new Date();
        today = today.toDateString();
        connectToIndexedDB().then(
            (db)=> {
                let transaction = db.transaction("Tasks", "readwrite");
                let store = transaction.objectStore("Tasks");
                let cursorRequest = store.openCursor();
  
                cursorRequest.onsuccess = function(e) {
                    let cursor = e.target.result;
                    let today = dayjs();
                    if (cursor) {
                    if(cursor.value.status==true) {
                        cursor.delete();
                    }
                
                        let value = cursor.value;
                     
                        if(isBeforeCurrentTime(value.year, value.month, value.day, value.hour, value.minute)) {
                            cursor.delete();
                        }
                        
                    
                    
                    
                    cursor.continue(); // Move to the next object
                    } else {
                    // No more entries
                
                    }
                };
                
                cursorRequest.onerror = function(e) {
                 
                };
            }
        );
        
    getAllObjects("Tasks").then(

        (data) => 
        {
           
            setTasks(data);
           
            for(let task of data) {
                tasks_data[task.id] = task;
            }
            setTaskData(tasks_data);
          
          
        }
    ).catch(
        (message) => {
            let obj={"date": today};
       
            add_object("Tasks", obj).then((msg)=> {
            
            });
        } 
    )
    
}
function flush_form(data) {
    for(let [key, value] of Object.entries(data)) {
        data[key]=null;
        setValue(key, null);
    }
    
}
   function onSubmit(data) {
    setAnchorEl(null);
   
    let obj={};
    if(!data.title || !data.date) {

      
        
        return;
    }


    obj["title"] = data.title;
    obj["description"] = data.description;
   
    if(!data.date) {
        obj["month"] = null
        obj["year"] = null;
        obj["day"]=null;
        
    }
    else {
      
        obj["day"] = data.date.date();
   
        obj["month"] = data.date.get('month');
        obj["year"] = data.date.get('year');
    }
    
    obj["status"] = false;
    if(data.time) {

    obj["time"] = convertTo12HourFormat(data.time.hour(), date.time.minute());
    obj['hour']=data.time.hour();
    obj['minute'] = data.time.minute();
    
    }
    else{

        obj["time"] = convertTo12HourFormat(23, 59);
       
        
    
    }

   add_object("Tasks", obj).then(
    (msg)=> {
        
        updateTasks();
    }
   );


    
}


function handleDelete(id) {
    delete_object("Tasks", id).then((msg)=>{ updateTasks();});
}

function update_task(data, id) {

    

    

   update_object("Tasks", data).then(
    (msg)=> {
        updateTasks();
    }
   );
}

   
    useEffect(() => {
        updateTasks();    
    
    },[]);

    useEffect(()=> {tasks_data = tasksData;})
    
    let component_width = `${w(247)}`;
  
   
    return (
        <ThemeProvider theme={theme} >
        <div style={{paddingLeft: '0', paddingRight: '0',
            ...(style? style: null)
        }}>          
   
            <Box sx={{justifyContent: 'space-between',  display: "flex", flexDirection:"row"}}>
          <Menu aria-controls={open ? 'basic-menu' : undefined}
          disableRipple
          aria-haspopup="true"
          anchorEl={anchorEl}
          aria-expanded={open ? 'true' : undefined}
          open={open}
          onClose={handleClose}
          sx={{backgroundColor: 'F0ECEC50'}}
          >
            <MenuItem disableRipple>
            <form  onSubmit = {handleSubmit(onSubmit)} style={{width: '20vw', height: '28vh', display: 'flex', flexDirection:'column', alignItems:'space-between', justifyContent:'space-between', 
            backgroundColor: '#F0ECEC50'
        }}>
                    <div>
                    <TextField 
                    onChange={(e)=> {setValue("title", e.target.value)}}
                    label="Title"
                    variant='outlined'  
                    style={{left: '5px', width: '100%'}}
                   />
                   </div>
                   <div>
                   <TextField 
                    onChange={(e)=> {setValue("description", e.target.value)}}
                    label="Link/Description"
                    variant='outlined'  
                    style={{left: '5px', width: '100%'}}
                   />
                    </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '100%', margin: 0}}>
                   <DatePicker onChange={(newValue)=>{setValue("date", newValue); let _date = {...date};_date["date"]=newValue; setDate(_date);}} />
                   
                    <TimePicker onChange={(newValue)=> {setValue("time", newValue); let _date = {...date}; _date["time"] = newValue; setDate(_date); }} />
                  <img style={{transform: 'scale(1.0)'}} onClick={handleSubmit(onSubmit)}src='submit.png' alt="submit"/>
                    </div>
                <br/>
              
              
            </form>
            </MenuItem>
            
          </Menu>
    </Box>
        <Container align="center" sx={{width: '100%',}} style={{paddingLeft: 0, paddingRight: 0, height: '100%', overflow: 'scroll',  ...(style? style: null)}}>
  
            
           
            <FormControl style={{width: '99%', marginLeft: '0.25rem'}}>
                <div style={{display: 'flex', width: '100%', justifyContent:'space-between', alignItems:'center',}}>
            <Typography variant='h5'  sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row', width: '95%'}, justifyContent: 'space-between',}} style={{padding: '0.5rem'}}>
                Tasks
                </Typography>
                <Button onClick={(e)=>{flush_form(getValues()); handleClick(e);}} sx={{backgroundColor: 'white', boxShadow: 1, height:`${h(20)}`, width: `${w(57)}`}}>+New</Button>
                </div>
            <div style={{padding: '0px', width: '100%'}}>
            {
                tasks.map((task) => (
                    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center',}}>
                       
                    <Paper elevation='2' sx={{marginLeft:'0.05rem' ,my: 1, px: 0, display: 'flex', justifyContent: 'space-between', width: `${w(234)}`, height: `${h(36)}` }}>
                   
                    <PopUpMenu detach={{detach: detach, callback: ()=> {setDetach(false);}}}>
                    <Box key="button" sx={{display: 'flex', ':hover': {cursor: 'pointer'},}}>
                   
                           <FlexDiv style={{flexDirection: 'column', backgroundColor: '#D9D9D9', width: `${46}`, height: `${h(31)}`,borderRadius: '0.625rem', marginTop:'0.25rem',}}> 
                           <span style={{fontWeight: 'bold',}}>{task.day} {months[task.month]}</span>
                    
                            {
                                (task.time)?(<span >{task.time}</span>): (null)
                            }
                            </FlexDiv>
                    
                        <Typography sx={{paddingLeft: '0.2rem',overflowX: 'hidden', width: `${w(190)}`, height: `${h(36)}`, }}><div style={{fontWeight:'bold',textAlign:'left'}}>{task.title}</div><Divider /> <div style={{textAlign:'left'}}>{task.description}</div></Typography>
                       
                    </Box>
                    <form 
                    style={{width: '20vw', height: '25vh', display: 'flex', flexDirection:'column', alignItems:'space-between', justifyContent:'space-between', 
                    backgroundColor: '#F0ECEC50'}}
                    >
                    <div>
                    <TextField 
                    onChange={(e)=> {tasks_data[task.id]["title"] = e.target.value;}}
                    defaultValue = {task.title}
                    label="Title"
                    variant='outlined'  
                    style={{left: '5px', width: '100%'}}
                   />
                   </div>
                   <div>
                   <TextField 
                    onChange={(e)=> {tasks_data[task.id]["description"] = e.target.value;}}
                    label="Link/Description"
                    variant='outlined'  
                    defaultValue={task.description}
                    style={{left: '5px', width: '100%'}}
                   />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '100%', margin: 0}}>
                   <DatePicker onChange={(newValue)=>{
                   
                   tasks_data[task.id]["day"] = newValue.date();
                    tasks_data[task.id]["month"] = newValue.get('month');
                    tasks_data[task.id]["year"] = newValue.get('year');
                  
                    
                   }} />
                   
                    <TimePicker onChange={(newValue)=> {
                     
                        tasks_data[task.id]["time"] = convertTo12HourFormat(newValue.get('hour'), newValue.get('minute'))
                      
                      }} />
                   <img style={{transform: 'scale(1.0)'}} onClick={()=>{update_task(tasks_data[task.id], task.id); setDetach(true);}}src='submit.png' alt="submit"/>
                    </div>

                
               </form>
                    </PopUpMenu>
                    
                    </Paper>
                    <div style={{display: 'flex', flexDirection: 'column'}}>

                    <Checkbox  
                   
                    
                    
                    sx={{m: 0, p: 0, transform: 'scale(1.0)'}} 
                    onClick={(e)=> {
                        tasks_data[task.id]["status"]=!tasks_data[task.id]['status'];
                        let debouncedUpdate = _.debounce(()=> {update_object("Tasks",tasks_data[task.id]);}, 100);
                        debouncedUpdate();
                       
                    }}/>

                    <DeleteIcon
                
                    onClick={(e)=> {
                        delete_object("Tasks", task.id).then((e)=>{updateTasks();})
                    }}
                    
                    sx={{':hover': {cursor: 'pointer'}, transform: 'scale(1.0)', opacity:0.6}}/>
                    </div>
                   
                    </div>
                ))
            }
            </div>
            </FormControl>
        </Container>
        
        </div>
        </ThemeProvider>
        
    )

};

/* 

import * as React from 'react';
import Checkbox from '@mui/joy/Checkbox';
import Done from '@mui/icons-material/Done';

export default function HoverCheckbox() {
  return (
    <Checkbox
      uncheckedIcon={<Done />}
      label="My unchecked icon appears on hover"
      slotProps={{
        root: ({ checked, focusVisible }) => ({
          sx: !checked
            ? {
                '& svg': { opacity: focusVisible ? 1 : 0 },
                '&:hover svg': {
                  opacity: 1,
                },
              }
            : undefined,
        }),
      }}
    />
  );
}


*/