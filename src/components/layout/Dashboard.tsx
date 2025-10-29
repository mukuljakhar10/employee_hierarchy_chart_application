import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchEmployees } from '../../store/slices/employeeSlice';
import Header from './Header';
import SearchBar from '../employee/SearchBar';
import EmployeeTree from '../employee/EmployeeTree';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { employees, searchQuery } = useAppSelector(
    state => state.employees
  );

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
        <Container maxWidth="xl" className="py-4 sm:py-6 md:py-8 px-2 sm:px-4">
        <Box className="mb-4 sm:mb-6 md:mb-8">
          <Typography 
            variant="h3" 
            component="h1" 
            className="text-primary font-bold mb-2 text-2xl sm:text-3xl md:text-4xl"
          >
            Employee Hierarchy
          </Typography>
          <Typography 
            variant="body1" 
            className="text-secondary text-sm sm:text-base"
          >
            Explore the organizational structure and find employees across departments
          </Typography>
        </Box>

        {/* Search Bar */}
        <SearchBar />

        {/* Employee Tree */}
        <Box className="dashboard-content">
          <EmployeeTree searchQuery={searchQuery} />
        </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
