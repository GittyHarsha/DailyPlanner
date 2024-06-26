import {w, h} from '../services/dimensions.js';
import {Typography} from '@mui/material';
import StaticDatePicker from './StaticDatePicker.js';
import SignalCellular4BarIcon from '@mui/icons-material/SignalCellular4Bar';

import FlexDiv from './FlexDiv.js';
import {useState} from 'react';
import {ThemeProvider} from '@mui/material';
import {theme} from './theme.js';
export default function DateFilter({date, setDate, id}) {
   
    let [open, setOpen] = useState(false);
    let [hover, setHover] = useState(false);

    function resetOpen() {
        setOpen(false);
    }
    return (
        <ThemeProvider theme={theme}>
        <FlexDiv id={id} onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)} 
        onClick={(e)=> {setOpen(true)}}
        style={{cursor:hover?'pointer': 'default',width: `${w(247)}`, height: `${h(31)}`, backgroundColor: 'white', borderRadius: '1.125rem', justifyContent:'center', marginBottom: '1vh',
               
        }}>
            <StaticDatePicker
                
                open={open}
                resetOpen={resetOpen}
                setDate={setDate}
                style={{ position:'absolute',top:`${h(83)}`, right: `${w(75)}`,zIndex: 100, backgroundColor:'white',  transform: 'scale(0.95)'}}
                />
              
                <Typography sx={{fontWeight: 'bold', fontFamily:'Arial', fontSize: '1.5rem',}}>
                {date.format('MMMM')} {date.date()}, {date.format('dddd')}
                  <SignalCellular4BarIcon 
                 
                  opacity={0.6} sx={{  mx: 2,transform: 'rotate(45deg)',}}/>
              </Typography>
              
            </FlexDiv>
            </ThemeProvider>
    )
}