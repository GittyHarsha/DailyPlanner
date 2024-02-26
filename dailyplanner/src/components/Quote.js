import Box from '@mui/material/Box';
import { Typography, ThemeProvider } from '@mui/material';
import QuoteOfTheDay from '../services/qotd';
import {useState, useEffect} from 'react';
import {theme} from './theme.js';
import {shadows} from '@mui/system';
import {useContext} from 'react';
import {DatabaseContext} from './DbContext.js';
const Quote = function() {
  let db = useContext(DatabaseContext);
  console.log("db",db);
    let [quote, setQuote] = useState("");
    
    useEffect(()=> {
        async function fetchQotd() {
            let q= await QuoteOfTheDay();
            setQuote(q);
        }
        fetchQotd();

    }, []);
    return (
        <ThemeProvider theme={theme}>
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
            my: -2,
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
            borderRadius: 50,
            backgroundColor: theme.palette.primary.main,
            transform: 'scale(1.0)'
        
            
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
        </ThemeProvider>
      );
}

export default Quote;