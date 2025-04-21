import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Visibility as MonitoringIcon,
  NotificationsActive as AlertsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/monitoring', label: 'Monitoring', icon: <MonitoringIcon /> },
    { path: '/alerts', label: 'Alerts', icon: <AlertsIcon /> },
    { path: '/settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          GLOF Monitor
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                backgroundColor:
                  location.pathname === item.path
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
              startIcon={item.icon}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          {navItems.map((item) => (
            <IconButton
              key={item.path}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{
                mx: 0.5,
                backgroundColor:
                  location.pathname === item.path
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'transparent',
              }}
            >
              {item.icon}
            </IconButton>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 