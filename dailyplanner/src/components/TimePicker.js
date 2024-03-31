import * as React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import dayjs from 'dayjs';

export default function ResponsiveTimePickers({onChange, default_value, timeThresh}) {
  let today = dayjs();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
  
          <DesktopTimePicker 
          shouldDisableTime={(time, clockType) => {
            // Disable times before the current time

            if(timeThresh.isAfter(dayjs()) && timeThresh.format('DD-MM-YYYY')!=dayjs().format('DD-MM-YYYY')) return false;
            if (clockType === 'hours' && time.isBefore(today, 'hour')) {
              return true;
            }
            if (clockType === 'minutes' && time.isBefore(today, 'minute')) {
              return true;
            }
            return false;
          }}

          label={"Time"}onChange={onChange} defaultValue={default_value} sx={{width: '9vw'}}/>
       
     
    </LocalizationProvider>
  );
}
