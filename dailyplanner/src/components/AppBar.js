import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar,TextField, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import SearchBar from './SearchBar';
function Header({name}) {
  
  function Greeting() {
    const currentTime = dayjs();
    const hour = currentTime.hour();
  
    let greeting;
    if (hour >= 5 && hour < 12) {
      greeting = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      greeting = 'Good afternoon';
    } else if (hour >= 17 && hour < 20) {
      greeting = 'Good evening';
    } else {
      greeting = 'Good night';
    }
  
    return greeting;
  }
  console.log("Inside Header Name: ", name)
  return (
    <AppBar position="static" sx={{transform: 'scale(1.0)',display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '10vh'}}>
      <Toolbar>
        <Typography variant="h6" sx={{ marginLeft: "1rem", }}>
        { (name)?(<>{Greeting()} {name.name} !</> ):(<></>)}
        </Typography>
       
      </Toolbar>
     <div><SearchBar style={{width: '1px'}}/>
     <img src="goalsaathi.png" style={{height: '25%', width: '20%', borderRadius: '0.675rem'}}/>
    
    </div>
      
    

    </AppBar>
  );
};

export default Header;
