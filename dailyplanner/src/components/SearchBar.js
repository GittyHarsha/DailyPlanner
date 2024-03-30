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
    style={{fontSize:'3rem'}}
    onChange={(e)=> {setQuery(e.target.value);}}
    onKeyDown={(e)=>{if(e.key==='Enter'){googleSearch(query)}}}
      InputProps={{
        style:{fontSize: '1.5rem'},
        endAdornment: (
          <InputAdornment position="end">
            <IconButton >
              <SearchIcon sx={{height: '20rem'}} onClick={(e)=> {googleSearch(local_query)}}/>
              
            </IconButton>
            <img src="google.png" style={{height: '2rem', width: '2rem', borderRadius: '0.625rem'}}/>
          </InputAdornment>
        ),
        disableUnderline: true,
      }}
      sx={{
        
        font: '2rem',
        justifyContent:'center',
        paddingLeft: '5px',
        borderRadius: '1.125rem',
        width: 'auto', 
        height: '100%', 
        backgroundColor: 'white',
        ...(style? style: null),
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
