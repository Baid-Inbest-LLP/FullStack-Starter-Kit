export const DEFAULT_PAGE_SIZE = Number(import.meta.env.VITE_PAGE_SIZE) || 10;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'fullstack_starter_kit_access_token',
  REFRESH_TOKEN: 'fullstack_starter_kit_refresh_token',
  USER: 'fullstack_starter_kit_user',
  THEME: 'fullstack_starter_kit_theme',
  THEME_COLOR: 'fullstack_starter_kit_theme_color',
};

export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  CONTROL_CENTER: '/control-center',
  CONTROL_CENTER_THEME: '/control-center/theme',  SETTINGS: '/settings',
};

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

export const FY_MONTH_ORDER = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];
