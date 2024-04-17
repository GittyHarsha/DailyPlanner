import React from 'react';
import FlexDiv from './FlexDiv.js'
import {useState, useEffect, useRef} from 'react';
import { Button, Checkbox, Typography, Box, Paper, Tooltip} from '@mui/material';
import {ThemeProvider } from '@mui/material/styles';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import {w, h} from '../services/dimensions.js';

import Divider from '@mui/material/Divider';
import _ from 'lodash';
import dayjs from 'dayjs';
import DatePicker from "./DatePicker.js";
import TimePicker from "./TimePicker.js";
import {theme} from './theme.js';
import {useForm} from 'react-hook-form';
import { add_object, update_object, getAllObjects, delete_object, connectToIndexedDB} from '../database/backend.js';
import {Container, FormControl, TextField, Menu, MenuItem} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
export default function Tasks({style, id}) {
   let [tasks, setTasks] = useState([]);
   let [timeError, setTimeError] = useState(false);
   const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
   let [tasksData, setTaskData] = useState({});
   let [date, setDate] = useState({"date": dayjs(), "time: ": null});
   let tasks_data={};
   let time_set = useRef(false);
   let [detach, setDetach] = useState(false);
   let dayjs_today = dayjs();
   let today = dayjs().format('DD-MM-YYYY');
   const {handleSubmit, setValue, getValues} = useForm();
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
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    return `${hour}:${minute} ${period}`;
}
function isBeforeCurrentTime(year, month, day, hour, minute) {
  
    const inputTime = dayjs(new Date(year, month, day, hour, minute));
    
   
    const currentTime = dayjs();
    
   
    return inputTime.isBefore(currentTime);
  }
  
 

  
   function updateTasks() {
    
    
        connectToIndexedDB().then(
            (db)=> {
                let transaction = db.transaction("Tasks", "readwrite");
                let store = transaction.objectStore("Tasks");
                let cursorRequest = store.openCursor();
  
                cursorRequest.onsuccess = function(e) {
                    let cursor = e.target.result;
                    
                    if (cursor) {
                    if(cursor.value.status===true) {
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
            let a=[...data];
          
             a.sort((task1, task2) => {
               console.log("task1: ", task1);
               console.log("task2: ", task2);
                let d1 = dayjs(task1.dayjs);
                let d2 = dayjs(task2.dayjs);
                console.log("d1: ", d1);
                console.log("d2: ", d2);
                console.log("d1 is before d2: ", d1.isBefore(d2));
                console.log("*************************");
                return d1.isBefore(d2) ? -1 : d1.isAfter(d2) ? 1 : 0;
              });
           
              console.log(a);
            setTasks(a);
           
            for(let task of a) {
                tasks_data[task.id] = task;
            }
            setTaskData(tasks_data);
          
          
        }
    ).catch(
        (message) => {
        }
    )
    
}
function flush_form(data) {
    for(let [key] of Object.entries(data)) {
        data[key]=null;
        setValue(key, null);
    }
    
}
   function onSubmit(data) {
    
   
    let obj={};
    if(!data.title || !data.date) {

      
        
        return;
    }


    obj["title"] = data.title;
    obj["description"] = data.description;
   obj['dayjs'] = dayjs();
    if(!data.date) {
        obj["month"] = null
        obj["year"] = null;
        obj["day"]=null;
        obj['dayjs'] = dayjs();
        
    }
    else {
      
        obj["day"] = data.date.date();
        if(obj['day'].toString().length==1) obj['day']='0'+obj['day'];
        obj['dayjs'] = data.date;
   
        obj["month"] = data.date.get('month');
        obj["year"] = data.date.get('year');
    }
    
    obj["status"] = false;
    if(time_set.current==true) {



    obj["time"] = convertTo12HourFormat(data.time.hour(), data.time.minute());
    obj['hour']=data.time.hour();
    obj['minute'] = data.time.minute();
    time_set.current = false;
    obj['dayjs'] = obj['dayjs']
  .hour(data.time.hour())
  .minute(data.time.minute())
  .second(data.time.second())
  .millisecond(data.time.millisecond());

    if(obj['dayjs'].isBefore(dayjs())) {
       
        setTimeError("Please select a future date and time.");
       
        return;

    }
    else {
     
        setTimeError(null);
        
    }
    
    }
    else{
        time_set.current = false;
        obj["time"] = null;
        
       
        
    
    }
    obj['dayjs']=obj['dayjs'].format('YYYY-MM-DD HH:mm:ss');

    setAnchorEl(null);

   add_object("Tasks", obj).then(
    (msg)=> {
        
        updateTasks();
    }
   );


    
}



function update_task(data, id) {

    
    let d = data.dayjs;

    console.log("date.time: ", data);
    if(data.time) {
    
       
        let d = dayjs().set('hour', data.hour).set('minute', data.minute).set('month', data.month).set('year', data.year);
        console.log("date.time: ", d);
        if(d.isBefore(dayjs())) {
          
            setTimeError('Please select a future date and time');
            
            return;
        }
        else {
          
        }
    }
   alert("yo what" + d);

   update_object("Tasks", data).then(
    (msg)=> {
        updateTasks();
    }
    
   );
    
   setDetach(true);
}
function resetAlert() {
    setTimeError(null);
}
   
    useEffect(() => {
        updateTasks();    
    
    },[]);

    useEffect(()=> {tasks_data = tasksData;})
    
    let component_width = `${w(247)}`;
  
   
    return (
        <ThemeProvider theme={theme} >
        <div id={id} style={{paddingLeft: '0', paddingRight: '0',
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
            <MenuItem style={{height:'auto'}} disableRipple>
            <form  onSubmit = {handleSubmit(onSubmit)} style={{width: '20vw', height: '28vh', display: 'flex', flexDirection:'column', alignItems:'space-around', justifyContent:'space-between', 
          
        }}>
                    <div>
                    <TextField 
                    autoFocus
                    onChange={(e)=> {setValue("title", e.target.value)}}
                    label="`Title"
                    variant='outlined'  
                    style={{ width: '100%'}}
                   />
                   </div>
                   <div>
                   <TextField 
                    onChange={(e)=> {setValue("description", e.target.value)}}
                    label="Link/Description"
                    variant='outlined'  
                    style={{ width: '100%'}}
                   />
                    </div>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '100%', margin: 0}}>
                   <DatePicker onChange={(newValue)=>{
                    
                    setValue("date", newValue); let _date = {...date};_date["date"]=newValue; setDate(_date);}} />
                   
                    <TimePicker 
                    resetAlert={resetAlert}
                    alert={timeError? timeError: null}

                    onChange={(newValue)=> { time_set.current=true; setValue("time", newValue); let _date = {...date}; _date["time"] = newValue; setDate(_date); }} />
                  <img style={{transform: 'scale(1.0)'}} onClick={handleSubmit(onSubmit)}src='submit.png' alt="submit"/>
                    </div>
                <br/>
              
              
            </form>
            </MenuItem>
            
          </Menu>
    </Box>
        <Container align="center" sx={{width: '100%',}} style={{paddingLeft: 0, paddingRight: 0, height: '100%', overflow: 'scroll',  ...(style? style: null)}}>
  
            
           
            <FormControl style={{width: '99%', marginLeft: '0.25vw'}}>
                <div style={{display: 'flex', width: '98%', justifyContent:'space-between', alignItems:'center',}}>
            <Typography variant='componentHeading'  sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row', width: '95%'}, justifyContent: 'space-between',}} style={{padding: '0.5vw'}}>
                Meetings
                </Typography>
                <Button onClick={(e)=>{flush_form(getValues()); handleClick(e);}} sx={{backgroundColor: 'white', boxShadow: 1, height:`${h(20)}`, width: `${w(57)}`}}>+New</Button>
                </div>
            <div style={{padding: '0px', width: '100%'}}>
            {
                tasks.map((task) => (
                    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center',}}>
                       
                    <Paper elevation='2' sx={{marginLeft:'0.05vw' ,my: 1, px: 0, display: 'flex', justifyContent: 'space-between', width: `${w(234)}`, height: `${h(36)}` }}>
                   
                    <Box key="button" sx={{display: 'flex', ':hover': {cursor: 'pointer'},}}>
                   
                           <FlexDiv style={{flexDirection: 'column', justifyContent:'center', backgroundColor: '#D9D9D9', width: `${40}`, height:`${h(33)}`,borderRadius: '0.625rem',margin: '0.15vw', padding:'0'}}> 
                           <span  style={{fontWeight: 'bold',width:'100%', fontSize:'0.9vw'}}>{task.day} {months[task.month]}</span>
                    
                            {
                                (task.time)?(<span style={{  fontSize:'0.9vw'}}>{task.time}</span>): (<span style={{visibility:'hidden',  fontSize:'1vw'}}>11:59 PM</span>)
                            }
                            </FlexDiv>
                            <Tooltip 
                                    PopperProps={{
                                    sx: {
                                        "& .MuiTooltip-tooltip": {
                                        color: "black",
                                        backgroundColor: "white"
                                        }
                                    }
                                    }}
                                    title={<div><div>Title: {task.title}</div><div>Description: {task.description}</div></div>}> 
                                     <Typography noWrap sx={{ overflow: 'hidden',paddingLeft: '0.5vw',overflowX: 'hidden', width: `${w(180)}`, height: `${h(36)}`, }}><div style={{fontWeight:'bold',textAlign:'left'}}>{task.title}</div><Divider /> <div style={{fontWeight:'normal', fontSize:'0.8rem',textAlign:'left'}}>{task.description}</div></Typography>
                                    </Tooltip>
                    
                       
                       
                    </Box>
                   
                    
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