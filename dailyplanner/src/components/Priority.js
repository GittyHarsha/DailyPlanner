import React from 'react';
import {useState, setState, useRef, useEffect} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {Container, FormControl, TextField, Input, InputLabel, Menu, MenuItem} from '@mui/material';
import {useForm, Controller, control} from 'react-hook-form';
import {get_object, add_object, update_object} from '../database/backend.js';
export default function Priority() {
    let [num, setNum] = useState(3);
    const {register, handleSubmit, control} = useForm();
    let [focus, setFocus] = useState(false);
    useEffect(() => {
        let today = new Date();
        today = today.toDateString();
        get_object("Prority", today).then(
            (message) => {console.log(message);}
        ).catch(
            (message) => {
                let obj;
                obj["date"] = today;
                obj["Priorities"] = [];
                add_object("Priority", obj).then((msg)=> {});
            } 
        )
    }, []);
    function addPriority(e) {
        setNum(e.target.value);
    }
    
    function onSubmit(data) {
        let today = new Date(); today = today.toDateString();
        console.log("form values: ", data);
        update_object('Priority', {...data, "date": today}).then(
            (msg)=> {}
        );
    }

    return (
        
        <Container align="center">
          
            <Typography variant='h5'align='center' >
                Top 3 Priority
                
            </Typography>
            <Menu>
            <MenuItem>
          <TextField onKeyDown={addPriority}/>
          </MenuItem>
            </Menu>
           
            <FormControl>
            <form onSubmit = {handleSubmit(onSubmit)}>
                {
                    (true)?(<Button type="submit" sx={{backgroundColor: 'yellow'}}> Submit</Button>): (null)
                }
            <Paper elevation='2'  sx={{my: 1}}>
                    <Controller
                name="1"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <TextField 
                     {...field}
                    variant='standard'  
                    
                />
                )}
            />
              
                </Paper>
                <Paper elevation='2' sx={{my: 1}}>
                    <Controller
                name="2"
                control={control}
                defaultValue=""
                render={({field }) => (
                <TextField 
                    {...field}
                    variant='standard'  
                    
                />
                )}
            />
              
                </Paper>
                <Paper elevation='2'  sx={{my: 1}}>
                    <Controller
                name="3"
                control={control}
                defaultValue=""
                render={({ field }) => (
                <TextField 
                    {...field}
                    variant='standard'  
                   
                />
                )}
            />
              
                </Paper>
                </form>
            </FormControl>
            
        </Container>
        
    )

};