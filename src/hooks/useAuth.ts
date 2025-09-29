import { useAppDispatch, useAppSelector } from '../store';
import { loginUser, logoutUser, clearError } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector(state => state.auth);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const result = await dispatch(loginUser({ username, password }));
      return result.type === 'auth/loginUser/fulfilled';
    } catch (error) {
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    await dispatch(logoutUser());
  };

  const clearAuthError = (): void => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearAuthError,
  };
};
