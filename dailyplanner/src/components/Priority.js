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

    return (
        
        <Container align="center">
          
            <Typography variant='h5'align='center' >
                Top 3 Priority
                
            </Typography>
            <Menu>
            <MenuItem>
          <TextField/>
          </MenuItem>
            </Menu>
            <FormControl>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Button type="submit" sx={{backgroundColor: 'white'}}> Submit</Button>
               
            <Paper elevation='2'  sx={{my: 1}}>
                    <Controller
                name="1"
                control={control}
               
                render={({ field }) => (
                <TextField 
                     {...field}
                   
                    variant='standard'  
                    style={{left: '5px'}}
                    
                />
                )}
            />
                </Paper>
                <Paper elevation='2' sx={{my: 1}}>
                    <Controller
                name="2"
                control={control}
              
                render={({field }) => (
                <TextField 
                    {...field}
                    style={{left: '5px'}}
                    variant='standard'  
                    
                />
                )}
            />
                </Paper>
                <Paper elevation='2'  sx={{my: 1}}>
                    <Controller
                name="3"
                control={control}
              
                render={({ field }) => (
                <TextField 
               
                    {...field}
                    variant='standard'  
                    style={{left: '5px'}}
                />
                )}
            />
                </Paper>
                </form>
            </FormControl>
            
        </Container>
        
    )

};