// src/components/Header.js
import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
