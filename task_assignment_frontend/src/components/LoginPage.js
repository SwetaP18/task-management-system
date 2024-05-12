import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
import TaskService from '../lib/interceptor';

const LoginPage = () => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission

        /* User authentication */
        try {
            // Call the user authentication api
            const { data } = await TaskService.userLogin({email, password}); 
            console.log(data);
            localStorage.setItem("auth", data.token);
            window.location.href = '/dashboard'; // Redirect to home page
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <Box mb={2} display="flex" >
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                </Box>
                <form onSubmit={handleLogin}>
                    <Grid container spacing={2} marginBottom={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} >
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
                            Login
                        </Button>
                    
                </form>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link to="/signup" variant="body2">
                            Don't have an account? Sign up
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default LoginPage;
