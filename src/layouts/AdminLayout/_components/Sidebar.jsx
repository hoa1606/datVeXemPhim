import ContactMailIcon from '@mui/icons-material/ContactMail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from '../../../routes/path';
import MenuItem from './MenuItem';

const Sidebar = () => {
  const navigate = useNavigate();

  const menu = [
    {
      href: PATH.ADMIN,
      icon: <DashboardIcon />,
      title: 'Dashboard',
    },
    {
      href: PATH.USER_MANAGERMENT,
      icon: <EventIcon />,
      title: 'Users management',
    },
    {
      href: PATH.MOVIE_MANAGERMENT,
      icon: <WorkIcon />,
      title: 'Movies management',
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {menu.map((item) => (
          <MenuItem key={item.href} href={item.href} icon={item.icon} title={item.title} />
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
