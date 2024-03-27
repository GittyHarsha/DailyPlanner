import {w, h} from './services/dimensions.js';
import Quote from './components/Quote';
import AppBar from './components/AppBar';

import {Grid, Container} from '@mui/material';
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
import {connectToIndexedDB, getAllObjects, add_object} from './database/backend';
import FlexDiv from './components/FlexDiv';
import Welcome from './components/Welcome.js';
function App() {
  
  //state storing the url of the background image
  let [bgImage, setBgImage] = useState('');
  let [name, setName] = useState(' ');

  // hook to fetch the background image API
    useEffect(()=> {
   
    axios.get("https://peapix.com/bing/feed").then(
      (images_array) => { setBgImage(images_array["data"][5].imageUrl); console.log("image url: ", images_array['data'][1].imageUrl);}
    ).catch((error) => {console.log(error);});
   
  }, []);

  let StyledDiv = styled.div`
  &:before {
    content: '';
    position: absolute;
   background-image: url('background.png');
   background-size: cover;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    opacity: 0.6;
  }
  
  `;


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
  
    <StyledDiv id="app">
      
      {(name!=null)? (<></>): (<Welcome onSubmit={onSubmit}/>)}

    <ThemeProvider theme={theme}>
      
   <AppBar name={name}/>
   <FlexDiv style={{marginRight: `${w(23)}`,
    marginLeft: `${w(23)}`,height:`${h(545)}`}}>
      <FlexDiv style={{flexDirection: 'column', height: '100%', width: `${w(524)}`, alignItems:'space-between'}}>
        <Quote style={{width: '97%', borderRadius: '0.625rem', height: '4.3795536764705885rem'}}/>
        <MonthlyGoals style={{height: `${h(120)}`}}/>
        <HabitTracker style={{width: '97%', height: `${h(121)}`}}/>
        <FlexDiv style={{height: `${h(210)}`, marginTop: '0.7rem'}}>
        <Priority style={{width: `${w(247)}`, height: '100%'}}/>
        <Tasks style={{width: `${w(247)}`, height: '100%'}}/>
      </FlexDiv>
    
      </FlexDiv>



      <HighLights style={{height: '100%', width: `${w(247)}`}}/>
     
   </FlexDiv>
    </ThemeProvider>
   
    </StyledDiv>

  );
}

export default App;
