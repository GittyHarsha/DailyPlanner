import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

export default function ResponsiveTimePickers({onChange, default_value}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
  
          <DesktopTimePicker label={"Time"}onChange={onChange} defaultValue={default_value} sx={{width: '9vw'}}/>
       
     
    </LocalizationProvider>
  );
}
