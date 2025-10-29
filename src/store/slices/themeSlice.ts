import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Theme, ThemeState } from '../../types/index.ts';
import { THEMES, STORAGE_KEYS } from '../../constants/index.ts';
import { storage } from '../../utils/index.ts';

// Load theme from localStorage on initialization
const loadThemeFromStorage = (): Theme => {
  try {
    const savedTheme = storage.get<Theme>(STORAGE_KEYS.THEME);
    // Validate that the saved theme is a valid theme value
    if (savedTheme === THEMES.LIGHT || savedTheme === THEMES.DARK) {
      return savedTheme;
    }
  } catch (error) {
    console.error('Error loading theme from storage:', error);
  }
  // Default to light theme if no valid theme found
  return THEMES.LIGHT;
};

const initialState: ThemeState = {
  theme: loadThemeFromStorage(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      // Save to localStorage
      storage.set(STORAGE_KEYS.THEME, action.payload);
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
      state.theme = newTheme;
      // Save to localStorage
      storage.set(STORAGE_KEYS.THEME, newTheme);
    },
    clearTheme: (state) => {
      // Reset to default theme and clear from storage
      state.theme = THEMES.LIGHT;
      storage.remove(STORAGE_KEYS.THEME);
    },
  },
});

export const { setTheme, toggleTheme, clearTheme } = themeSlice.actions;
export default themeSlice.reducer;
