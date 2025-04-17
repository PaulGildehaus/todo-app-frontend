import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@mui/material';
import {authStyles} from '../styles/styles';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function Header({user, setUser}) {
  const navigate = useNavigate();

  // Redirect to login page if user is not authenticated
  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      await api.post('/todos/logout', {}, { withCredentials: true });
      // Clear user data from state
      setUser(null);
      localStorage.removeItem('authToken');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
      navigate('/login');
    }
    
  };

  return (
      <AppBar position="static">
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>

          <Box sx={{ display: { xs: 'none', sm: 'block' }, flex: 1 }}>
            {user && (
              <Typography variant="subtitle1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                Welcome {user.username}
              </Typography>
            )}
          </Box>
          
          <Typography variant="h6" sx={{ 
            order: { xs: -1, sm: 0},
            flex: { xs: '100%', sm: 0},
            textAlign: 'center', 
            mb: { xs: 1, sm: 0 }
            }}
          >
            Task Manager
          </Typography>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {user && (
              <Button variant="outlined" onClick={handleLogout} sx={authStyles.logoutButton}>
                Log Out
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
  );
}

export default Header;