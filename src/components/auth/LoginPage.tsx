import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useKeycloakAuth } from '../../hooks/useKeycloakAuth';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { login } = useKeycloakAuth();

  const handleKeycloakLogin = async () => {
    setIsLoading(true);
    try {
      login();
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <Box className="login-background">
      <Box className="login-card">
        <Box className="mb-4 sm:mb-6">
          <Typography 
            variant="h4" 
            component="h1"
            className="font-bold text-center mb-2 text-white text-2xl sm:text-3xl md:text-4xl"
          >
            Employee Hierarchy Chart
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleKeycloakLogin}
          disabled={isLoading}
          className="login-button mt-4 touch-manipulation"
          sx={{
            padding: { xs: '12px 24px', sm: '14px 28px' },
            fontSize: { xs: '14px', sm: '16px' },
            minHeight: '44px',
          }}
        >
          {isLoading ? (
            <>
              <CircularProgress size={20} color="inherit" className="mr-1" />
              Logging in...
            </>
          ) : (
            'Login with Keycloak'
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
