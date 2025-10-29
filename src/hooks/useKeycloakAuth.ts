import { useAppDispatch, useAppSelector } from '../store';
import keycloakInstance, { resetKeycloak } from '../services/keycloakService';
import { logoutUser } from '../store/slices/authSlice';

/**
 * Custom hook for Keycloak authentication
 * Note: Initialization should happen once in App.tsx using initializeKeycloak
 * This hook only provides login/logout functions and reads auth state from Redux
 */
export const useKeycloakAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(state => state.auth);

  const login = () => {
    keycloakInstance.login({
      redirectUri: `${window.location.origin}/dashboard`,
    });
  };

  const logout = async () => {
    try {
      await keycloakInstance.logout({
        redirectUri: `${window.location.origin}/login`,
      });
      resetKeycloak();
      dispatch(logoutUser());
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, clear local state
      resetKeycloak();
      dispatch(logoutUser());
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};

/**
 * Initialize Keycloak once when app starts
 * Should be called only once in App.tsx
 */
export const initializeKeycloak = async (
  dispatch: any,
  checkAuthStatus: any
): Promise<boolean> => {
  try {
    const { initKeycloak } = await import('../services/keycloakService');
    const authenticated = await initKeycloak({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      pkceMethod: 'S256',
    });

    // Check auth status after initialization (handles redirect callback)
    if (authenticated) {
      await dispatch(checkAuthStatus());
    }
    return true;
  } catch (error) {
    console.error('Keycloak initialization failed:', error);
    // Even if initialization fails, we should still allow app to render
    // User can retry login
    return false;
  }
};
