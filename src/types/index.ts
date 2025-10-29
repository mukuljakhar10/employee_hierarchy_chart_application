export interface User {
  id: string | number;
  username: string;
  password?: string;
  name: string;
  role: string;
  email?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

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

export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
}

export interface SearchFilters {
  name: string;
  role: string;
  department: string;
}
export interface EmployeeCardProps {
  employee: EmployeeNode;
  onToggleExpand: (id: number) => void;
  isHighlighted?: boolean;
}
