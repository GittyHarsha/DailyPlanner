import {w, h} from './services/dimensions.js';
import Quote from './components/Quote';
import AppBar from './components/AppBar';
import DateFilter from './components/DateFilter';

import {ThemeProvider} from '@mui/material/styles';
import MonthlyGoals from './components/MonthlyGoals';
import HabitTracker from './components/HabitTracker';
import Priority from './components/Priority';
import Tasks from './components/Tasks';
import HighLights from './components/HighLights';
import {theme} from './components/theme.js';
import axios from 'axios';
import { useState, useEffect} from 'react';
import styled from 'styled-components';
import { getAllObjects, add_object} from './database/backend';
import FlexDiv from './components/FlexDiv';
import Welcome from './components/Welcome.js';
import Joyride, {STATUS} from 'react-joyride';
import dayjs from 'dayjs';
function App(props) {
  
  //joyride states
  let tour_state = localStorage.getItem('tour');
  if(tour_state==null || tour_state==undefined) {tour_state='true';}



  let [tour, setTour] = useState(tour_state);
  const [{run, steps}, setState] = useState({
    run: true,
    steps: [
      {
        content: <h2>Let's begin your productivity journey!</h2>,
        locale: {skip: <strong>SKIP</strong>},
        placement: 'center',
        target:'body',
      },
      {
        content: <h2>Manifest your monthly goals to achieve personal or professional objective! </h2>,
        placement: 'right',
        target:'#step-1',
       // title: 'Monthly Goals',
      },
      {
        content: <h2>Build your Habits by tracking and making streaks!</h2>,
        placement: 'right',
        target:'#step-2',
       // title: 'Habits',
      },
      {
        content: <h2>Define your top priorities of the day to maintain focus and productivity throughout the day. </h2>,
        placement: 'bottom',
        target:'#step-3',
       // title: 'Priority',
      },
      {
        content: <h2>Set and View upcoming meetings and appointments.</h2>,
        placement: 'bottom',
        target:'#step-4',
       // title: 'Tasks',
      },
      {
        content: <h2>Reflect on how your day went, noting achievements and areas for improvement, fostering self-awareness and continuous growth.</h2>,
        placement: 'left',
        target:'#step-5',
       // title: 'Daily Journal',
      },
    ]
  })



  //state storing the url of the background image
  let [bgImage, setBgImage] = useState('');
  let [name, setName] = useState(' ');
  let [date, setDate] = useState(dayjs());
  let today = dayjs().startOf('day');
  
  


    useEffect(()=> {
   
      let today = dayjs().startOf('day');
      let yesterday = today.subtract(1, 'day').format('DD-MM-YYYY');
      today = today.format('DD-MM-YYYY');
      
      let bgItem = localStorage.getItem('background');
      if(bgItem){
        bgItem = JSON.parse(bgItem);
        if(bgItem['date']===yesterday) {
          bgItem=null;
        }
      }
     
      if(bgItem) {
        if(bgItem.date!==today) {
          bgItem=null;
          
      
        }
      }
      
      if(bgItem==null){
          axios.get("https://peapix.com/bing/feed").then(
          (res) => { 
       
            let  bgImage= res.data[0].imageUrl;
                bgImage = bgImage.toString();
           
          localStorage.setItem("background", JSON.stringify({date: today,  content:bgImage}));
        
          setBgImage(bgImage);
         
        }
        ).catch((error) => {
        
          setBgImage('background.png');
        }); 
                
                  
      }
      else {
     
        setBgImage(bgItem.content);
      }
      
   
   
  }, []);
  
  let StyledDiv = styled.div.attrs(props => ({
    backgroundImage: props.backgroundImage
  }))`
    &:before {
      content: '';
      position: absolute;
      background-image: url(${props => props.backgroundImage});
      background-size: cover;
      height: 100%;
      width: 100%;
      top: 0px;
      left: 0px;
      opacity: 0.6;
     
    }
  
  `;
  

  function handleDate(e) {
    setDate(e);
    console.log('date getting updated');
  }

  useEffect(() => {
    getAllObjects("Name").then(
      (names)=> {if(names.length) {setName(names[0].name);} else {setName(null)}}
    ).catch((msg)=> {setName(null);})
  },[]);

  function onSubmit(name) {
    if(!name) return;
    setName(name);
    setTour('true');
    add_object("Name", {"name": name});
  }
  


  function handleJoyrideCallback(data) {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
  
    if (finishedStatuses.includes(status)) {
      // Run your function here
      localStorage.setItem('tour', 'false');
      // YourFunction(); // Replace with your actual function
    }
  }

  let ContainerDiv = styled.div`
    width:${w(524)};
    maring-right: 0px;
  `;
  
  return (
  
    <StyledDiv id="app" backgroundImage= {bgImage}>


  


    
      {(name!=null)? 
      ((tour_state=='true')?(
      <Joyride
        continuous
        callback={handleJoyrideCallback}
        run={run}
        steps = {steps}
        hideCloseButton
        scrollToFirstStep
        showSkipButton
        showProgress
        styles={{
          options: {
            arrowColor: '#e3ffeb',
            primaryColor: '#000',
            textColor: 'black',
            zIndex: 1000,
            fontFamily:'Arial',
          },
        }}
          />
    ): (<></>))
      : (<Welcome onSubmit={onSubmit}/>)}




    <ThemeProvider theme={theme}>
      
   <AppBar name={name}/>
   <FlexDiv style={{marginRight: `${w(23)}`, 
    marginLeft: `${w(23)}`,height:`${h(545)}`}}>
      <FlexDiv style={{flexDirection: 'column', height: '100%', width: `${w(524)}`, alignItems:'space-between',  marginRight:'0px',}}>
        <ContainerDiv><Quote style={{width: '97.5%', borderRadius: '0.625rem', height: '7vh'}}/></ContainerDiv>
        <ContainerDiv><MonthlyGoals id={'step-1'} date={date} style={{width: '99.5%',height: `${h(100)}`, marginRight:'-10px'}}/></ContainerDiv>
       <ContainerDiv><HabitTracker id={'step-2'} date={date} style={{width: '97.5%', height: `${h(121)}`}}/></ContainerDiv> 
        <FlexDiv  style={{height: `${h(210)}`, marginTop: '1vh'}}>
        <Priority id={'step-3'} style={{width: `${w(247)}`, height: '100%'}}/>
        <Tasks id={'step-4'} style={{width: `${w(247)}`, height: '100%'}}/>
      </FlexDiv>
    
      </FlexDiv>


    <FlexDiv style={{flexDirection:'column', height: '100%'}}>
    <DateFilter id={'step-6'} date={date} setDate={handleDate}/>
    <HighLights id={'step-5'} date={date} style={{height: '100%', width: `${w(247)}`}}/>
    </FlexDiv>
      
     
   </FlexDiv>
    </ThemeProvider>
    
    </StyledDiv>

  );
}

export default App;
