// TaskList.js

import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, createTheme, ThemeProvider, Grid, Box } from '@mui/material';
import TaskService from '../lib/interceptor';
import Task from './Task';
import Pagination from '@mui/material/Pagination';
import BottomNav from './BottomNav';

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

const TaskList = () => {
  /* States */
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  /* Fetch tasks lists */
  const getTaskList = async (page) => {
    try {
      // Call the TaskService to fetch task lists for the specified page
      const { data } = await TaskService.getTaskLists(page-1, 3); // Limiting to 3 tasks per page
      setTasks(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  /* First time load */
  useEffect(() => {
    getTaskList(page);
  }, [page]); // Reload tasks when page changes

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) return <CircularProgress />;

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom color="primary">
          Total Tasks: {totalElements}
        </Typography>
        {tasks.length ? (
          <div>
            <Grid container spacing={2}>
              {tasks.map((task) => (
                <Grid item key={task.id} xs={12} sm={6} md={4}> {/* Show 3 tasks in a row */}
                  <Task task={task} getTask={getTaskList}/> {/* Pass getTaskList as a prop */}
                </Grid>
              ))}
            </Grid>
            <Box mt={2} display="flex" justifyContent="center">
              <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
            </Box>
          </div>
        ) : (
          <Typography variant="body1" className='no-tasks' color="secondary">
            No Tasks
          </Typography>
        )}
      </div>
      <BottomNav />
    </ThemeProvider>
  );
};

export default TaskList;
