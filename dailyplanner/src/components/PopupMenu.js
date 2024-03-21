import {useState, setState, useEffect} from 'react';
import {Menu, MenuItem, Button} from '@mui/material'
import {Children} from 'react';

export default function PopUpMenu({children}) {
    const [anchorEl, setAnchorEl] = useState(null);
    let [disable, setDisable] = useState(false);
    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

  let open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    
  };
  return (
    <div 
   
    style={{width: '100%', height: '100%', display: disable?('none'): ('block')}}>
    {
        Children.map(children, (child)=> {
            if(child.key=='button') {
                return (
                    <div onClick={handleClick}>
                        {child}
                    </div>
    
                
                )
                
            }
        })
    }
    <Menu aria-controls={open ? 'basic-menu' : undefined}
    aria-haspopup="true"
    anchorEl={anchorEl}
    aria-expanded={open ? 'true' : undefined}
    open={open}
   
    onClose={handleClose}
    
    >
    
    <MenuItem>
    {Children.map(children, (child)=> {
        if(child.key!='button') {
            return (
                <div
               

                >
                    {child}
                </div>
            )
        }
    })}
    </MenuItem>
    </Menu>
    </div>
  )

 

          
}