import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import type { Theme, ThemeState } from '../../types/index.ts';
import { THEMES, COOKIE_KEYS } from '../../constants/index.ts';

const initialState: ThemeState = {
  theme: (Cookies.get(COOKIE_KEYS.THEME) as Theme) || THEMES.LIGHT,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      // Store theme preference in cookies
      Cookies.set(COOKIE_KEYS.THEME, action.payload, { expires: 365 });
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
      state.theme = newTheme;
      // Store theme preference in cookies
      Cookies.set(COOKIE_KEYS.THEME, newTheme, { expires: 365 });
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
