import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import LoginPage from './components/LoginPage';
import { createTheme, ThemeProvider, Button, AppBar, Toolbar, Typography, Icon } from '@mui/material';
import { ExitToApp } from '@mui/icons-material'; // Importing the logout icon

import './App.css';
import PageNotFound from './components/PageNotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial login state

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions here, such as clearing session storage or updating state
    setIsLoggedIn(false); // Update login state
    localStorage.clear();
    window.location.href = "/"; // Redirect to login page
  };

  const ProtectedRoute = ({ element, isLoggedIn, ...rest }) => {
    return isLoggedIn ? <Route {...rest} element={element} /> : <Navigate to="/" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Task Manager
            </Typography>
            <Icon>
              <ExitToApp fontSize="large" sx={{ color: 'white', marginRight: '8px' }} />
            </Icon>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
        <div className='container'>
          <div className='main'>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<TaskList />} isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="/new"
              element={<ProtectedRoute element={<AddTask />} isLoggedIn={isLoggedIn} />}
            />
            {/* Catch-all route for handling incorrect URLs */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          </div>
        </div>
        <Footer />
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

// Define custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5', // Adjust background color for a soothing appearance
    },
  },
});

export default App;
