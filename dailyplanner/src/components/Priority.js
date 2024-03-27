import {useState, setState, useEffect} from 'react';
import {DndContext, closestCorners} from '@dnd-kit/core';
import {SortableContext,verticalListSortingStrategy, arrayMove} from '@dnd-kit/sortable';
import {Task} from './Task';
import {w, h} from '../services/dimensions.js';
import {Button, Container, Typography, Checkbox, Menu, MenuItem, TextField, IconButton, InputAdornment} from '@mui/material';
import { add_object, update_object, get_object, connectToIndexedDB } from '../database/backend';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Priority({style}) {
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
        
        let old_list=[];
        let newPriority = {name: priority};
        let curr_date = (new Date()).toDateString();
       get_object("Priority", curr_date).then(
        (e)=> {if(!e) {
          console.log("couldn't find priority objdect");
          add_object("Priority", {date: curr_date,list: [newPriority]}).then((e)=> {return e;})
          .then((e)=>{
            console.log("got the new list");
            get_object("Priority", curr_date).then((list)=>{list.list[0]['id']=0;setList(list.list); old_list=list.list; return e;})
          })
        }
        else {
          console.log("found befoer only, now adding the new priority");
          setList(e.list);
          let old_list = e.list;
          let newList = [...old_list, newPriority];
          update_object("Priority", {date: e.date, list: newList}).then((e)=> {
            for(let i =0;i<newList.length;i++) {
              newList[i]['id']=i;
            }
            setList(newList);});
        
        }
       }
       ).catch((e)=> {
        console.log("couldn't find priority objdect");
        add_object("Priority", {date: curr_date, list: [newPriority]}).then((e)=> {return e;})
        .then((e)=>{
          console.log("got the new list");
          get_object("Priority", curr_date).then((list)=>{setList(list.list); old_list=list.list; return e;})
        })

       })
       ;     
      

      
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
  ]);

  function updateList() {
    get_object("Priority", today).then(
      (list)=> {
        let a = [...list.list];
        for(let i =0;i<a.length;i++) {
          a[i]["id"]=i;
        }
        setList(a);
        console.log(a);
      }
    )
  }
  useEffect(() =>
  {
     
    updateList();
  }
  ,[]);


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
    newList = newList(list);
    setList(
     newList
    );
    console.log("new list after dragging: ", newList);
      
    update_object("Priority",{date: today, list: newList}).then((msg)=> {}).catch((err)=> {alert(err)});
  }

  function deletePriority(id) {
    const filtered_priority = list.filter(obj => obj.id != id);
  
    console.log("filtered priority: ", filtered_priority);
    for(let i=0;i<filtered_priority.length;i++) {
        delete filtered_priority[i]['id'];
    }
    update_object("Priority", {date: today, list: filtered_priority});
    updateList();
  }

  return (
<Container style={{paddingLeft: '1vw', paddingRight: '1vw', paddingTop: 10,
...(style? style: null)
}}>
  
  <Typography
    variant='h5' sx={{display:'flex', justifyContent: 'space-between'}}
  >Top Priorities

    <Button onClick={handleClick} sx={{width: `${w(48)}`, height: `${h(20)}`, boxShadow: 1}}>+ Add</Button>
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
                <img onClick={addPriority} src='submit.png' style={{':hover': {cursor: 'pointer' }}} />
                  
                </IconButton>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          
          label="Add Priority" multiline onChange={(e)=> {if(e.target.value.replace(/[\n\r]+$/, '') == priority){setAnchorEl(null); addPriority();}else{ console.log("priority value: ", priority);setPriority(e.target.value)}}}
          />
        
          </MenuItem>
          </Menu>
  </Typography>
  <DndContext collisionDetection={closestCorners}
    onDragStart={()=> {document.body.style.cursor = 'grabbing';}}
    onDragEnd={handleDragEnd}
  >
    <div style={{ height: `${h(155)}`, overflow: 'scroll',}}>
    <SortableContext items={list}
      strategy={verticalListSortingStrategy}
    >
      
      {
        list.map(
          (item)=> (
           <div style={{display:'flex', width: '100%', m:0, alignItems: 'center', }}>
            
            <Task 
            
            id={item.id} title={item.name} key={item.id}/> <DeleteIcon sx={{'&:hover': {cursor:'pointer'}}} opacity={0.6} onClick={(e)=> {deletePriority(item.id);}}/>
           

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