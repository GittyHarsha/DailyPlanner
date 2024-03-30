import {w, h} from './services/dimensions.js';
import Quote from './components/Quote';
import AppBar from './components/AppBar';
import DateFilter from './components/DateFilter';

import {ThemeProvider} from '@mui/material/styles';
import MonthlyGoals from './components/MonthlyGoals';
import HabitTracker from './components/HabitTracker';
import Priority from './components/Priority';
import Tasks from './components/Tasks';
import HighLights from './components/HighLights';
import {theme} from './components/theme.js';
import axios from 'axios';
import { useState, useEffect} from 'react';
import styled from 'styled-components';
import {connectToIndexedDB, getAllObjects, add_object, getAllIndex, delete_object} from './database/backend';
import FlexDiv from './components/FlexDiv';
import Welcome from './components/Welcome.js';
import StaticDatePicker from './components/StaticDatePicker.js';
import dayjs from 'dayjs';
function App(props) {
  
  //state storing the url of the background image
  let [bgImage, setBgImage] = useState('');
  let [name, setName] = useState(' ');
  let [date, setDate] = useState(dayjs());
  let today = dayjs().startOf('day');
  let yesterday = today.subtract(1, 'day');
  


    useEffect(()=> {
   
      let today = dayjs().startOf('day');
      let yesterday = today.subtract(1, 'day').format('DD-MM-YYYY');
      today = today.format('DD-MM-YYYY');
      
      let bgItem = localStorage.getItem('background');
      if(bgItem){
        bgItem = JSON.parse(bgItem);
        if(bgItem['date']==yesterday) {
          bgItem=null;
        }
      }
     
      if(bgItem) {
        if(bgItem.date!=today) {
          bgItem=null;
          
      
        }
      }
      
      if(bgItem==null){
          axios.get("https://peapix.com/bing/feed").then(
          (res) => { 
            let  bgImage= res.data[0].imageUrl;
                bgImage = bgImage.toString();
           
          localStorage.setItem("background", JSON.stringify({date: today,  content:bgImage}));
        
          setBgImage(bgImage);
         
        }
        ).catch((error) => {
        
          setBgImage('background.png');
        }); 
                
                  
      }
      else {
     
        setBgImage(bgItem.content);
      }
      
   
   
  }, []);
  
  let StyledDiv = styled.div.attrs(props => ({
    backgroundImage: props.backgroundImage
  }))`
    &:before {
      content: '';
      position: absolute;
      background-image: url(${props => props.backgroundImage});
      background-size: cover;
      height: 100%;
      width: 100%;
      top: 0px;
      left: 0px;
      opacity: 0.6;
    }
  `;
  

  function handleDate(e) {
    setDate(e);
    console.log('date getting updated');
  }

  useEffect(() => {
    getAllObjects("Name").then(
      (names)=> {if(names.length) {setName(names[0].name);} else {setName(null)}}
    ).catch((msg)=> {setName(null);})
  },[]);
  let [anchor, setAnchor] = useState(null);
  function handleClick(event) {
    setAnchor(event.currentTarget);
  }

  function onSubmit(name) {
    if(!name) return;
    setName(name);
    add_object("Name", {"name": name});
  }

  return (
  
    <StyledDiv id="app" backgroundImage= {bgImage}>
      
      {(name!=null)? (<></>): (<Welcome onSubmit={onSubmit}/>)}

    <ThemeProvider theme={theme}>
      
   <AppBar name={name}/>
   <FlexDiv style={{marginRight: `${w(23)}`,
    marginLeft: `${w(23)}`,height:`${h(545)}`}}>
      <FlexDiv style={{flexDirection: 'column', height: '100%', width: `${w(524)}`, alignItems:'space-between'}}>
        <Quote style={{width: '97%', borderRadius: '0.625rem', height: '4.3795536764705885rem'}}/>
        <MonthlyGoals date={date} style={{height: `${h(120)}`}}/>
        <HabitTracker date={date} style={{width: '97%', height: `${h(121)}`}}/>
        <FlexDiv style={{height: `${h(210)}`, marginTop: '0.7rem'}}>
        <Priority style={{width: `${w(247)}`, height: '100%'}}/>
        <Tasks style={{width: `${w(247)}`, height: '100%'}}/>
      </FlexDiv>
    
      </FlexDiv>


    <FlexDiv style={{flexDirection:'column', height: '100%'}}>
    <DateFilter date={date} setDate={handleDate}/>
    <HighLights date={date} style={{height: '100%', width: `${w(247)}`}}/>
    </FlexDiv>
      
     
   </FlexDiv>
    </ThemeProvider>
    
    </StyledDiv>

  );
}

export default App;
