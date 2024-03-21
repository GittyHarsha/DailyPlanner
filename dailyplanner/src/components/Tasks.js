import React from 'react';
import {useState, setState, useEffect} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Done from '@mui/icons-material/Done'
import HoverCheckbox from './HoverCheckBox.js';
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
export default function Tasks() {
   let [tasks, setTasks] = useState([]);
   const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
   let [tasksData, setTaskData] = useState({});
   let [date, setDate] = useState({"date": null, "time: ": null});
   let tasks_data={};
   
   const {register, handleSubmit, control, setValue, getValues} = useForm();
   const [anchorEl, setAnchorEl] = useState(null);
   let open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
     let _date = {...date};
     _date["date"]=null;
     _date["time"]=null;
     setDate(_date);
    
     console.log("+ add habit clicked");
     console.log('target: ', event.currentTarget);
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
                    console.log('Iteration complete');
                    }
                };
                
                cursorRequest.onerror = function(e) {
                    console.error('Cursor request failed', e.target.error);
                };
            }
        );
        
    getAllObjects("Tasks").then(

        (data) => 
        {
            console.log("obtained data:  ",data);
            setTasks(data);
           
            for(let task of data) {
                tasks_data[task.id] = task;
            }
            setTaskData(tasks_data);
            console.log("tasks data", tasks_data);
          
        }
    ).catch(
        (message) => {
            let obj={"date": today};
            console.log(obj);
            add_object("Tasks", obj).then((msg)=> {
                console.log("new object added for today's current date", msg);
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
    console.log("task to add: ", data);
    let obj={};
    if(!data.title || !data.date) {
        console.log(!data.title);
        console.log(!data.date);
        console.log("data: ",data);
      
        
        return;
    }

    console.log("day: ", data.date.date());
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
        console.log(data.time);
    obj["time"] = convertTo12HourFormat(data.time.hour(), date.time.minute());
    obj['hour']=data.time.hour();
    obj['minute'] = data.time.minute();
    
    }
    else{

        obj["time"] = convertTo12HourFormat(23, 59);
       
        
    
    }

   add_object("Tasks", obj).then(
    (msg)=> {console.log(msg); 
        
        updateTasks();
    }
   );


    
}


function handleDelete(id) {
    delete_object("Tasks", id).then((msg)=>{ updateTasks();});
}

function update_task(data, id) {
   console.log("inside update task: ", data);
    

    

   update_object("Tasks", data).then(
    (msg)=> {console.log(msg); 
        updateTasks();
    }
   );
}

   
    useEffect(() => {
        updateTasks();    
    
    },[]);

    useEffect(()=> {tasks_data = tasksData;})
    
  
   
    return (
        <ThemeProvider theme={theme} >
        <div style={{ width: '18.438rem',paddingLeft: '0', paddingRight: '0', height: '13.375rem', transform: 'scale(1.25)'}}>          
   
            <Box sx={{justifyContent: 'space-between',  display: "flex", flexDirection:"row"}}>
          <Menu aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          anchorEl={anchorEl}
          aria-expanded={open ? 'true' : undefined}
          open={open}
          onClose={handleClose}
          >
            <MenuItem >
            <form  onSubmit = {handleSubmit(onSubmit)} >
                    <div>
                    <TextField 
                    onChange={(e)=> {setValue("title", e.target.value)}}
                    label="Title"
                    variant='standard'  
                    style={{left: '5px', width: '100%'}}
                   />
                   </div>
                   <div>
                   <TextField 
                    onChange={(e)=> {setValue("description", e.target.value)}}
                    label="Link/Description"
                    variant='standard'  
                    style={{left: '5px', width: '100%'}}
                   />
                    </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '17rem', margin: 0}}>
                   <DatePicker onChange={(newValue)=>{setValue("date", newValue); let _date = {...date};_date["date"]=newValue; setDate(_date); console.log("dateChange: ", _date);}} />
                   
                    <TimePicker onChange={(newValue)=> {setValue("time", newValue); let _date = {...date}; _date["time"] = newValue; setDate(_date); console.log("timeChange: ", _date);}} />
                   <Button sx={{borderRadius: '0.625rem', boxShadow: '1'}}><img style={{transform: 'scale(0.75)'}} onClick={handleSubmit(onSubmit)}src='submit.png' alt="submit"/></Button> 
                    </div>
                <br/>
              
              
            </form>
            </MenuItem>
            
          </Menu>
    </Box>
        <Container align="center" sx={{width: '100%'}} style={{paddingLeft: 0, paddingRight: 0, height: '13.375rem', overflow: 'scroll'}}>
  
            
           
            <FormControl>
                <div style={{display: 'flex', width: '17.438rem', justifyContent:'space-between', alignItems:'center'}}>
            <Typography variant='h5'  sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row', width: '95%'}, justifyContent: 'space-between',}} style={{padding: '0.5rem'}}>
                Tasks
                </Typography>
                <Button onClick={(e)=>{flush_form(getValues()); handleClick(e);}} sx={{backgroundColor: 'white', boxShadow: 1, height:'2rem'}}>+New</Button>
                </div>
            <div style={{padding: '0px'}}>
            {
                tasks.map((task) => (
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                       
                    <Paper elevation='2' sx={{my: 1, px: 0, display: 'flex', justifyContent: 'space-between', width: '16rem',}}>
                   
                    <PopUpMenu >
                    <Box key="button" sx={{display: 'flex', ':hover': {cursor: 'pointer'},}}>
                   
                        <Container style={{padding: 0, left: 0, fontStyle: 'Irina Sans', width: '5rem'}} sx={{backgroundColor: '#f2f2f2', width: '5rem', overflowX: 'hidden', left: '0', margin: '0'}}>
                           <Typography sx={{display:'flex', justifyContent: 'center', alignItems:'center'}}> {task.day} {months[task.month]}
                    
                            {
                                (task.time)?(<span >{task.time}</span>): (null)
                            }
                            </Typography>
                        </Container>
                        <div style={{width: '10vw', display: 'flex',justifyContent: 'left'}}> <Typography sx={{pt: 1, overflowX: 'scroll'}}><div>{task.title}</div><Divider /> <div>{task.description}</div></Typography></div>
                       
                    </Box>
                    <form >
                    <div>
                    <TextField 
                    onChange={(e)=> {tasks_data[task.id]["title"] = e.target.value;}}
                    defaultValue = {task.title}
                    label="Title"
                    variant='standard'  
                    style={{left: '5px', width: '100%'}}
                   />
                   </div>
                   <div>
                   <TextField 
                    onChange={(e)=> {tasks_data[task.id]["description"] = e.target.value;}}
                    label="Link/Description"
                    variant='standard'  
                    defaultValue={task.description}
                    style={{left: '5px', width: '100%'}}
                   />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '17rem', margin: 0}}>
                   <DatePicker onChange={(newValue)=>{
                    console.log("new value: ", newValue);
                   tasks_data[task.id]["day"] = newValue.date();
                    tasks_data[task.id]["month"] = newValue.get('month');
                    tasks_data[task.id]["year"] = newValue.get('year');
                  
                    
                   }} />
                   
                    <TimePicker onChange={(newValue)=> {
                        console.log(newValue);
                        tasks_data[task.id]["time"] = convertTo12HourFormat(newValue.get('hour'), newValue.get('minute'))
                      
                      }} />
                   <Button sx={{borderRadius: '0.625rem', boxShadow: '1'}}><img style={{transform: 'scale(0.75)'}} onClick={()=>update_task(tasks_data[task.id], task.id)}src='submit.png' alt="submit"/></Button> 
                    </div>

                
               </form>
                    </PopUpMenu>
                    
                    </Paper>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    <HoverCheckbox  
                   
                    
                    
                    sx={{m: 0, p: 0, transform: 'scale(0.75)'}} 
                    onClick={(e)=> {
                        tasks_data[task.id]["status"]=!tasks_data[task.id]['status'];
                        let debouncedUpdate = _.debounce(()=> {update_task(tasks_data[task.id], task.id);}, 100);
                        debouncedUpdate();
                       
                    }}/>
                    <DeleteIcon
                
                    onClick={(e)=> {
                        delete_object("Tasks", task.id).then((e)=>{updateTasks();})
                    }}
                    
                    sx={{':hover': {cursor: 'pointer'}, transform: 'scale(0.75)', opacity:0.6}}/>
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