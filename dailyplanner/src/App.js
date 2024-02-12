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
import { useState, setState, useEffect } from 'react';


function App() {
  //state storing the url of the background image
  let [bgImage, setBgImage] = useState('');
  const name = "Harsha";

  // hook to fetch the background image API
    useEffect(()=> {
    axios.get("https://peapix.com/bing/feed").then(
      (images_array) => { setBgImage(images_array["data"][0].imageUrl); console.log("image url: ", images_array['data'][0].imageUrl);}
    ).catch((error) => {console.log(error);});
   
  }, []);

  return (
    <div style={{backgroundImage : `url("${bgImage}")`, height: '100vh'}}>
    <ThemeProvider theme={theme}>
      
   <AppBar/>
    <Grid container sx={{mt: 4}}>
    <Grid item xs='8'>
    <Grid container>
    <Quote/>
    <HabitTracker/>
    <Grid container sx={{ mx: '10vw',width: '50vw', justifyContent: 'space-between'}}>
      <Grid item><Priority/></Grid>
      <Grid item><Tasks/></Grid>
    </Grid>
    </Grid>
    </Grid>
    <Grid item>
    <Grid container>
      <HighLights/>
    </Grid>
    </Grid>
    </Grid>
   
    
   
    </ThemeProvider>
    </div>
  );
}

export default App;
