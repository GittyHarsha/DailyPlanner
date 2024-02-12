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


function App() {
  const name = "Harsha";
  window.indexedDB.deleteDatabase("DailyPlanner");

  return (
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
  );
}

export default App;
