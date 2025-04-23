import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { 
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { authStyles } from '../styles/styles';
import apiConfig from '../utils/apiConfig';

function Login() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const location = useLocation();
    const [error, setError] = React.useState(location.state?.authError || null);

    // Check if user is already authenticated, if so redirect to home page
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    // Handle login button click
    // Redirect to Google authentication URL
    const handleLogin = () => {
        setIsLoading(true);
        window.location.href = apiConfig.getGoogleAuthUrl();
    };

  return (
    <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={authStyles.rootContainer}>
            {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                Todo List App Login
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
                Please sign in using a Google account.
            </Typography>
            
            <Divider sx={{ width: '100%', my: 2 }} />
            
            <Box sx={{ width: '100%', mt: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
                    onClick={handleLogin}
                    disabled={isLoading}
                    sx={authStyles.googleButton}
                >
                    {isLoading ? 'Redirecting...' : 'Sign in with Google'}
                </Button>
            </Box>
            
            <Typography variant="caption" color="textSecondary" sx={{ mt: 3 }}>
                By continuing, you agree to our Terms of Service and Privacy Policy.
            </Typography>
        </Paper>
    </Container>
  );
}

export default Login;