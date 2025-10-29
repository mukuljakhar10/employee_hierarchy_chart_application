import { useAppDispatch, useAppSelector, type AppDispatch } from '../store';
import keycloakInstance, { resetKeycloak } from '../services/keycloakService';
import { logoutUser, checkAuthStatus as checkAuthStatusThunk } from '../store/slices/authSlice';

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

export const initializeKeycloak = async (
  dispatch: AppDispatch,
  checkAuthStatus: typeof checkAuthStatusThunk
): Promise<boolean> => {
  try {
    const { initKeycloak } = await import('../services/keycloakService');
    const authenticated = await initKeycloak({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      pkceMethod: 'S256',
    });
    if (authenticated) {
      await dispatch(checkAuthStatus());
    }
    return true;
  } catch (error) {
    console.error('Keycloak initialization failed:', error);
    return false;
  }
};
