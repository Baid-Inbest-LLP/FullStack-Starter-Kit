import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../constants';
import { DEFAULT_THEME_COLOR, isThemeKey } from '../../constants/themeColors';

const storedThemeColor = localStorage.getItem(STORAGE_KEYS.THEME_COLOR);

const initialState = {
  theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'light',
  // Cached copy of the server's app-wide theme, so the right colors paint before it loads.
  themeColor: isThemeKey(storedThemeColor) ? storedThemeColor : DEFAULT_THEME_COLOR,
  sidebarCollapsed: true,
  filters: {},
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem(STORAGE_KEYS.THEME, action.payload);
    },
    setThemeColor: (state, action) => {
      // Unknown keys (e.g. a theme removed from the kit) fall back to the default.
      state.themeColor = isThemeKey(action.payload) ? action.payload : DEFAULT_THEME_COLOR;
      localStorage.setItem(STORAGE_KEYS.THEME_COLOR, state.themeColor);
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
});

export const { setTheme, setThemeColor, toggleSidebar, setFilters, clearFilters } =
  commonSlice.actions;
export default commonSlice.reducer;
