import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities/';
import {Paper} from '@mui/material';
import {w, h} from '../services/dimensions.js';
import styled from 'styled-components';
import {Checkbox} from '@mui/material';
export const Task = ({id, title, handleCheck, isChecked}) => {

    
    const {attributes, listeners, setNodeRef, 
    transform, transition} = useSortable({id});

    const style={
        transition,
        transform: CSS.Transform.toString(transform),
        marginLeft: '0px',
        marginTop: '5px',
        zIndex: 1,
        width : `${w(207)}`,
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
        ref={setNodeRef}
        {...attributes} 
        sx={{my: 1,}}
       
        style={style}
       
        >
            <Checkbox
            checked={isChecked}
            onClick={handleCheck}

            />
         <div 
         style={{ width: `${w(180)}`, textAlign:'left'}
        
        } {...listeners}>
         {title}
         </div>
        
        </Paper>
        </div>
    )
}