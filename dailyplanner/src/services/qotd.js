// services/api.js
import axios from 'axios';
const QuoteOfTheDay = async () => {
    try {
      const response = await axios.get(' https://corsproxy.org/?https://favqs.com/api/qotd');
      console.log(response);
      const quote = response.data.quote.body;
      return quote;
   
    } catch (error) {
      console.error('Error fetching quote:', error);
      return 'Could not fetch quote.';
    }
  };


  export default QuoteOfTheDay;