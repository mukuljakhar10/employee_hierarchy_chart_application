import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  IconButton,
  InputAdornment,
} from '@mui/material';
import { 
  Search, 
  Clear
} from '@mui/icons-material';
import { useAppDispatch } from '../../store';
import { setSearchFilters, clearSearch, searchAndExpandToEmployee, expandAllNodes } from '../../store/slices/employeeSlice';
import { debounce } from '../../utils';
import type { SearchFilters } from '../../types/index.ts';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [hasExpanded, setHasExpanded] = useState(false);

  // Create debounced search function
  const debouncedSearchRef = useRef(
    debounce((name: string) => {
      const filters: SearchFilters = {
        name,
        role: '',
        department: '',
      };
      dispatch(setSearchFilters(filters));
      // If searching by name, also expand to show the employee
      if (name) {
        dispatch(searchAndExpandToEmployee(name));
      }
    }, 300)
  );

  // Update debounced function when dispatch changes
  useEffect(() => {
    debouncedSearchRef.current = debounce((name: string) => {
      const filters: SearchFilters = {
        name,
        role: '',
        department: '',
      };
      dispatch(setSearchFilters(filters));
      if (name) {
        dispatch(searchAndExpandToEmployee(name));
      }
    }, 300);
  }, [dispatch]);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSearchQuery(value);
    
    // Expand all nodes when user starts typing (only once per search session)
    if (value && !hasExpanded) {
      dispatch(expandAllNodes());
      setHasExpanded(true);
    }
    
    // Reset expanded flag when search is cleared
    if (!value && hasExpanded) {
      setHasExpanded(false);
    }
    
    debouncedSearchRef.current(value);
  };

  // Clear search
  const handleClear = () => {
    setLocalSearchQuery('');
    setHasExpanded(false);
    dispatch(clearSearch());
    debouncedSearchRef.current('');
  };

  return (
    <Box className="search-container">
      <Box className="flex items-center space-x-2 sm:space-x-4 mb-3 sm:mb-4">
        <TextField
          fullWidth
          placeholder="Search employees by name..."
          value={localSearchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-gray-400" sx={{ fontSize: { xs: '18px', sm: '24px' } }} />
              </InputAdornment>
            ),
            endAdornment: localSearchQuery && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClear}
                  size="small"
                  sx={{
                    padding: { xs: '4px', sm: '8px' },
                  }}
                >
                  <Clear sx={{ fontSize: { xs: '18px', sm: '20px' } }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="search-input"
          sx={{
            '& .MuiInputBase-input': {
              fontSize: { xs: '14px', sm: '16px' },
              padding: { xs: '10px 12px', sm: '12px 14px' },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default React.memo(SearchBar);
