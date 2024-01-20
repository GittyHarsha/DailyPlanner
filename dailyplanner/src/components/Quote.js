import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import QuoteOfTheDay from '../services/qotd';
import {useState, useEffect} from 'react';

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
            minHeight: '10vh',
            padding: '50px',
            
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: '24px',
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