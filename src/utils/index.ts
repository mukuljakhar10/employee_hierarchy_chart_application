import type { Employee, EmployeeNode } from '../types/index.ts';

// Debounce function for search
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Get unique values from array
export const getUniqueValues = <T>(array: T[], key: keyof T): T[keyof T][] => {
  const uniqueValues = new Set<T[keyof T]>();
  array.forEach(item => uniqueValues.add(item[key]));
  return Array.from(uniqueValues);
};

// Get all unique roles from employees
export const getUniqueRoles = (employees: Employee[]): string[] => {
  return getUniqueValues(employees, 'role').sort() as string[];
};

// Get all unique departments from employees
export const getUniqueDepartments = (employees: Employee[]): string[] => {
  return getUniqueValues(employees, 'department').sort() as string[];
};

// Find employee by ID in tree
export const findEmployeeInTree = (
  tree: EmployeeNode[],
  id: number
): EmployeeNode | null => {
  for (const node of tree) {
    if (node.id === id) {
      return node;
    }
    
    const found = findEmployeeInTree(node.subordinates, id);
    if (found) {
      return found;
    }
  }
  
  return null;
};

// Get all employee IDs in tree (for expansion state)
export const getAllEmployeeIds = (tree: EmployeeNode[]): number[] => {
  const ids: number[] = [];
  
  const collectIds = (nodes: EmployeeNode[]): void => {
    nodes.forEach(node => {
      ids.push(node.id);
      collectIds(node.subordinates);
    });
  };
  
  collectIds(tree);
  return ids;
};

// Calculate tree depth
export const getTreeDepth = (tree: EmployeeNode[]): number => {
  if (tree.length === 0) return 0;
  
  let maxDepth = 0;
  
  const calculateDepth = (nodes: EmployeeNode[], currentDepth: number): void => {
    nodes.forEach(node => {
      maxDepth = Math.max(maxDepth, currentDepth);
      calculateDepth(node.subordinates, currentDepth + 1);
    });
  };
  
  calculateDepth(tree, 1);
  return maxDepth;
};

// Format employee name for display
export const formatEmployeeName = (name: string): string => {
  return name.trim();
};

// Format role for display
export const formatRole = (role: string): string => {
  return role.replace(/([A-Z])/g, ' $1').trim();
};

// Get department color
export const getDepartmentColor = (department: string): string => {
  const colors: Record<string, string> = {
    Executive: '#8B5CF6',
    Technology: '#06B6D4',
    Finance: '#10B981',
    Operations: '#F59E0B',
    HR: '#EF4444',
    Marketing: '#EC4899',
    Sales: '#84CC16',
  };
  
  return colors[department] || '#6B7280';
};

// Validate email format (for future use)
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate random ID (for future use)
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Local storage helpers
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage quota exceeded
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle error
    }
  },
};
