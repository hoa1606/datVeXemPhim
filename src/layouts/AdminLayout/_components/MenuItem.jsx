import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MenuItem({ href, icon, title }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <ListItem sx={{ cursor: 'pointer' }} button onClick={() => handleNavigate(href)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
}
