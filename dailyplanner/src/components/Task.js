import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities/';
import {Paper} from '@mui/material';
import {w, h} from '../services/dimensions.js';
import styled from 'styled-components';
export const Task = ({id, title}) => {

    
    const {attributes, listeners, setNodeRef, 
    transform, transition} = useSortable({id});

    const style={
        transition,
        transform: CSS.Transform.toString(transform),
        marginLeft: '0px',
        marginTop: '5px',
        zIndex: 1,
        width : `${w(223)}`,
        height: `${h(36)}`,
        paddingLeft: '10px',
        display:'flex',
        alignItems:'center',
        textAlign:'center',
        fontWeight: 'bold',
       
       
    };
    return (
        <Paper ref={setNodeRef}
        {...attributes} {...listeners}
        style={style}
        sx={{my: 1}}
        >
        {title}
        </Paper>
    )
}