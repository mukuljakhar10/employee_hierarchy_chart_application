import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Theme, ThemeState } from '../../types/index.ts';
import { THEMES } from '../../constants/index.ts';

const initialState: ThemeState = {
  theme: THEMES.LIGHT,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
      state.theme = newTheme;
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
