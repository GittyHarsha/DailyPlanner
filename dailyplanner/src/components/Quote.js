import Box from '@mui/material/Box';
import { Typography, ThemeProvider } from '@mui/material';
import QuoteOfTheDay from '../services/qotd';
import {useState, useEffect} from 'react';
import {theme} from './theme.js';
import dayjs from 'dayjs';
import {useContext} from 'react';


import axios from 'axios';
const Quote = function({style}) {

    let [quote, setQuote] = useState('');
    
    useEffect(()=> {

      if(quote!='') return;
      let today = dayjs().startOf('day');
      let yesterday = today.subtract(1, 'day').format('DD-MM-YYYY');
      today = today.format('DD-MM-YYYY');
      let quoteItem = JSON.parse(localStorage.getItem('quote'));
     
      if(quoteItem) {
        if(quoteItem.date!=today) {
          quoteItem=null;
       
        }
      }
      if(!quoteItem){

                
                     axios.get('https://favqs.com/api/qotd').then(
                           (res)=> {
                                  
                                  let quote = res.data.quote.body;
                                  localStorage.setItem("quote",JSON.stringify({date: today,content: quote}));
                                  setQuote(quote);
                                  
      
                           }
                     ).catch(
                      ()=> {
                      let quote ={date: today, content: QuoteOfTheDay()};
                          setQuote(quote.content);
                          localStorage.setItem("quote", JSON.stringify(quote));
                      }
                     )
      }
      else {
        setQuote(quoteItem.content);
      }
       

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
            paddingTop:'5px',
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
              height:'40%',
              width:'100%',
              justifyContent:'center',
              display:'flex',
              paddingTop: '1x',
            }}
          >
            "{quote['quote']}"
          </Typography>
          <Typography
          sx={{
            display:'flex',
            width: '100%',
            flexDirection: 'row-reverse',
            fontSize: '20px',
            fontStyle: '',
            fontWeight: 'bold',
            paddingRight: '122px',
            paddingBottom:'0px',
            marginBottom:'0px',
            
          }}
          style={{fontStyle:'Roboto'}}
          >
           {quote["author"]}

          </Typography>
          
        </Box>
        </ThemeProvider>
      );
}

export default Quote;