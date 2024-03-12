import {useState, setState} from 'react';
import { Typography,TextField, InputAdornment, IconButton } from '@mui/material';

export default function Welcome({onSubmit}) {
    let [name, setName] = useState('');
    return (
        <div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor:'#33333380', zIndex: '1', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
   <div style=
   {{
        display:'flex',
        flexDirection:'column',
        backgroundColor:'#F0ECEC',
        justifyContent:'center',
        width: '20%',
        height: '40%',
        borderRadius: '1.125rem',
     }}>
   <Typography center sx={{display:'flex', justifyContent:'center', width: '100%'}}>Welcome To </Typography>
    <div style={{display:'flex', justifyContent:'center', alignItems: 'center', height: '6rem', width: '100%', justifyContent: 'space-around',}}>
        <div >
        <img src="dailyplanner.png"/> 
        <Typography sx={{display:'inline-block', px: 1}}>
            Daily <br/>
            Planner
        </Typography>
        </div>
        
    
       
        
    </div>
    <div style={{display:'flex', justifyContent:'center'}}>
    <TextField
    onKeyDown={(e)=>{if(e.key=='Enter') {onSubmit(name)}}}
    onChange={(e)=>{setName(e.target.value)}}
      variant="standard"
     helperText="Enter Your Name"
      sx={{
        backgroundColor: 'white',
        borderRadius: '0.625rem',
        width: '50%', // Set the desired width
        height: '36px', // Set the desired height
        px: 2,

    }}
    InputLabelProps={{ shrink: false, size: 'small'}}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton>
              <img
                src="submit.png"
                alt="Submit"
                onClick={(e)=>{onSubmit(name)}}
                style={{ cursor: 'pointer', width: '100%', height: '100%' }}
              />
            </IconButton>
          </InputAdornment>
        ),
        disableUnderline: true,
      }}
    />

        </div>
        <Typography style={{width: '90%', height: '20%', marginTop: '1rem', display:'flex', alignItems:'center',justifyContent:'right', marginRight: '10rem'}}>
          <Typography sx={{fontSize:'0.75rem'}}>Powered By</Typography>  <img src="goalsaathi.png" style={{width: '5rem', height: '2rem', borderRadius: '0.625rem'}}/>
           
        </Typography>
   </div>

   
   </div>
    )
}