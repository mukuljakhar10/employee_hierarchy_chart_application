import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import keycloakInstance from '../../services/keycloakService';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleKeycloakLogin = async () => {
    setIsLoading(true);
    try {
      await keycloakInstance.login({
        redirectUri: `${window.location.origin}/dashboard`,
      });
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <Box className="login-background">
      <Box className="login-card">
        <Box className="mb-6">
          <Typography 
            variant="h4" 
            component="h1"
            className="font-bold text-center mb-2"
            style={{ color: '#ffffff' }}
          >
            Employee Hierarchy Chart
          </Typography>
          <Typography 
            variant="body2"
            className="text-center"
            style={{ color: '#e5e7eb' }}
          >
            Secure Authentication with Keycloak
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleKeycloakLogin}
          disabled={isLoading}
          className="login-button"
          sx={{
            backgroundColor: '#e91e63',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderRadius: '25px',
            padding: '12px 0',
            marginTop: '1rem',
            width: '100%',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease',
            '&:hover': {
              backgroundColor: '#c2185b',
            },
            '&:disabled': {
              backgroundColor: '#f8bbd9',
            },
          }}
        >
          {isLoading ? (
            <>
              <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
              Logging in...
            </>
          ) : (
            'Login with Keycloak'
          )}
        </Button>

        <Typography 
          variant="caption"
          className="text-center block mt-4"
          style={{ color: '#9ca3af' }}
        >
          You will be redirected to Keycloak for secure authentication
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
