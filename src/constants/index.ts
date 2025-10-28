// API endpoints
export const API_ENDPOINTS = {
  EMPLOYEES: '/api/employees',
  USERS: '/api/users',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'employee-hierarchy-theme',
  USER: 'employee-hierarchy-user',
} as const;


// Theme options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

// Routes
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  HOME: '/',
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  FAST: '150ms',
  NORMAL: '300ms',
  SLOW: '500ms',
} as const;

// Search debounce delay
export const SEARCH_DEBOUNCE_DELAY = 300;

// Employee hierarchy levels
export const HIERARCHY_LEVELS = {
  CEO: 0,
  C_LEVEL: 1,
  MANAGER: 2,
  EMPLOYEE: 3,
} as const;

// Department colors for visualization
export const DEPARTMENT_COLORS = {
  Executive: '#8B5CF6',
  Technology: '#06B6D4',
  Finance: '#10B981',
  Operations: '#F59E0B',
  HR: '#EF4444',
  Marketing: '#EC4899',
  Sales: '#84CC16',
} as const;
