import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import LoginPage from './components/LoginPage';
import { createTheme, ThemeProvider, Button, AppBar, Toolbar, Typography, Icon, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ExitToApp } from '@mui/icons-material'; // Importing the logout icon

import './App.css';
import PageNotFound from './components/PageNotFound';
import SignupPage from './components/SignupPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn")); // Seting initial login state
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false); // State for logout confirmation dialog

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    window.location.href = "/";
  };

  // Function to open logout confirmation dialog
  const handleOpenLogoutDialog = (e) => {
    e.preventDefault();
    setOpenLogoutDialog(true);
  };

  // Function to close logout confirmation dialog
  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const ProtectedRoute = ({ element, isLoggedIn, ...rest }) => {
    return isLoggedIn ? element : <Navigate to="/" />;
  };

  useEffect(() => {
    let authState = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(authState);
    console.log("is Authenticated ========= ", isLoggedIn);
  }, [isLoggedIn])

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Task Manager
            </Typography>
            {isLoggedIn && <Icon>
              <ExitToApp fontSize="large" sx={{ color: 'white', marginRight: '8px' }} />
            </Icon>}
            {isLoggedIn &&
              <Button color="inherit" onClick={(e) => handleOpenLogoutDialog(e)}>Logout</Button>}
          </Toolbar>
        </AppBar>
        <div className='container'>
          <div className='main'>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/dashboard"
                element={<ProtectedRoute element={<TaskList />} isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="/new"
                element={<ProtectedRoute element={<AddTask />} isLoggedIn={isLoggedIn} />}
              />
              {/* Catching all the routes for handling incorrect URLs */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>

          </div>
        </div>
        <Footer />
        {/* Logout Confirmation Dialog */}
        <Dialog open={openLogoutDialog} onClose={handleCloseLogoutDialog}>
          <DialogTitle>Logout Confirmation</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Are you sure you want to logout?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLogoutDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogout} color="primary" autoFocus>
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

// Footer component
const Footer = () => {
  return (
    <footer>
      <Typography variant="body2" align="center" color="textSecondary">
        &copy; {new Date().getFullYear()} Sweta. All rights reserved.
      </Typography>
    </footer>
  );
};

// custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

export default App;
