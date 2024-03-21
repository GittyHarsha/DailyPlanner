import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities/';
import {Paper} from '@mui/material';
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
        width : '90%',
        height: '3vh',
        paddingLeft: '10px',
       
       
    };
    return (
        <Paper ref={setNodeRef}
        {...attributes} {...listeners}
        style={style}
        >
        {title}
        </Paper>
    )
}