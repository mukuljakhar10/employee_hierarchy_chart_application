import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthState } from '../../types/index.ts';
import keycloakInstance, { resetKeycloak } from '../../services/keycloakService';

// Async thunk for checking Keycloak authentication status
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      // Check if user is authenticated (don't initialize again)
      if (keycloakInstance.authenticated && keycloakInstance.tokenParsed) {
        const user: User = {
          id: keycloakInstance.tokenParsed.sub || '',
          username: keycloakInstance.tokenParsed.preferred_username || '',
          name: keycloakInstance.tokenParsed.name || '',
          email: keycloakInstance.tokenParsed.email || '',
          role: keycloakInstance.tokenParsed.realm_access?.roles?.[0] || 'Employee',
          password: '', // Not used with Keycloak
        };
        return user;
      }
      return null;
    } catch (error) {
      console.error('Failed to check authentication status:', error);
      return rejectWithValue('Failed to check authentication status');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      resetKeycloak();
      return null;
    } catch (error) {
      console.error('Failed to logout:', error);
      return rejectWithValue('Logout failed');
    }
  }
);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
