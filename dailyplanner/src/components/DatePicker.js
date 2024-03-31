import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

export default function DatePick({onChange, default_value}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        label={"Date"}
        defaultValue={default_value}
        sx={{width: '9vw'}}
        onChange={onChange}
       
      />
    </LocalizationProvider>
  );
}