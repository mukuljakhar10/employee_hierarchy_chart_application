import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Theme, ThemeState } from '../../types/index.ts';
import { THEMES, STORAGE_KEYS } from '../../constants/index.ts';
import { storage } from '../../utils/index.ts';

const loadThemeFromStorage = (): Theme => {
  try {
    const savedTheme = storage.get<Theme>(STORAGE_KEYS.THEME);
    if (savedTheme === THEMES.LIGHT || savedTheme === THEMES.DARK) {
      return savedTheme;
    }
  } catch (error) {
    console.error('Error loading theme from storage:', error);
  }
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
      storage.set(STORAGE_KEYS.THEME, action.payload);
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
      state.theme = newTheme;
      storage.set(STORAGE_KEYS.THEME, newTheme);
    },
    clearTheme: (state) => {
      state.theme = THEMES.LIGHT;
      storage.remove(STORAGE_KEYS.THEME);
    },
  },
});

export const { setTheme, toggleTheme, clearTheme } = themeSlice.actions;
export default themeSlice.reducer;
