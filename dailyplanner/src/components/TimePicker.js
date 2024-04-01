import * as React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {Alert, AlertTitle} from '@mui/material';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import {Button} from '@mui/material';
import dayjs from 'dayjs';

export default function ResponsiveTimePickers({onChange, default_value, alert, resetAlert}) {
  let today = dayjs();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       {alert && (
        <Alert severity="warning" sx={{position:'absolute',width:'32vh', zIndex:10,}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <AlertTitle sx={{fontSize:'1.4vh'}}>{alert}</AlertTitle> 
          <Button style={{
            borderRadius: '50%', // Make it circular
            minWidth: 0, // Remove minimum width to make it smaller
            padding: '0.7vh', // Remove padding
            backgroundColor: 'orange',
            color:'white'
          }}
          onClick={resetAlert}>{'X'}</Button>
          </div>
        </Alert>
      )}
  
          <DesktopTimePicker 
         
          
          ampm={false}
          label={"Time"}onChange={onChange} defaultValue={default_value} style={{ fontSize: '5px' }} sx={{width: '9vw', fontSize:'5px'}}/>
      
     
    </LocalizationProvider>
  );
}
