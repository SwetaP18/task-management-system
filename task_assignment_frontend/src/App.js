import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import LoginPage from './components/LoginPage';
import { createTheme, ThemeProvider, Button, AppBar, Toolbar, Typography, Icon } from '@mui/material';
import { ExitToApp } from '@mui/icons-material'; // Importing the logout icon

import './App.css';
import PageNotFound from './components/PageNotFound';
import SignupPage from './components/SignupPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn")); // Seting initial login state

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false); 
    localStorage.clear();
    window.location.href = "/"; 
  };

  const ProtectedRoute = ({ element, isLoggedIn, ...rest }) => {
    return isLoggedIn ? element : <Navigate to="/" />;
  };

  useEffect(() => {
    let authState = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(authState);
    console.log("is Authenticated ========= ",isLoggedIn);
  }, [isLoggedIn])

  return (
    <ThemeProvider theme={theme}>
      <div className="app-container">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Task Manager
            </Typography>
            { isLoggedIn && <Icon>
              <ExitToApp fontSize="large" sx={{ color: 'white', marginRight: '8px' }} />
            </Icon> }
            { isLoggedIn &&
             <Button color="inherit" onClick={handleLogout}>Logout</Button>}
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
