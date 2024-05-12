import React, { useState } from 'react';
import { Modal, Box, FormControl, OutlinedInput, InputLabel, Button, Typography, IconButton, MenuItem, Select } from '@mui/material';
import { Close } from '@mui/icons-material';

const UpdateModal = ({ open, onClose, task, onUpdate, userList }) => {
    // State for the form fields, errors, and user list
    const [replacementTask, setReplacementTask] = useState({
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo,
        status: task.status
    });
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        assignedTo: ''
    });

    // Function to handle changes in form fields
    const handleOnChange = (event) => {
        setReplacementTask({ ...replacementTask, [event.target.name]: event.target.value });
    }

    // Function to handle the update action
    const handleUpdate = () => {
        const newErrors = {};

        // Check for blank fields and numeric values
        if (!replacementTask.title.trim()) {
            newErrors.title = 'Please enter a title.';
        } else if (!isNaN(replacementTask.title)) {
            newErrors.title = 'Title should not be numeric.';
        } else {
            newErrors.title = '';
        }

        if (!replacementTask.description.trim()) {
            newErrors.description = 'Please enter a description.';
        } else if (!isNaN(replacementTask.description)) {
            newErrors.description = 'Description should not be numeric.';
        } else {
            newErrors.description = '';
        }

        if (!replacementTask.assignedTo.trim()) {
            newErrors.assignedTo = 'Please enter the assigned person.';
        } else if (!isNaN(replacementTask.assignedTo)) {
            newErrors.assignedTo = 'Assigned person should not be numeric.';
        } else {
            newErrors.assignedTo = '';
        }

        // Update the errors state
        setErrors(newErrors);

        // If there are no errors, update the task
        if (Object.values(newErrors).every(error => !error)) {
            onUpdate(replacementTask);
            onClose();
        }
    };

    // Function to reset the form fields and close the modal
    const onCloseModal = () => {
        setReplacementTask({
            title: task.title,
            description: task.description,
            assignedTo: task.assignedTo
        });
        onClose();
    };

    

    return (
        <Modal open={open} onClose={onCloseModal}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '50%',
                    minWidth: '400px',
                    bgcolor: '#fff',
                    boxShadow: 24,
                    p: 2,
                    textAlign: 'center',
                }}
            >
                {/* Close icon button */}
                <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={onCloseModal}>
                    <Close />
                </IconButton>
                {/* Modal title */}
                <h3 className='header' variant="h3" style={{color: 'rgb(24 118 210)'}} sx={{ mb: 2 }}>Update Task</h3>
                <Box sx={{ p: 2 }}>
                    {/* Form fields with error messages */}
                    <FormControl fullWidth error={!!errors.title}>
                        <InputLabel>Title</InputLabel>
                        <OutlinedInput onChange={handleOnChange} name='title' label="Title" value={replacementTask.title} />
                        {errors.title && <Typography variant="body2" color="error">{errors.title}</Typography>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.description}>
                        <InputLabel>Description</InputLabel>
                        <OutlinedInput onChange={handleOnChange} name='description' label="Description" value={replacementTask.description} />
                        {errors.description && <Typography variant="body2" color="error">{errors.description}</Typography>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.assignedTo}>
                        <InputLabel>Assigned To</InputLabel>
                        <Select
                            value={replacementTask.assignedTo}
                            onChange={handleOnChange}
                            name="assignedTo"
                            label="Assigned To"
                            variant="outlined"
                        >
                            {userList.map(user => (
                                <MenuItem key={user.id} value={user.username}>{user.username}</MenuItem>
                            ))}
                        </Select>
                        {errors.assignedTo && <Typography variant="body2" color="error">{errors.assignedTo}</Typography>}
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={replacementTask.status}
                            onChange={handleOnChange}
                            name="status"
                            label="Status"
                            variant="outlined"
                        >
                            <MenuItem value="To-Do">To-Do</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Testing">Testing</MenuItem>
                            <MenuItem value="Resolved">Resolved</MenuItem>
                            <MenuItem value="Closed">Closed</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {/* Update button */}
                <Button onClick={handleUpdate} fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>Update</Button>
            </Box>
        </Modal>
    );
};

export default UpdateModal;
