import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Employee, EmployeeNode, EmployeeState, SearchFilters } from '../../types/index.ts';

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const employeesModule = await import('../../data/employees.json');
      const employees: Employee[] = employeesModule.default;
      
      return employees;
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      return rejectWithValue('Failed to fetch employees');
    }
  }
);

const buildEmployeeTree = (employees: Employee[], expandedNodes: number[] = []): EmployeeNode[] => {
  const employeeMap = new Map<number, EmployeeNode>();
  const rootEmployees: EmployeeNode[] = [];

  employees.forEach(employee => {
    employeeMap.set(employee.id, {
      ...employee,
      subordinates: [],
      isExpanded: expandedNodes.includes(employee.id),
      level: 0,
    });
  });

  employees.forEach(employee => {
    const employeeNode = employeeMap.get(employee.id)!;
    
    if (employee.managerId === null) {
      rootEmployees.push(employeeNode);
    } else {
      const manager = employeeMap.get(employee.managerId);
      if (manager) {
        manager.subordinates.push(employeeNode);
        employeeNode.level = manager.level + 1;
      }
    }
  });

  return rootEmployees;
};

const filterEmployees = (employees: Employee[], filters: SearchFilters): Employee[] => {
  return employees.filter(employee => {
    const nameMatch = !filters.name || 
      employee.name.toLowerCase().includes(filters.name.toLowerCase());
    const roleMatch = !filters.role || employee.role === filters.role;
    const departmentMatch = !filters.department || employee.department === filters.department;
    
    return nameMatch && roleMatch && departmentMatch;
  });
};

const initialState: EmployeeState = {
  employees: [],
  employeeTree: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedRole: '',
  selectedDepartment: '',
  expandedNodes: [],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setSearchFilters: (state, action: PayloadAction<SearchFilters>) => {
      state.searchQuery = action.payload.name;
      state.selectedRole = action.payload.role;
      state.selectedDepartment = action.payload.department;
      
      const filteredEmployees = filterEmployees(state.employees, action.payload);
      state.employeeTree = buildEmployeeTree(filteredEmployees, state.expandedNodes);
    },
    toggleNodeExpansion: (state, action: PayloadAction<number>) => {
      const nodeId = action.payload;
      const toggleExpansion = (nodes: EmployeeNode[]): void => {
        nodes.forEach(node => {
          if (node.id === nodeId) {
            node.isExpanded = !node.isExpanded;
            if (node.isExpanded) {
              if (!state.expandedNodes.includes(nodeId)) {
                state.expandedNodes.push(nodeId);
              }
            } else {
              state.expandedNodes = state.expandedNodes.filter(id => id !== nodeId);
            }
          } else {
            toggleExpansion(node.subordinates);
          }
        });
      };
      
      toggleExpansion(state.employeeTree);
    },
    expandAllNodes: (state) => {
      const expandAll = (nodes: EmployeeNode[]): void => {
        nodes.forEach(node => {
          node.isExpanded = true;
          if (!state.expandedNodes.includes(node.id)) {
            state.expandedNodes.push(node.id);
          }
          expandAll(node.subordinates);
        });
      };
      
      expandAll(state.employeeTree);
    },
    collapseAllNodes: (state) => {
      const collapseAll = (nodes: EmployeeNode[]): void => {
        nodes.forEach(node => {
          node.isExpanded = false;
          collapseAll(node.subordinates);
        });
      };
      
      collapseAll(state.employeeTree);
      state.expandedNodes = [];
    },
    clearSearch: (state) => {
      state.searchQuery = '';
      state.selectedRole = '';
      state.selectedDepartment = '';
      state.employeeTree = buildEmployeeTree(state.employees, state.expandedNodes);
    },
    clearError: (state) => {
      state.error = null;
    },
    searchAndExpandToEmployee: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload.toLowerCase();
      if (!searchQuery) return;

      const findMatchingEmployees = (nodes: EmployeeNode[], path: number[] = []): number[][] => {
        let matches: number[][] = [];
        
        nodes.forEach(node => {
          const currentPath = [...path, node.id];
          
          if (node.name.toLowerCase().includes(searchQuery)) {
            matches.push(currentPath);
          }
          
          if (node.subordinates.length > 0) {
            const childMatches = findMatchingEmployees(node.subordinates, currentPath);
            matches = matches.concat(childMatches);
          }
        });
        
        return matches;
      };

      const matchingPaths = findMatchingEmployees(state.employeeTree);
      
      matchingPaths.forEach(path => {
        path.slice(0, -1).forEach(nodeId => {
          if (!state.expandedNodes.includes(nodeId)) {
            state.expandedNodes.push(nodeId);
          }
        });
      });

      state.employeeTree = buildEmployeeTree(state.employees, state.expandedNodes);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees = action.payload;
        state.employeeTree = buildEmployeeTree(action.payload, state.expandedNodes);
        state.error = null;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchFilters,
  toggleNodeExpansion,
  expandAllNodes,
  collapseAllNodes,
  clearSearch,
  clearError,
  searchAndExpandToEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
