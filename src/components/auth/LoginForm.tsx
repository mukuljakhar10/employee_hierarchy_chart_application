import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Person, 
  Lock 
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import type { LoginFormProps } from '../../types/index.ts';
// Background image is served from public folder

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{ username?: string; password?: string }>({});

  const { clearAuthError } = useAuth();

  // Clear errors when form fields change
  const clearErrorsOnChange = () => {
    if (error) {
      clearAuthError();
    }
  };

  const validateForm = (): boolean => {
    const errors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onLogin(username.trim(), password);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    clearErrorsOnChange();
    if (formErrors.username) {
      setFormErrors(prev => ({ ...prev, username: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    clearErrorsOnChange();
    if (formErrors.password) {
      setFormErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-background">
      
      <div className="relative z-10 max-w-md w-full">
        {/* Title */}
        <div className="text-center mb-8">
          <Typography 
            variant="h4" 
            component="h1" 
            className="font-bold text-white mb-2 tracking-wider"
            style={{ fontSize: '1.5rem', letterSpacing: '0.1em' }}
          >
            ACCOUNT LOGIN
          </Typography>
        </div>

        {/* Login Card */}
        <Card className="login-card no-bg-card">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                placeholder="User name"
                value={username}
                onChange={handleUsernameChange}
                error={!!formErrors.username}
                helperText={formErrors.username}
                disabled={isLoading}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person className="text-gray-400" />
                    </InputAdornment>
                  ),
                  className: 'login-input'
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F3F4F6',
                    '& fieldset': {
                      border: 'none'
                    },
                    '&:hover fieldset': {
                      border: 'none'
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #e91e63'
                    }
                  }
                }}
              />

              <TextField
                fullWidth
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                disabled={isLoading}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock className="text-gray-400" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showPassword ? <VisibilityOff className="text-gray-400" /> : <Visibility className="text-gray-400" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  className: 'login-input'
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F3F4F6',
                    '& fieldset': {
                      border: 'none'
                    },
                    '&:hover fieldset': {
                      border: 'none'
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #e91e63'
                    }
                  }
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                className="login-button"
              >
                {isLoading ? (
                  <Box className="flex items-center space-x-2">
                    <div className="loading-spinner" />
                    <span>Signing in...</span>
                  </Box>
                ) : (
                  'LOGIN'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
