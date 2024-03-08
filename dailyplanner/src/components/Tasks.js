import React from 'react';
import {useState, setState, useEffect} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DatePick from "./DatePicker.js";
import TimePicker from "./TimePicker.js";
import MonthDropdown from './MonthDropdown.js';
import {theme} from './theme.js';
import {useForm, Controller, control} from 'react-hook-form';
import {get_object, add_object, update_object, getAllObjects, delete_object} from '../database/backend.js';
import Tabs from './Tabs.js';
import {Container, FormControl, TextField, Input, InputLabel, Menu, MenuItem} from '@mui/material';
import PopUpMenu from './PopupMenu.js';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Tasks() {
   let [tasks, setTasks] = useState([]);
   const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
   let [anchor, setAnchor] = useState(null);
   let [date, setDate] = useState({"date": null, "time: ": null});
   const {register, handleSubmit, control, setValue} = useForm();
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
   function updateTasks() {
    let today = new Date();
        today = today.toDateString();
    getAllObjects("Tasks").then(

        (data) => 
        {
            console.log("obtained data:  ",data);
            setTasks(data);
        }
    ).catch(
        (message) => {
            let obj={"date": today};
            console.log(obj);
            add_object("Priority", obj).then((msg)=> {
                console.log("new object added for today's current date", msg);
            });
        } 
    )
}
   function onSubmit(data) {
    console.log("task to add: ", data);
    let obj={};
    console.log("day: ", data.date.date());
    obj["task"] = data.task;
    obj["day"] = data.date.date();
    obj["month"] = data.date.get('month');
    obj["year"] = data.date.get('year');
    obj["status"] = false;
    obj["time"] = data.time.hour() + ":" + date.time.minute();


   add_object("Tasks", obj).then(
    (msg)=> {console.log(msg); 
        updateTasks();
    }
   );

}

function handleCheck(task) {
    task.status = !task.status;
    console.log("task", task);
    update_object("Tasks", task).then((msg)=>{console.log(msg);}); updateTasks();
}
function handleDelete(id) {
    delete_object("Tasks", id).then((msg)=>{console.log(msg);}); updateTasks();
}

function update_task(data, id) {
   
    let obj={};
    obj["task"] = data.task;
    obj["day"] = data.date.get('day');
    obj["month"] = data.date.get('month');
    obj["year"] = data.date.get('year');
    obj["status"] = false;
    obj["time"]=null;
    obj["id"]=id;
    if(date.time)
    obj["time"] = data.time.format('HH:mm');
    console.log("task to add: ", obj);

   update_object("Tasks", obj).then(
    (msg)=> {console.log(msg); 
        updateTasks();
    }
   );
}

   
    useEffect(() => {
        updateTasks();    
    
    }, []);

   
    return (
        <ThemeProvider theme={theme} >
        <div style={{maxWidth: 500}}>          
   
            <Box sx={{justifyContent: 'space-between',  display: "flex", flexDirection:"row"}}>
          <Menu aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          anchorEl={anchorEl}
          aria-expanded={open ? 'true' : undefined}
          open={open}
          onClose={handleClose}
          >
            <MenuItem>
            <form  onSubmit = {handleSubmit(onSubmit)}>
                    <TextField 
                    onChange={(e)=> {setValue("task", e.target.value)}}
                    helperText="Task"
                    variant='standard'  
                    style={{left: '5px'}}
                   />
                    <Tabs 
                    dateChange={(newValue)=>{setValue("date", newValue); let _date = {...date};_date["date"]=newValue; setDate(_date); console.log("dateChange: ", _date);}} 
                    timeChange={(newValue)=> {setValue("time", newValue); let _date = {...date}; _date["time"] = newValue; setDate(_date); console.log("timeChange: ", _date);}}
                    />
                <br/>
               

               
                   
           


               
  
          
            <Button type="submit">Submit</Button>
              
            </form>
            </MenuItem>
            
          </Menu>
    </Box>
        <Container align="center" sx={{width: 'auto',}}>
  
            
           
            <FormControl>
                
            <Typography variant='h6'  sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'space-between'}}>
                Meetings/Tasks
                <Button onClick={handleClick} sx={{backgroundColor: 'white'}}>+New</Button>
            </Typography>
            <div>
            {
                tasks.map((task) => (
                    <Paper elevation='2' sx={{my: 1}}>
                    <PopUpMenu>
                    <Box key="button" sx={{display: 'flex', ':hover': {cursor: 'pointer', width: '100%',} }}>
                        <Container key="" sx={{backgroundColor: '#f2f2f2', width: '7vw', padding: '0', margin: '0'}}>
                           <Typography sx={{padding: '0px', margin: '0px'}}> {task.day} {months[task.month]}
                           <br/>
                            {
                                (task.time)?(<span>{task.time}</span>): (<></>)
                            }
                            </Typography>
                        </Container>
                        <Typography sx={{pt: 1}}>{task.task}</Typography>
                    </Box>
                    <form  onSubmit = {handleSubmit((data)=>update_task(data, task.id))}>
                        <Checkbox onClick={(e)=> {handleCheck(task)}}/>
                    <TextField 
                    onChange={(e)=> {setValue("task", e.target.value)}}
                    helperText="Task"
                    variant='standard'  
                    defaultValue = {task.task}
                    style={{left: '5px'}}
                   />
                   <DeleteIcon onClick={(e)=> {handleDelete(task.id)}}/>
                    <Tabs 
                    dateChange={(newValue)=>{setValue("date", newValue); let _date = {...date};_date["date"]=newValue; setDate(_date); console.log("dateChange: ", _date);}} 
                    timeChange={(newValue)=> {setValue("time", newValue); let _date = {...date}; _date["time"] = newValue; setDate(_date); console.log("timeChange: ", _date);}}
                    />
                <br/>
                <Button type="submit">Submit</Button>
               </form>
                    </PopUpMenu>
                 
                    </Paper>
                ))
            }
            </div>
            </FormControl>
        </Container>
        
        </div>
        </ThemeProvider>
        
    )

};