import React, { useState, useEffect } from 'react';
import { ListItem, ListItemIcon, ListItemText, Typography, Button, Paper, Grid, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Chip, Card, CardActions, CardContent } from '@mui/material';
import { Delete, Description, Update, Visibility, AccessTime, Person, CheckCircle } from '@mui/icons-material';
import TaskService from '../lib/interceptor';
import DeleteConfirmationModal from './modals/DeleteConfirmationModal';
import UpdateModal from './modals/UpdateModal';

const Task = ({ task, getTask }) => {
    // States
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [userList, setUserList] = useState([]);

    // Function to handle the delete button click event
    const handleDelete = () => {
        // Show the delete confirmation modal
        setShowConfirmation(true);
    };

    // Function to handle the confirm delete operation
    const handleConfirmDelete = async () => {
        setShowConfirmation(false);
        try {
            setLoading(true);
            // Perform the delete operation using TaskService
            await TaskService.deleteTask(task.taskId);
            // Fetch tasks again to reflect the changes
            await getTask(1);
        } catch (error) {
            console.error('Error deleting task:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle the update button click event
    const handleUpdate = () => {
        // Show the update modal
        setOpenUpdateModal(true);
    };

    // Function to handle the update task operation
    const handleUpdateTask = async (updatedTask) => {
        setOpenUpdateModal(false);
        try {
            setLoading(true);
            // Perform the update operation using TaskService
            await TaskService.updateTask(task.taskId, updatedTask);
            // Fetch tasks again to reflect the changes
            await getTask(1);
        } catch (error) {
            console.error('Error updating task:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle opening the details modal
    const handleOpenDetailsModal = () => {
        setOpenDetailsModal(true);
    };

    // Function to handle closing the details modal
    const handleCloseDetailsModal = () => {
        setOpenDetailsModal(false);
    };

    // Function to format the date to MON DD, YYYY format
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const { data } = await TaskService.getUsers(0, 10);
                setUserList(data);
            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        };
        fetchUserList();
    }, []); 

    return (
        <Paper elevation={3} className='task-item'>
            <Card>
                <CardContent>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <Description />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="h6">{task.title}</Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" color="textSecondary">
                        {formatDate(task.createdAt)}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">{task.description}</Typography>
                    <Typography variant="body2" color="textSecondary">Assigned To: {task.assignedTo}</Typography>
                </CardContent>
                <CardActions>
                    <Button xs={12} onClick={handleOpenDetailsModal} startIcon={<Visibility />} disabled={loading}>View</Button>
                    <Button onClick={handleUpdate} color="primary" startIcon={<Update />} disabled={loading}>Update</Button>
                    <Button onClick={handleDelete} color="error" startIcon={<Delete />} disabled={loading}>Delete</Button>
                </CardActions>
            </Card>
            {/* Delete confirmation modal */}
            <DeleteConfirmationModal 
                open={showConfirmation} 
                onClose={() => setShowConfirmation(false)} 
                onConfirm={handleConfirmDelete} 
                title="Delete Task Confirmation" 
                message="Are you sure you want to delete this task?" 
            />
            {/* Update modal */}
            <UpdateModal 
                open={openUpdateModal} 
                onClose={() => setOpenUpdateModal(false)} 
                task={task} 
                onUpdate={handleUpdateTask} 
                userList={userList}
            />
            {/* Details modal */}
            <Dialog 
                open={openDetailsModal} 
                onClose={handleCloseDetailsModal}
                maxWidth="md"
            >
                <DialogTitle>Task Details</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body1" color="textSecondary">{task.description}</Typography>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Chip icon={<AccessTime />} label={`Created At: ${formatDate(task.createdAt)}`} />
                        </Grid>
                        <Grid item>
                            <Chip icon={<Person />} label={`Assigned To: ${task.assignedTo}`} />
                        </Grid>
                        <Grid item>
                            <Chip icon={<CheckCircle />} label={`Status: ${task.status}`} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetailsModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Loading indicator */}
            {loading && <CircularProgress />} 
        </Paper>
    );
};

export default Task;
