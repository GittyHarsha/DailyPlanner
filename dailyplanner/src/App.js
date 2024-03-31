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
  if(!tour_state) tour_state='true';
  let [tour, setTour] = useState(tour_state);
  const [{run, steps}, setState] = useState({
    run: true,
    steps: [
      {
        content: <h2>Let's begin your tour!</h2>,
        locale: {skip: <strong>SKIP</strong>},
        placement: 'center',
        target:'body',
      },
      {
        content: <h2>Here you can manage your monthly goals!</h2>,
        placement: 'right',
        target:'#step-1',
        title: 'Monthly Goals',
      },
      {
        content: <h2>Here you can manage your Habits !</h2>,
        placement: 'right',
        target:'#step-2',
        title: 'Habits',
      },
      {
        content: <h2>Here you can manage your Priorities. <br/>
        You can drag and drop the priorities to change their priority order.
        </h2>,
        placement: 'bottom',
        target:'#step-3',
        title: 'Priority',
      },
      {
        content: <h2>Here you can manage your Tasks. <br/>
          </h2>,
        placement: 'bottom',
        target:'#step-4',
        title: 'Tasks',
      },
      {
        content: <h2>You can filter your data by dates! <br/>
        </h2>,
        placement: 'bottom',
        target:'#step-5',
        title: 'Date Filter',
      },
      {
        content: <h2>Journal your life experiences here! <br/>
        </h2>,
        placement: 'left',
        target:'#step-6',
        title: 'Daily Journal',
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
      ((tour=='true')?(
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
      <FlexDiv style={{flexDirection: 'column', height: '100%', width: `${w(524)}`, alignItems:'space-between',  marginRight:'0px', backgroundColor:'red'}}>
        <ContainerDiv><Quote style={{width: '100', borderRadius: '0.625rem', height: '4.3795536764705885rem'}}/></ContainerDiv>
        <ContainerDiv><MonthlyGoals id={'step-1'} date={date} style={{width: `${w(520)}`,height: `${h(120)}`, marginRight:'-10px'}}/></ContainerDiv>
       <ContainerDiv><HabitTracker id={'step-2'} date={date} style={{width: `${w(510)}`, height: `${h(121)}`}}/></ContainerDiv> 
        <FlexDiv  style={{height: `${h(210)}`, marginTop: '0.7rem'}}>
        <Priority id={'step-3'} style={{width: `${w(247)}`, height: '100%'}}/>
        <Tasks id={'step-4'} style={{width: `${w(247)}`, height: '100%'}}/>
      </FlexDiv>
    
      </FlexDiv>


    <FlexDiv style={{flexDirection:'column', height: '100%'}}>
    <DateFilter id={'step-5'} date={date} setDate={handleDate}/>
    <HighLights id={'step-6'} date={date} style={{height: '100%', width: `${w(247)}`}}/>
    </FlexDiv>
      
     
   </FlexDiv>
    </ThemeProvider>
    
    </StyledDiv>

  );
}

export default App;
