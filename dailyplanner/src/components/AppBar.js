import {w, h} from '../services/dimensions';
import React from "react";
import { AppBar, Toolbar, Typography} from "@mui/material";
import FlexDiv from './FlexDiv';
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
    <FlexDiv style={{marginLeft: `${w(23)}`, marginRight: `${w(13)}`, height: `${h(60)}`}}>
      
        <FlexDiv  style={{color:'black',fontFamily: 'inter',fontSize: '1.8rem',fontWeight: 'bold', width: '45rem', height: '3.5rem',}}>
        
        { (name)?(<FlexDiv style={{height: '100%'}}>{Greeting()} {name} :)</FlexDiv> ):(<></>)}
          
        </FlexDiv>
       

     <FlexDiv style={{height: '100%', width: '60%'}}><SearchBar style={{width: '70%', height: '50%'}}/>
   
     <div style={{display:'inline-block', marginLeft:'1.15rem',}}>
     <img src="dailyplanner.png" style={{width: '12rem', height: '4rem', borderRadius: '0.625rem'}}/>
    
     </div>
     <div style={{display:'inline-block', marginRight:'1.15rem',}}>
    
    
     </div>

   
   
    
     
    
    
    </FlexDiv>
      
    

    </FlexDiv>
  );
};

export default Header;
