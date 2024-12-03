import { Box, CssBaseline, Toolbar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './_components/Header';
import Sidebar from './_components/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
        <Outlet />
      </Box>
    </Box>
  );
}
