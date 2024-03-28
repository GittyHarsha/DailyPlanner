import {w, h} from '../services/dimensions.js';
import {Typography} from '@mui/material';
import StaticDatePicker from './StaticDatePicker.js';
import SignalCellular4BarIcon from '@mui/icons-material/SignalCellular4Bar';
import dayjs from 'dayjs';
import FlexDiv from './FlexDiv.js';
import {useState, setState} from 'react';
export default function DateFilter({date, setDate}) {
   
    let [open, setOpen] = useState(false);

    function resetOpen() {
        setOpen(false);
    }
    return (
        <FlexDiv style={{width: `${w(247)}`, height: `${h(31)}`, backgroundColor: 'white', borderRadius: '1.125rem', justifyContent:'center', marginBottom: '0.4rem',
               
        }}>
            <StaticDatePicker
                open={open}
                resetOpen={resetOpen}
                setDate={setDate}
                style={{ position:'absolute',top:'6rem', right: '15rem',zIndex: 100, backgroundColor:'white', }}
                />
              
                <Typography sx={{fontWeight: 'bold', fontFamily:'Itim', fontSize: '1.5rem',}}>
                {date.format('MMMM')} {date.date()}, {date.format('dddd')}
                  <SignalCellular4BarIcon 
                  onClick={(e)=> {setOpen(true)}}
                  opacity={0.6} sx={{ transform: 'rotate(45deg)',  '&:hover': {cursor:'pointer'} }}/>
              </Typography>
              
            </FlexDiv>
    )
}