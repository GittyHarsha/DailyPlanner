import React from "react";
import { AppBar, Toolbar, Typography} from "@mui/material";

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
        { (name)?(<>{Greeting()} {name} !</> ):(<></>)}
        </Typography>
       
      </Toolbar>
     <div><SearchBar style={{width: '1px'}}/>
     <div style={{ marginLeft:'10px', marginRight:'50px',display:'flex',flexDirection:'row',backgroundColor: 'white', borderRadius: '0.625rem',height: '2.1rem', width: '6rem', display: 'inline-block', justifyContent:'space-between'}}>
     <div style={{display:'inline-block', marginRight:'2px'}}>
     <img src="dailyplanner.png" style={{height: '2rem', }}/>
     </div>
      <div style={{height: '100%', width: '40%', display:'inline-block', p:0, fontSize:'0.85rem', fontWeight:'bold'}}>
      Daily Planner
    </div>
    
     </div>
     
    
    
    </div>
      
    

    </AppBar>
  );
};

export default Header;
