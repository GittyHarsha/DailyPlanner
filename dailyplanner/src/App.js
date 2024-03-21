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
import Welcome from './components/Welcome.js';
function App() {
  //state storing the url of the background image
  let [bgImage, setBgImage] = useState('');
  let [name, setName] = useState(' ');

  // hook to fetch the background image API
    useEffect(()=> {
   
    axios.get("https://peapix.com/bing/feed").then(
      (images_array) => { setBgImage(images_array["data"][1].imageUrl); console.log("image url: ", images_array['data'][1].imageUrl);}
    ).catch((error) => {console.log(error);});
   
  }, []);

  let StyledDiv = styled.div`
  &:before {
    content: '';
    position: absolute;
   background-image: url('${bgImage}');
   background-size: cover;
    height: 120%;
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
    <Grid container sx={{my: 2}} rowSpacing={2}>
    <Grid item xs='8'>
    <Grid item container>
      
    <Grid item xs='12'><Quote/></Grid>
   <Grid item xs='12'> <MonthlyGoals/></Grid>
    <Grid item xs='12' container sx={{my: -4}}> <HabitTracker/></Grid>
   
    <Grid item xs='12' >
      <Container style={{display: 'flex', justifyContent: 'space-around',
     
      fontSize: '1rem',
      transform: "scaleX(1.0)",
      marginLeft: '0',
      backgroundColor: 'transparent',
      width: '100%',
      paddingLeft: '8rem',
      paddingRight: '8rem',
      minHeight: 200,
      maxHeight: 200,
      marginTop: '1rem',
      boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.0)',
      borderRadius: 0,
    }}>
      <Priority/>
      <Tasks/>
      </Container>
   
    </Grid>
      

    </Grid>
    </Grid> 
    <Grid item xs='4'>
      <HighLights/>
  
    </Grid>
    </Grid>
    </ThemeProvider>
    </StyledDiv>

  );
}

export default App;
