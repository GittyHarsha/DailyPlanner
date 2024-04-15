import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
export default function DatePick({onChange, default_value}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        label={"Date"}
        defaultValue={default_value}
        sx={{width: '9vw', fontSize:'1.2vh'}}
        onChange={onChange}
        style={{ fontSize: '10px' }} 
        shouldDisableDate={(date) => date.isBefore(dayjs(), 'day')}
      />
    </LocalizationProvider>
  );
}