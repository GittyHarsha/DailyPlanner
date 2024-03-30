import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';

export default function StaticDatePickerLandscape({style, setDate, resetOpen, open}) {
    const threeMonthsAgo = dayjs().subtract(3, 'month');
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker orientation="portrait" 
      defaultValue = {dayjs()}
        
        sx={{...(style?style:null), visibility: open? 'visible': 'hidden', borderRadius: '0.625rem',
        "& .MuiPickersDay-root": { // Targets the days in the picker
          fontFamily: 'Itim'
        }
      }}
        minDate={threeMonthsAgo}
        maxDate={dayjs()}
        onAccept = {(value)=> {
      
            setDate(value);
        }}
        onClose = {(value)=> {resetOpen();}}
      />
    </LocalizationProvider>
  );
}