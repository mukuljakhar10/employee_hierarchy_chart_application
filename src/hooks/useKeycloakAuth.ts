import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import keycloakInstance, { initKeycloak, resetKeycloak } from '../services/keycloakService';
import { checkAuthStatus, logoutUser } from '../store/slices/authSlice';

export const useKeycloakAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const authenticated = await initKeycloak({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      });
      if (!mounted) return;
      if (authenticated) {
        await dispatch(checkAuthStatus());
      }
      setIsInitialized(true);
    };
    init();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const login = () => {
    keycloakInstance.login({
      redirectUri: `${window.location.origin}/dashboard`,
    });
  };

  const logout = async () => {
    await keycloakInstance.logout({
      redirectUri: `${window.location.origin}/login`,
    });
    resetKeycloak();
    dispatch(logoutUser());
  };

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || !isInitialized,
    login,
    logout,
  };
};
