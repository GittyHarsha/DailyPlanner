import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useState, setState} from 'react';

function SearchBar({style}) {
  let [query, setQuery] = useState('');
  let local_query = query;
  function googleSearch(query) {
    if(!query) return;
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    window.open(url, '_blank');
}

  return (
    <TextField
    style={{...(style? style: null)}}
    onChange={(e)=> {setQuery(e.target.value);}}
    onKeyDown={(e)=>{if(e.key==='Enter'){googleSearch(query)}}}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon onClick={(e)=> {googleSearch(local_query)}}/>
              
            </IconButton>
            <img src="google.png" style={{height: '1.5rem', width: '1.5rem', borderRadius: '0.625rem'}}/>
          </InputAdornment>
        ),
        disableUnderline: true,
      }}
      sx={{
        paddingLeft: '5px',
        borderRadius: '1.125rem',
        width: 'auto', // replace 'widthYouWant' with the width you want
        height: '100%', // replace 'heightYouWant' with the height you want
        backgroundColor: 'white',
      
        color: 'black',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'none',
          },
          '&:hover fieldset': {
            borderColor: 'none',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'none',
          },
        },
       
      }}
      variant="standard"
      placeholder="Search..."
    />
  );
}

export default SearchBar;
