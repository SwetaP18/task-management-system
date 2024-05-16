import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TaskService from '../lib/interceptor';

const SignupPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
    const [error, setError] = useState(null); // State for error message

    const handleSignup = async (e) => {
        e.preventDefault(); // Preventing form submission

        /* User signup */
        try {
            // Calling the user signup api
            const { data } = await TaskService.userSignup({ fullName, email, password }); 
            console.log(data);
            setOpenDialog(true); // Open dialog on successful signup
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Error signing up. Please try again.');
            setTimeout(() => {
                setError(''); // Set error message
            }, 2000)
            
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close dialog
        window.location.href = "/";
    };

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <Box mb={2} display="flex">
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                </Box>
                {error && <Typography color="error" marginBottom={2}>{error}</Typography>} {/* Display error message */}
                <form onSubmit={handleSignup}>
                    <Grid container spacing={2} marginBottom={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                name="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                </form>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
            {/* Dialog for success message */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>User Created Successfully</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">You can now login with your credentials.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default SignupPage;
