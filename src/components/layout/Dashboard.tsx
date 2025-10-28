import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchEmployees } from '../../store/slices/employeeSlice';
import { getUniqueRoles, getUniqueDepartments } from '../../utils';
import Header from './Header';
import SearchBar from '../employee/SearchBar';
import EmployeeTree from '../employee/EmployeeTree';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { employees, searchQuery, selectedRole, selectedDepartment } = useAppSelector(
    state => state.employees
  );

  // Get unique roles and departments for filters
  const uniqueRoles = getUniqueRoles(employees);
  const uniqueDepartments = getUniqueDepartments(employees);

  // Fetch employees on component mount
  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  return (
    <Box className="dashboard-container h-screen overflow-hidden">
      <Header />
      
      <Box className="custom-scrollbar" style={{ height: 'calc(100vh - 64px)', overflow: 'auto' }}>
        <Container maxWidth="xl" className="py-8">
        <Box className="mb-8">
          <Typography 
            variant="h3" 
            component="h1" 
            className="text-primary font-bold mb-2"
          >
            Employee Hierarchy
          </Typography>
          <Typography 
            variant="body1" 
            className="text-secondary"
          >
            Explore the organizational structure and find employees across departments
          </Typography>
        </Box>

        {/* Search and Filters */}
        <SearchBar 
          roles={uniqueRoles}
          departments={uniqueDepartments}
        />

        {/* Employee Tree */}
        <Box className="dashboard-content">
          <EmployeeTree 
            searchQuery={searchQuery}
            selectedRole={selectedRole}
            selectedDepartment={selectedDepartment}
          />
        </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
