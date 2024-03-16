import React from 'react';
import {useState, setState, useRef, useEffect} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {Container, FormControl, TextField, Input, InputLabel, Menu, MenuItem} from '@mui/material';
import {useForm, Controller, control} from 'react-hook-form';
import {get_object, add_object, update_object} from '../database/backend.js';
export default function Priority() {
    const {register, handleSubmit, control, setValue} = useForm();
    let [focus, setFocus] = useState(false);
    useEffect(() => {
        let today = new Date();
        today = today.toDateString();
       
        get_object("Priority", today).then(
    
            (data) => 
            {
                console.log("obtained data; ",data);
                for(let order in data ) {
                    console.log("order: ", order);
                    setValue(order ,data[order]);
                }
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
    }, []);
    
    

    function onSubmit(data) {
     
        let today = new Date(); today = today.toDateString();
        console.log("form values: ", data);
        update_object('Priority', {...data, "date": today}).then(
            (msg)=> {console.log(msg);}
        );
      
    }
    let width = '15.438rem';
    let paperWidth = '14.348rem';
    return (
        
        <Container style={{paddingLeft: '0.5vw', paddingRight: '0.5vw', transform: 'scale(1.0)'}} align="center" sx={{ width: width, height: '13.375rem',px: 0}}>
          <FormControl>
                <div style={{display: 'flex', width: '14.348rem', justifyContent:'space-between',}}>
            <Typography variant='h5'  sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row', width: '95%'}, justifyContent: 'space-between',}} style={{padding: '0.5rem'}}>
                Top Priorities
                </Typography>
                <Button  sx={{backgroundColor: 'white', boxShadow: 1}}>+New</Button>
                </div>
                </FormControl>
            <Menu>
            <MenuItem>
          <TextField/>
          </MenuItem>
            </Menu>
            <FormControl>
            <form onSubmit = {handleSubmit(onSubmit)}>
            
               
            <Paper elevation='2'  sx={{my: 1.5, width: paperWidth, mx: 0}}>
                    <Controller
                name="1"
                control={control}
               
                render={({ field }) => (
                <TextField 
                     {...field}
                    InputProps={{ disableUnderline: true,}}
                    variant='standard'  
                    style={{left: '5px', width: '100%'}}
                    
                />
                )}
            />
                </Paper>
                <Paper elevation='2' sx={{my: 1.5}}>
                    <Controller
                name="2"
                control={control}
              
                render={({field }) => (
                <TextField 
                InputProps={{ disableUnderline: true,}}
                    {...field}
                    style={{left: '5px', width: '100%'}}
                    variant='standard'  
                    
                />
                )}
            />
                </Paper>
                <Paper elevation='2'  sx={{my: 1.5}}>
                    <Controller
                name="3"
                control={control}
              
                render={({ field }) => (
                <TextField 
                InputProps={{ disableUnderline: true,}}
                    {...field}
                    variant='standard'  
                    style={{left: '5px', width: '100%'}}
                />
                )}
            />
                </Paper>
                </form>
            </FormControl>
            
        </Container>
        
    )

};