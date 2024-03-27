import Box from '@mui/material/Box';
import { Typography, ThemeProvider } from '@mui/material';
import QuoteOfTheDay from '../services/qotd';
import {useState, useEffect} from 'react';
import {theme} from './theme.js';
import {shadows} from '@mui/system';
import {useContext} from 'react';
import {DatabaseContext} from './DbContext.js';
const Quote = function({style}) {
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
            minHeight: '4vh',

            padding: '15px',
          
            margin: 0,
          
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
       
            backgroundColor: theme.palette.primary.main,
            transform: 'scale(1.0)',
            ...(style?style: null),
            
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
            "{quote["quote"]}"
          </Typography>
          <Typography
          sx={{
            display:'flex',
            width: '100%',
            flexDirection: 'row-reverse',
            fontSize: '20px',
            fontStyle: 'Italianno',
            fontWeight: 'bold',
            paddingRight: '122px',
          }}>
            {quote["author"]}

          </Typography>
          
        </Box>
        </ThemeProvider>
      );
}

export default Quote;