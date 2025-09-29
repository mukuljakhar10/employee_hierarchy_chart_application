import React, { useState, useCallback } from 'react';
import { 
  Box, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  IconButton,
  InputAdornment,
  Chip,
  Button,
  Typography
} from '@mui/material';
import { 
  Search, 
  Clear, 
  FilterList,
  Business,
  Work
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store';
import { setSearchFilters, clearSearch, searchAndExpandToEmployee } from '../../store/slices/employeeSlice';
import { debounce } from '../../utils';
import type { SearchFilters } from '../../types/index.ts';

interface SearchBarProps {
  roles: string[];
  departments: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ roles, departments }) => {
  const dispatch = useAppDispatch();
  const { searchQuery, selectedRole, selectedDepartment } = useAppSelector(
    state => state.employees
  );

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((filters: SearchFilters) => {
      dispatch(setSearchFilters(filters));
      // If searching by name, also expand to show the employee
      if (filters.name) {
        dispatch(searchAndExpandToEmployee(filters.name));
      }
    }, 300),
    [dispatch]
  );

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSearchQuery(value);
    
    debouncedSearch({
      name: value,
      role: selectedRole,
      department: selectedDepartment,
    });
  };

  // Handle role filter change
  const handleRoleChange = (role: string) => {
    debouncedSearch({
      name: localSearchQuery,
      role,
      department: selectedDepartment,
    });
  };

  // Handle department filter change
  const handleDepartmentChange = (department: string) => {
    debouncedSearch({
      name: localSearchQuery,
      role: selectedRole,
      department,
    });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setLocalSearchQuery('');
    dispatch(clearSearch());
  };

  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Check if any filters are active
  const hasActiveFilters = localSearchQuery || selectedRole || selectedDepartment;

  return (
    <Box className="search-container">
      {/* Main Search Bar */}
      <Box className="flex items-center space-x-4 mb-4">
        <TextField
          fullWidth
          placeholder="Search employees by name..."
          value={localSearchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-400" />
              </InputAdornment>
            ),
            endAdornment: localSearchQuery && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setLocalSearchQuery('');
                    debouncedSearch({
                      name: '',
                      role: selectedRole,
                      department: selectedDepartment,
                    });
                  }}
                  size="small"
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="search-input"
        />

        <IconButton
          onClick={toggleFilters}
          className={`${showFilters ? 'bg-blue-100 dark:bg-blue-900' : ''} text-blue-600 dark:text-blue-400`}
        >
          <FilterList />
        </IconButton>

        {hasActiveFilters && (
          <Button
            onClick={handleClearFilters}
            variant="outlined"
            size="small"
            startIcon={<Clear />}
            className="btn-outline"
          >
            Clear All
          </Button>
        )}
      </Box>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Box className="flex items-center space-x-2 mb-4">
          <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
            Active filters:
          </Typography>
          
          {localSearchQuery && (
            <Chip
              icon={<Search />}
              label={`Name: "${localSearchQuery}"`}
              size="small"
              onDelete={() => {
                setLocalSearchQuery('');
                debouncedSearch({
                  name: '',
                  role: selectedRole,
                  department: selectedDepartment,
                });
              }}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
            />
          )}
          
          {selectedRole && (
            <Chip
              icon={<Work />}
              label={`Role: ${selectedRole}`}
              size="small"
              onDelete={() => handleRoleChange('')}
              className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
            />
          )}
          
          {selectedDepartment && (
            <Chip
              icon={<Business />}
              label={`Dept: ${selectedDepartment}`}
              size="small"
              onDelete={() => handleDepartmentChange('')}
              className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
            />
          )}
        </Box>
      )}

      {/* Advanced Filters */}
      {showFilters && (
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <FormControl fullWidth>
            <InputLabel className="dark:text-gray-300">Filter by Role</InputLabel>
            <Select
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              label="Filter by Role"
              className="dark:text-white"
            >
              <MenuItem value="">
                <span className="text-gray-500 dark:text-gray-400">All Roles</span>
              </MenuItem>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel className="dark:text-gray-300">Filter by Department</InputLabel>
            <Select
              value={selectedDepartment}
              onChange={(e) => handleDepartmentChange(e.target.value)}
              label="Filter by Department"
              className="dark:text-white"
            >
              <MenuItem value="">
                <span className="text-gray-500 dark:text-gray-400">All Departments</span>
              </MenuItem>
              {departments.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(SearchBar);
