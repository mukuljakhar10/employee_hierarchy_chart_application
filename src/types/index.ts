// User types
export interface User {
  id: string | number;
  username: string;
  password?: string; // Optional for Keycloak (not used)
  name: string;
  role: string;
  email?: string; // Optional for Keycloak
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Employee types
export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  managerId: number | null;
}

export interface EmployeeNode extends Employee {
  subordinates: EmployeeNode[];
  isExpanded: boolean;
  level: number;
}

export interface EmployeeState {
  employees: Employee[];
  employeeTree: EmployeeNode[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedRole: string;
  selectedDepartment: string;
  expandedNodes: number[];
}

// Theme types
export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
}

// Search filters
export interface SearchFilters {
  name: string;
  role: string;
  department: string;
}

// Root state will be inferred from store

// Component props
export interface EmployeeCardProps {
  employee: EmployeeNode;
  onToggleExpand: (id: number) => void;
  isHighlighted?: boolean;
}

export interface SearchBarProps {
  roles: string[];
  departments: string[];
}

export interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  isLoading: boolean;
  error: string | null;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
