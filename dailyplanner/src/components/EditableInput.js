import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import {TextField} from '@mui/material/';
import FlexDiv from './FlexDiv';
import {createRef, useState, useEffect} from 'react';
export default function Editableinput({onChange, value}) {
    let inputRef = createRef();
     let [done, setDone] = useState(false);
     let [formValue, setFormValue] = useState(value);
   
     function handleBlur(e) {
        onChange(formValue); 
        inputRef.current.blur();
        setDone(false); 
     }

 return (
   
    <FlexDiv>
       {
        (done==true)? (<input
            defaultValue={value}
    
            ref = {(el)=> {inputRef.current=el; if(el) el.focus();}}
            style={{width: '90%', border: 'none'}}
            onClick={(e)=> {setDone(true);}}
            onBlur = {(e)=> { handleBlur(); setDone(false);}}
            onChange = {(e)=> {setFormValue(e.currentTarget.value)}}
            />
            
            
        ) : (<span style={{fontWeight:'bold',width: '100%', overflow:'hidden', textOverflow:'ellipsis'}}>{value}</span>)
        
    }
    {
                (done==false)?(<EditOutlinedIcon
                    sx={{p:0,m:0}}
                    onClick={(e)=> { setDone(true); }}
                    />):
                    (<DoneOutlinedIcon
                    onClick={handleBlur}
                    />)
            }
        
        
        
    </FlexDiv>
 )   
}