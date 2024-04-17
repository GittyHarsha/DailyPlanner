import {useState, useEffect} from 'react';
import {DndContext, closestCorners} from '@dnd-kit/core';
import {SortableContext,verticalListSortingStrategy, arrayMove} from '@dnd-kit/sortable';
import {Task} from './Task';
import {w, h} from '../services/dimensions.js';
import {Button, Container, Typography, Menu, MenuItem, TextField, IconButton, InputAdornment} from '@mui/material';
import { add_object, update_object, get_object } from '../database/backend';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
export default function Priority({style, id}) {
  let today = dayjs().format('DD-MM-YYYY');
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
        let old_list=[];
        let id = 0;
        for(let i=0;i<list.length;i++) {
          if(id < JSON.parse(list[i]['id'], 10)) {
            id = JSON.parse(list[i]['id'], 10);
          }
        }
        id = id+1;

        let newPriority = {name: priority, id: id.toString()};
   
       get_object("Priority", today).then(
        (e)=> {if(!e) {
          console.log("couldn't find priority objdect");
          add_object("Priority", {date: today,list: [newPriority]}).then((e)=> {return e;})
          .then((e)=>{
            console.log("got the new list");
            get_object("Priority", today).then((list)=>{list.list[0]['id']=0;setList(list.list); old_list=list.list; return e;})
          })
        }
        else {
          console.log("found befoer only, now adding the new priority");
          setList(e.list);
          let old_list = e.list;
          let newList = [...old_list, newPriority];
          update_object("Priority", {date: e.date, list: newList}).then((e)=> {
            for(let i =0;i<newList.length;i++) {
              newList[i]['id']=i.toString();
            }
            setList(newList);});
        
        }
       }
       ).catch((e)=> {
        console.log("couldn't find priority objdect");
        add_object("Priority", {date: today, list: [newPriority]}).then((e)=> {return e;})
        .then((e)=>{
          console.log("got the new list");
          get_object("Priority", today).then((list)=>{setList(list.list); old_list=list.list; return e;})
        })

       })
       ;     
      

      
   }
   


  let [list, setList] = useState([
  
  ]);
  
  useEffect(()=> {
     updateList();
  },[]);

  function updateList() {
    get_object("Priority", today).then(
      (list)=> {
        let a = [...list.list];
        for(let i =0;i<a.length;i++) {
          a[i]["id"]=i.toString();
        }
        
        
        
        setList(a);
        console.log("updated list: ",a);
      }
    ).catch(
      (e)=> {}
      )
  }
  
  useEffect(()=> {
    let list = [];
    get_object("Priority", today).then(
      (list)=> {
        let a = [...list.list];
        for(let i =0;i<a.length;i++) {
          a[i]["id"]=i.toString();
        }
        while(a.length<3) {
          a.push({name:'',id: a.length.toString()});
        }
        setList(a);
      }
    ).catch(
      (e)=> {}
      )

  },[]);

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
      
    update_object("Priority",{date: today, list: newList}).then((msg)=> {}).catch((err)=> {});
  }

  function deletePriority(id) {
    const filtered_priority = list.filter(obj => obj.id != id);
  
    console.log("filtered priority: ", filtered_priority);
    
    for(let i=0;i<filtered_priority.length;i++) {
        filtered_priority[i]['id']=i.toString();
    }
    update_object("Priority", {date: today, list: filtered_priority}).then(
      (e)=> { updateList();}
    );
   
  }

  function handleCheck(id) {
    let list_copy = [...list];
    list_copy[id]['checked']=!list_copy[id]['checked'];
    update_object("Priority", {date: today, list: list_copy}); 
    setList(list_copy);
  }

  return (
<Container id={id}style={{paddingLeft: '0.7vw', paddingRight: '0.7vw', paddingTop: 10, overflowX:'clip',
...(style? style: null)
}}>
  
  <Typography
    variant='componentHeading' sx={{display:'flex', justifyContent: 'space-between'}}
  >Top Priorities

    <Button onClick={handleClick} sx={{width: `${w(48)}`, height: `${h(20)}`, boxShadow: 1}}>+ Add</Button>
    <Menu aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          anchorEl={anchorEl}
          aria-expanded={open ? 'true' : undefined}
          open={open}
          
          onClose={handleClose}
          style={{display: anchorEl? 'block':'none',}}
          >
       
        
          <TextField 
         autoFocus
         
          InputProps={{
            
            style: {width: `${w(110)}`},
            endAdornment: (
              
              <InputAdornment position="end">
                <IconButton>
                <img onClick={addPriority} src='submit.png' style={{':hover': {cursor: 'pointer' }}} />
                  
                </IconButton>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          
          label="`Enter Priority" multiline onChange={(e)=> {if(e.target.value.replace(/[\n\r]+$/, '') == priority){setAnchorEl(null); addPriority();}else{ console.log("priority value: ", priority);setPriority(e.target.value)}}}
          />
        
          </Menu>
  </Typography>

  <DndContext autoScroll={{ layoutShiftCompensation: false }} collisionDetection={closestCorners}
    onDragStart={()=> {document.body.style.cursor = 'grabbing';}}
    onDragEnd={handleDragEnd}
  >
    <div style={{ height: `${h(182)}`, overflow: 'scroll',}}>
    <SortableContext items={list}
      strategy={verticalListSortingStrategy}
    >
      
      {
        list.map(
          (item, index)=> (
           <div style={{display:'flex', width: '100%', m:0, alignItems: 'center', px:1 }} key={item.id}>
          
            <Task 
            onChange={(item_name)=> {let local_list = [...list]; local_list[index].name=item_name; console.log("local list: ", local_list);update_object("Priority", {date:today, list: list}).then((e)=> {setList(local_list);})}}
            isChecked={item.checked}
            handleCheck = {(e)=> {handleCheck(index)}}
            id={item.id.toString()} title={item.name} key={item.id}> <DeleteIcon sx={{mx:0.2,'&:hover': {cursor:'pointer'}}} opacity={0.6} onClick={(e)=> {deletePriority(item.id);}}/></Task>
           

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