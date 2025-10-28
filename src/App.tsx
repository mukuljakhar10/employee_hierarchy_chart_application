import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import { store } from './store';
import { useAppSelector, useAppDispatch } from './store';
import { checkAuthStatus } from './store/slices/authSlice';
import { ROUTES } from './constants/index.ts';
import keycloakInstance, { initKeycloak } from './services/keycloakService';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/layout/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

// MUI Theme configuration
const createMuiTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#6b7280',
      light: '#9ca3af',
      dark: '#374151',
    },
    background: {
      default: mode === 'light' ? '#f9fafb' : '#111827',
      paper: mode === 'light' ? '#ffffff' : '#1f2937',
    },
    text: {
      primary: mode === 'light' ? '#111827' : '#f9fafb',
      secondary: mode === 'light' ? '#6b7280' : '#9ca3af',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
});

// App Content Component (needs to be inside Provider to use hooks)
const AppContent: React.FC = () => {
  const { theme } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  // Initialize Keycloak and check authentication status
  useEffect(() => {
    const initializeKeycloak = async () => {
      try {
        const authenticated = await initKeycloak({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
        });

        if (authenticated && keycloakInstance.tokenParsed) {
          // User is authenticated, dispatch action to update Redux
          await dispatch(checkAuthStatus());
        }
        setKeycloakInitialized(true);
      } catch (error) {
        console.error('Keycloak initialization failed:', error);
        setKeycloakInitialized(true);
      }
    };

    initializeKeycloak();
  }, [dispatch]);

  if (!keycloakInitialized) {
    return (
      <Box className="flex items-center justify-center min-h-screen bg-loading">
        <CircularProgress />
      </Box>
    );
  }

  const muiTheme = createMuiTheme(theme);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'dark' : ''
      }`}>
        <Routes>
          {/* Login Route */}
          <Route 
            path={ROUTES.LOGIN} 
            element={<LoginPage />} 
          />
          
          {/* Protected Dashboard Route */}
          <Route 
            path={ROUTES.DASHBOARD} 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Default Route - Redirect to Dashboard */}
          <Route 
            path={ROUTES.HOME} 
            element={<Navigate to={ROUTES.DASHBOARD} replace />} 
          />
          
          {/* Catch all route - Redirect to Dashboard */}
          <Route 
            path="*" 
            element={<Navigate to={ROUTES.DASHBOARD} replace />} 
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;