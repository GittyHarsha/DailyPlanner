import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities/';
import {Paper, Tooltip} from '@mui/material';
import {w, h} from '../services/dimensions.js';
import {useState} from 'react';

import {Checkbox} from '@mui/material';
export const Task = ({id, title, handleCheck, isChecked}) => {
    const [open, setOpen] = useState(false);

    const handleTooltipClose = () => {
      setOpen(false);
    
    };
  
    const handleTooltipOpen = () => {
      setOpen(true);
    };
  
    
    const {attributes, listeners, setNodeRef, 
    transform, transition} = useSortable({id});

    const style={
        transition,
        transform: CSS.Transform.toString(transform),
        marginLeft: '0px',
        marginTop: '5px',
        zIndex: 1,
        width : `${w(210)}`,
        height: `${h(36)}`,
        paddingLeft: '10px',
        display:'flex',
        alignItems:'center',
        textAlign:'center',
        fontWeight: 'bold',
        
       
    };
    return (
        <div  
       >
       
        <Paper
        noWrap
        ref={setNodeRef}
        {...attributes} 
        sx={{my: 1,}}
       
        style={style}
       
        >
            <Checkbox
            checked={isChecked}
            onClick={handleCheck}

            />

                                    <Tooltip 
                                    open={open}
                                   
                                    PopperProps={{
                                    sx: {
                                        "& .MuiTooltip-tooltip": {
                                        color: "black",
                                        backgroundColor: "white"
                                        }
                                    }
                                    }}
                                    title={<div>{title}</div>}> 
                                    <div 
                                    onMouseEnter={handleTooltipOpen}
                                    onMouseLeave={handleTooltipClose}
                                            style={{ width: `${w(200)}`, textAlign:'left', overflow:'clip' }
                                            
                                            } {...listeners}>
                                            {title}
                                            </div>                                   
                                     </Tooltip>
         
        
        </Paper>
        </div>
    )
}