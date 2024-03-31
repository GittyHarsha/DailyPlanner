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
        <Alert severity="warning" sx={{position:'absolute', zIndex:10,}}>
          <AlertTitle>{alert}</AlertTitle> <Button onClick={resetAlert}>{'X'}</Button>
        </Alert>
      )}
  
          <DesktopTimePicker 
         
          

          label={"Time"}onChange={onChange} defaultValue={default_value} sx={{width: '9vw'}}/>
      
     
    </LocalizationProvider>
  );
}
