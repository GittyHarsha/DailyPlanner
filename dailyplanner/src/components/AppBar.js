import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import Profile from "./MenuItem";

function Header() {
  return (
    <AppBar position="static" sx={{backgroundColor: 'grey', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Toolbar>
        <Typography variant="h6" sx={{ marginLeft: "1rem", }}>
          Good morning, Harsha!
        </Typography>
       
      </Toolbar>
      <Profile/>
    </AppBar>
  );
};

export default Header;
