import React from 'react';
import {w, h} from '../services/dimensions.js';
import {useState, setState, useEffect, createRef} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper} from '@mui/material';
import dayjs from 'dayjs';
import {theme} from './theme.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MonthDropdown from './MonthDropdown.js';
import {Container, FormControl, TextField, Input, InputLabel, TableContainer} from '@mui/material';
import {useForm, Controller, control} from 'react-hook-form';
import {get_object, add_object, update_object} from '../database/backend.js';
import _ from 'lodash';
export default function HighLights({style, date}) {
    let today = dayjs().format('DD-MM-YYYY');
  
  
    const {register, handleSubmit, control, setValue, getValues, getValue, formState: {dirty}} = useForm();

    let [disable, setDisable] = useState(false);
    let [highlights, setHighlights] = useState({});
    
    function check_disable(curr, target) {
        curr=curr.startOf('day');
        target = target.startOf('day');
        if(curr.isBefore(target) && !disable) {
            setDisable(true);
          
        }
        
    }
    check_disable(date, dayjs());
    date = date.format('DD-MM-YYYY');
    
    
    
    useEffect(() => {
      
 
        let data={};
       for(let timestamp of timestamps) {
        data.timestamp='';
       }
    
        get_object("Highlights", date).then(
    
            (data) => 
            {
              
                
                for(let timestamp of timestamps) {
                    if(!data[timestamp]) {
                        data[timestamp]='';
                    }
                }
                setHighlights(data);
             
                for(let order in data ) {
                
                    if(order!='date') {
                    setValue(order ,data[order]);
                   
                    }
                   
                }
        }
        ).catch(
            (message) => {
                let obj={"date":today, "dayjs":dayjs()};
             
                add_object("Highlights", obj).then((msg)=> {
                   
                }).catch((msg)=> {});
            } 
        )
    }, []);
    function formatDayjsTo12Hour(dayjsObj) {
        // Get the hour and format it to 12-hour time with AM or PM
        const hour = dayjsObj.hour();
        const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12AM
        const amOrPm = hour < 12 ? 'AM' : 'PM';
        
        return `${hour12}${amOrPm}`;
      }
      let timestamp = formatDayjsTo12Hour(dayjs());
   
    function onSubmit(data) {


        update_object('Highlights', {...data, "date": today, "dayjs":dayjs()}).then(
            (msg)=> {}
        );
    }
    const debouncedSubmit = _.debounce(() => {
        
     
            let data = getValues();
            
            update_object('Highlights', {...data, "date": today, "dayjs": dayjs()}).then(
                (msg)=> {}
            );
        
      
      }, 1000);
    let timestamps = ['1AM', '2AM', '3AM', '4AM', '5AM','6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM', '12AM'];
    let [refs, setRefs] = useState([]);
    useEffect(
        ()=> {
            setRefs(timestamps.map((_, i) => refs[i] || createRef()));
        }
    ,[])
 return (
    <ThemeProvider theme={theme}>
       
    <Container sx={{display: 'flex', flexDirection: 'column', margin:0, transform: 'scale(1.0)', overflow:'clip', px:1,
        ...(style? style:null),
    }}>
        <div>
        <Typography align="center" sx={{fontFamily: 'Arial',m:0,}} variant='h4'>How was the day?
          
          </Typography>
        </div>
           
            <div style={{height:'100%', width:'100%'}}>
            <div style={{overflowY: 'scroll', height: '75%', zIndex:10}}>
            
            {
                timestamps.map(
                    (timestamp, index)=> (
                       
               
                <div 
                        ref={(el)=> {
                            if(!el) return;
                            let timestamp = formatDayjsTo12Hour(dayjs());
                            if(timestamps[index]==timestamp) {
                                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }}
                style={{display: 'flex', justifyContent: 'space-between', width: '95%'}}>
                   <Typography sx={{fontFamily: 'Inria Sans', pt: 2}}>{timestamp}: </Typography> <TextField  disabled={disable} defaultValue={highlights[timestamp]}multiline InputProps = {{style: {fontSize: '1.25rem'}}} name={timestamp} onChange = {(event)=> {setValue(timestamp.toString(), event.target.value);  debouncedSubmit()}} sx={{width: '30vw', left: '0.5rem', right: '0px'}} variant='standard'/>
                   </div>
                
            
                       
                        
                    )
                )
            }
            </div>
            <div style={{ marginLeft: 0, borderRadius: 0, boxshadow: '0', transform: 'scale(1.0)',  bottom: '0.5rem', width: `${w(234)}`, position:'fixed'}}>
                <Typography variant='h5' sx={{my:1}}>
                    Highlight of Today
                </Typography>
                <Paper sx={{width: `${w(230)}`, minHeight: `${h(36)}`, display:'flex', alignItems:'center', maxHeight:`${h(36)}`}}>
                    <TextField disabled={disable} defaultValue={highlights['hightlight_of_the_day']} InputProps={{ disableUnderline: true, style: {fontSize: '1.25rem'}}} name="highlight_of_the_day"  onChange = {(event)=> {setValue("hightlight_of_the_day", event.target.value); debouncedSubmit()}}sx={{width: `${w(230)}`, left: '5px',fontSize:'1.5rem', minHeight:'100%', maxHeight:`${h(50)}`, overflowY:'scroll'}} multiline variant='standard'/>
                </Paper>
            </div>
            </div>
  
    </Container>
    </ThemeProvider>
 )
};