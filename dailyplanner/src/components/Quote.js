import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import QuoteOfTheDay from '../services/qotd';
import {useState, useEffect} from 'react';
import {theme} from './theme.js';
import {shadows} from '@mui/system';
const Quote = function() {
    let [quote, setQuote] = useState("");
    
    useEffect(()=> {
        async function fetchQotd() {
            let q= await QuoteOfTheDay();
            setQuote(q);
        }
        fetchQotd();

    }, []);
    return (
        <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '6vh',

            padding: '15px',
            maxWidth: '50vw',
            margin: 'auto',
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
            borderRadius: 50,
            backgroundColor: theme.palette.primary.main,
        
            
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: '20px',
              fontStyle: 'italic',
              fontWeight: 'bold',
            }}
          >
            "{quote}"
          </Typography>
          
        </Box>
        </>
      );
}

export default Quote;