import {useState, setState, useEffect} from 'react';
import {DndContext, closestCorners} from '@dnd-kit/core';
import {SortableContext,verticalListSortingStrategy, arrayMove} from '@dnd-kit/sortable';
import {Task} from './Task';
import {Button, Container, Typography, Checkbox, Menu, MenuItem, TextField, IconButton, InputAdornment} from '@mui/material';
import { add_object, update_object, get_object, connectToIndexedDB } from '../database/backend';
export default function Priority() {
  let today = (new Date()).toDateString();
  let [priority ,setPriority] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  let open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {

    setAnchorEl(null);
  };
  function addPriority(event) {

    if(!priority) return;
    setAnchorEl(null);
        
        let curr_date = new Date();
        let newObj = 
        {
           ...list,

            
        };        
      add_object("Priority", newObj).then(
        
        (message)=> {
            get_object("Priority", today, message)
            .then(
            
                (list)=> {
                    setList(list);
                }
            );
        }
      ).catch(
        (error)=> {console.log(error);}
      )

      
   }
   function handleCheck(id) {
   let today = (new Date()).toDateString();
    connectToIndexedDB().then(
      (db)=> {
        const transaction = db.transaction("Priority", "readwrite");
        const objectStore = transaction.objectStore("Priority");
        const getRequest = objectStore.get(today);
        getRequest.onsuccess = (event) =>{
          let obj = event.target.result; 
          let list =[...obj];
          list.splice(id, 1);
          const putRequest = objectStore.put(list);
          putRequest.onsuccess = (event) => {
            console.log("object with id: ", id, "updated successfully");
          }

        }
        transaction.onsuccess=(event) => {console.log("transaction success");}
        setList(list);
        db.close();
      }
     
    )
   }
   


  let [list, setList] = useState([
    {name: 'Item-1', id: "1"},
    {name: 'Item-2', id: "2"},
    {name: 'item-3', id: "3"},
  ]);
/*
  useEffect(() =>
  {
     
      get_object("Priority", today).then((list)=> {
        setList(list);
      }).catch((msg)=> {
        let obj = {date: (new Date().toDateString()), list: []};
        add_object("Priority", obj);
      });
  }
  ,[]);
*/

  const getTaskPos = (id) => list.findIndex((item) => item.id === id);
  function handleDragEnd(event) {
    document.body.style.cursor = '';
    const {active, over} = event;
    if(active.id == over.id) {
      return;
    }
    let newList =  (list)=> {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(list, originalPos, newPos);
    };
    setList(
     newList
    );

    update_object("Priority",newList).then((msg)=> {});
  }

  return (
<Container style={{backgroundColor:'lightcoral', paddingLeft: '1vw', paddingRight: '1vw'}}>
  
  <Typography
    variant='h5' sx={{display:'flex', justifyContent: 'space-between'}}
  >Top Priorities

    <Button onClick={handleClick}>+ Add</Button>
    <Menu aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          anchorEl={anchorEl}
          aria-expanded={open ? 'true' : undefined}
          open={open}

          onClose={handleClose}
          style={{display: anchorEl? 'block':'none'}}
          >
          <MenuItem>
       
       
         
          <br/>
          <TextField 
          
          InputProps={{
            
            style: {width: '10rem'},
            endAdornment: (
              
              <InputAdornment position="end">
                <IconButton>
                <img src='submit.png' style={{':hover': {cursor: 'pointer'}}} />
                  
                </IconButton>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          
          label="Add Priority" multiline onChange={(e)=> {if(e.target.value.replace(/[\n\r]+$/, '') == priority){setAnchorEl(null); }else{}}}/>
        
          </MenuItem>
          </Menu>
  </Typography>
  <DndContext collisionDetection={closestCorners}
    onDragStart={()=> {document.body.style.cursor = 'grabbing';}}
    onDragEnd={handleDragEnd}
  >
    <div style={{ width: '100%'}}>
    <SortableContext items={list}
      strategy={verticalListSortingStrategy}
    >
      {
        list.map(
          (item)=> (
           <div style={{display:'flex', width: '100%', m:0, alignItems: 'center', }}>
            <Checkbox/>
            <Task 
            
            id={item.id} title={item.name} key={item.id}/>
           

           </div>
              
           
          )
        )
      }
      
     

    </SortableContext>
    </div>
    
  </DndContext>
  </Container>
  )
};