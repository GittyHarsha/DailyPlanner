import React from 'react';
import { Select, MenuItem } from '@mui/material';

export default function MonthDropdown(props) {


  const [month, setMonth] = React.useState(props.default);

  const handleChange = (event) => {
    console.log("value: ", event.target.value);
    setMonth(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <Select
    id={props.id}
      defaultValue = {month}
      value={month}
      onChange={handleChange}
      displayEmpty
      disabled={props.disabled}

      sx={{
        '.MuiSelect-select': {
          paddingTop: '0px',
          paddingBottom: '0px',
          paddingLeft: 'auto',
    
          // Add other styles as needed
        },
        width: '8rem',
        height: '100%'
      }}
    >
   
      <MenuItem value={0}>January</MenuItem>
      <MenuItem value={1}>February</MenuItem>
      <MenuItem value={2}>March</MenuItem>
      <MenuItem value={3}>April</MenuItem>
      <MenuItem value={4}>May</MenuItem>
      <MenuItem value={5}>June</MenuItem>
      <MenuItem value={6}>July</MenuItem>
      <MenuItem value={7}>August</MenuItem>
      <MenuItem value={8}>September</MenuItem>
      <MenuItem value={9}>October</MenuItem>
      <MenuItem value={10}>November</MenuItem>
      <MenuItem value={11}>December</MenuItem>

    </Select>
  );
}
