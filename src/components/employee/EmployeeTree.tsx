import React, { useEffect, useRef } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchEmployees, toggleNodeExpansion, expandAllNodes, collapseAllNodes } from '../../store/slices/employeeSlice';
import EmployeeCard from './EmployeeCard';
import type { EmployeeNode } from '../../types';

interface EmployeeTreeProps {
  searchQuery: string;
}

const EmployeeTree: React.FC<EmployeeTreeProps> = ({ 
  searchQuery
}) => {
  const dispatch = useAppDispatch();
  const { 
    employeeTree, 
    isLoading, 
    error, 
    expandedNodes 
  } = useAppSelector(state => state.employees);
  
  const treeRef = useRef<HTMLDivElement>(null);
  const highlightedNodeRef = useRef<HTMLDivElement>(null);

  // Fetch employees on component mount
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Scroll to highlighted node when search query changes
  useEffect(() => {
    if (searchQuery && highlightedNodeRef.current) {
      highlightedNodeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [searchQuery]);

  const handleToggleExpand = (id: number) => {
    dispatch(toggleNodeExpansion(id));
  };

  const handleExpandAll = () => {
    dispatch(expandAllNodes());
  };

  const handleCollapseAll = () => {
    dispatch(collapseAllNodes());
  };

  const renderEmployeeNode = (employee: EmployeeNode): React.ReactNode => {
    const isHighlighted = Boolean(searchQuery && 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      <div key={employee.id} className="mb-2 sm:mb-4">
        <div ref={isHighlighted ? highlightedNodeRef : null}>
          <EmployeeCard
            employee={employee}
            onToggleExpand={handleToggleExpand}
            isHighlighted={isHighlighted}
          />
        </div>

        {/* Render subordinates if expanded */}
        {employee.isExpanded && employee.subordinates.length > 0 && (
          <div className="tree-connector mt-1 sm:mt-2">
            {employee.subordinates.map(subordinate => 
              renderEmployeeNode(subordinate)
            )}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center py-12">
        <div className="text-center">
          <CircularProgress size={48} className="text-blue-600 mb-4" />
          <Typography variant="body1" className="text-secondary">
            Loading employee hierarchy...
          </Typography>
        </div>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="py-8">
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
        <Typography variant="body2" className="text-secondary">
          Please try refreshing the page or contact support if the problem persists.
        </Typography>
      </Box>
    );
  }

  if (employeeTree.length === 0) {
    return (
      <Box className="py-12 text-center">
        <Typography variant="h6" className="text-secondary mb-2">
          No employees found
        </Typography>
        <Typography variant="body2" className="text-tertiary">
          Try adjusting your search filters or check back later.
        </Typography>
      </Box>
    );
  }

  return (
    <div ref={treeRef} className="space-y-4">
      {/* Tree Controls */}
      <Box className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <Typography 
          variant="h5" 
          className="font-semibold text-primary text-lg sm:text-xl md:text-2xl"
        >
          Organizational Chart
        </Typography>
        
        <Box className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={handleExpandAll}
            className="btn-outline text-xs sm:text-sm py-2 px-2 sm:px-3 flex-1 sm:flex-none touch-manipulation"
            style={{ minHeight: '44px' }}
          >
            Expand All
          </button>
          <button
            onClick={handleCollapseAll}
            className="btn-outline text-xs sm:text-sm py-2 px-2 sm:px-3 flex-1 sm:flex-none touch-manipulation"
            style={{ minHeight: '44px' }}
          >
            Collapse All
          </button>
        </Box>
      </Box>

      <div className="space-y-4">
        {employeeTree.map(employee => renderEmployeeNode(employee))}
      </div>

      {/* Tree Statistics */}
      <Box className="mt-4 sm:mt-6 md:mt-8 p-3 sm:p-4 rounded-lg bg-tertiary">
        <Typography variant="body2" className="text-secondary text-xs sm:text-sm">
          <span className="block sm:inline">Total Employees: {employeeTree.length > 0 ? 
            employeeTree.reduce((count, node) => {
              const countSubordinates = (node: EmployeeNode): number => {
                return 1 + node.subordinates.reduce((sum, sub) => sum + countSubordinates(sub), 0);
              };
              return count + countSubordinates(node);
            }, 0) : 0
          }</span>
          <span className="hidden sm:inline"> | </span>
          <span className="block sm:inline mt-1 sm:mt-0">Expanded Nodes: {expandedNodes.length}</span>
        </Typography>
      </Box>
    </div>
  );
};

export default React.memo(EmployeeTree);
