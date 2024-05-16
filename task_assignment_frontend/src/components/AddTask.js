import React, { useState, useEffect } from 'react';
import { OutlinedInput, FormControl, InputLabel, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, MenuItem, Select } from '@mui/material';
import { Link } from 'react-router-dom';
import TaskService from '../lib/interceptor';

const AddTask = () => {
  const [task, setTask] = useState({});
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  /* Fetch list of users from the backend */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await TaskService.getUsers(0, 10);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  /* Add new task to the lists */
  const addNewTask = async (task) => {
    try {
      // Include user_id in the payload
      const payloadWithUserId = {
        ...task.payload
      };
      const { data } = await TaskService.createTask(payloadWithUserId);
      setTask(data);
      setOpenSuccessDialog(true);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleOnChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    setTask({ ...task, assignedTo: event.target.value });
  };

  const onClick = () => {
    addNewTask({ payload: { ...task } });
  };

  const handleCloseDialog = () => {
    setOpenSuccessDialog(false);
  };

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <FormControl fullWidth sx={{ my: 1 }}>
        <InputLabel sx={{ color: '#000' }}>Title</InputLabel>
        <OutlinedInput
          onChange={handleOnChange}
          name='title'
          label="title"
          sx={{ color: '#000' }}
        />
      </FormControl>
      <FormControl fullWidth sx={{ my: 1 }}>
        <InputLabel sx={{ color: '#000' }}>Description</InputLabel>
        <OutlinedInput
          onChange={handleOnChange}
          name='description'
          label="description"
          sx={{ color: '#000' }}
        />
      </FormControl>
      <FormControl fullWidth sx={{ my: 1 }}>
        <InputLabel sx={{ color: '#000' }}>Assigned To</InputLabel>
        <Select
          value={selectedUser}
          onChange={handleUserChange}
          label="Assigned To"
          sx={{ color: '#000' }}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.username}>{user.username}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={onClick} type='submit' sx={{ my: 1, py: 2 }} fullWidth variant="contained">Add Task</Button>
      <Dialog open={openSuccessDialog} onClose={handleCloseDialog}>
        <DialogTitle>Task Added Successfully</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Your task has been added successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button component={Link} to="/dashboard" color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddTask;
