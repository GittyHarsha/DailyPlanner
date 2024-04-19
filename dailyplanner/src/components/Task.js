import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities/';
import {Paper, Tooltip} from '@mui/material';
import {w, h} from '../services/dimensions.js';
import {useState} from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {Checkbox} from '@mui/material';
import EditableInput from './EditableInput.js';
export const Task = ({id, title, handleCheck, isChecked, children, onChange}) => {
    const [open, setOpen] = useState(false);
    //alert("task: "+title+" ischecked: "+isChecked);
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
        width : '100%',
        height: `${h(36)}`,
        paddingLeft: '10px',
        display:'flex',
        alignItems:'center',
        textAlign:'center',
        //fontWeight: 'bold',
        textDecoration: isChecked?'line-through':'none',
       
    };
    return (
        <div  
        style={{width:'97%',}}
       >
       
        <Paper
        noWrap
        ref={setNodeRef}
        {...attributes} 
        sx={{my: 1,}}
       
        style={style}
       
        >
            <DragIndicatorIcon
            sx={{p:0, m:0, }}
            {...listeners}
            />
            <Checkbox
            checked={(isChecked==undefined)?false: isChecked}
            onClick={handleCheck}
            sx={{p:0, m:0}}
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
                                            style={{ width: '100%', textAlign:'left', overflow:'clip' }
                                            
                                            } >
                                         
                                         <EditableInput value={title} onChange={onChange}/>
                                            </div>                                   
                                     </Tooltip>

                                     {children}
         
        
        </Paper>
        </div>
    )
}
