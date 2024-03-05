import Quote from './components/Quote';
import AppBar from './components/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import MonthlyGoals from './components/MonthlyGoals';
import HabitTracker from './components/HabitTracker';
import Priority from './components/Priority';
import Tasks from './components/Tasks';
import HighLights from './components/HighLights';
import {theme} from './components/theme.js';
import axios from 'axios';
import { useState, setState, useEffect, createContext } from 'react';
import styled from 'styled-components';
import {connectToIndexedDB} from './database/backend';
function App() {
  //state storing the url of the background image
  let [bgImage, setBgImage] = useState('');
  const name = "Harsha";

  // hook to fetch the background image API
    useEffect(()=> {
   
    axios.get("https://peapix.com/bing/feed").then(
      (images_array) => { setBgImage(images_array["data"][2].imageUrl); console.log("image url: ", images_array['data'][1].imageUrl);}
    ).catch((error) => {console.log(error);});
   
  }, []);

  let StyledDiv = styled.div`
  &:before {
    content: '';
    position: absolute;
   background-image: url('${bgImage}');
   background-size: cover;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    opacity: 0.6;
  }
  `;


  useEffect(() => {
    connectToIndexedDB();
  }, []);

  return (
  
    <StyledDiv id="app">
    
    <ThemeProvider theme={theme}>
      
   <AppBar/>
    <Grid container sx={{my: 2}} rowSpacing={2}>
    <Grid item xs='8'>
    <Grid item container>
    <Quote/>
    <MonthlyGoals/>
    <Grid item container> <HabitTracker/></Grid>
   
    <Grid item container sx={{ mx: '10vw',width: '50vw', justifyContent: 'space-around', transform: 'scale(1.25)'}}>
      <Grid item><Priority/></Grid>
      <Grid item><Tasks/></Grid>
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
