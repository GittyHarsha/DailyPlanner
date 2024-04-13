import {w, h} from '../services/dimensions';
import React from "react";

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
  const textStyle = {
    color: 'black', // Fill color
    textShadow: `
      -1px -1px 0 white,
      1px -1px 0 white,
      -1px 1px 0 white,
      1px 1px 0 white`, // Outline
      fontFamily: 'Arial', fontSize: '1.5rem',fontWeight: 'bold', width: '50vw', height: '7vh'
  };
  console.log("Inside Header Name: ", name)
  return (
    <FlexDiv style={{marginLeft: `${w(23)}`, marginRight: `${w(13)}`, height: `${h(40)}`}}>
      
        <FlexDiv  style={textStyle}>
        
        { (name)?(<FlexDiv style={{height: '100%'}}>{Greeting()} {name} :)</FlexDiv> ):(<></>)}
          
        </FlexDiv>
       

     <FlexDiv style={{height: '100%', width: '60%', marginRight:'0px'}}><SearchBar style={{width: '90%', height: '60%'}}/>
   
     <FlexDiv style={{display:'inline-block', textAlign:'center',width:'40%', height:'80%',}}>
     <img src="dailyplanner.png" alt='daily planner' style={{width: '45%', height: '100%', borderRadius: '0.625rem'}}/>
    
     </FlexDiv>
  
   
   
    
     
    
    
    </FlexDiv>
      
    

    </FlexDiv>
  );
};

export default Header;
