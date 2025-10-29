import React, { forwardRef } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton,
  Chip
} from '@mui/material';
import { 
  ExpandMore, 
  ExpandLess, 
  Person,
  Business,
  Work
} from '@mui/icons-material';
import type { EmployeeCardProps } from '../../types/index.ts';

const EmployeeCard = forwardRef<HTMLDivElement, EmployeeCardProps>(
  ({ employee, onToggleExpand, isHighlighted = false }, ref) => {
    const { id, name, role, department, subordinates, isExpanded, level } = employee;
    
    const hasSubordinates = subordinates.length > 0;

    const handleToggleExpand = () => {
      if (hasSubordinates) {
        onToggleExpand(id);
      }
    };

    const getLevelIndentation = () => {
      return level * 24;
    };

    return (
      <div 
        ref={ref}
        className={`employee-card-wrapper transition-all duration-200 ${
          isHighlighted ? 'highlight' : ''
        }`}
        style={{ marginLeft: getLevelIndentation() }}
        data-level={level}
      >
        <Card 
          className={`employee-card cursor-pointer hover:shadow-lg transition-all duration-200 ${
            isHighlighted ? 'ring-2 ring-yellow-400 dark:ring-yellow-500' : ''
          }`}
          onClick={handleToggleExpand}
        >
          <CardContent className="p-3 sm:p-4">
            <Box className="flex items-center justify-between gap-2">
              <Box className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                <Box className="flex-1 min-w-0">
                  <Typography 
                    variant="h6" 
                    className="font-semibold text-primary overflow-hidden text-ellipsis whitespace-nowrap text-sm sm:text-base md:text-lg"
                  >
                    {name}
                  </Typography>
                  
                  <Box className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 sm:space-x-2 mt-1">
                    <Chip
                      icon={<Work className="text-xs" />}
                      label={role}
                      size="small"
                      variant="outlined"
                      className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      sx={{
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        height: { xs: '20px', sm: '24px' },
                      }}
                    />
                    
                    <Chip
                      icon={<Business className="text-xs" />}
                      label={department}
                      size="small"
                      variant="outlined"
                      className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      sx={{
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        height: { xs: '20px', sm: '24px' },
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              {hasSubordinates && (
                <IconButton
                  onClick={handleToggleExpand}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0"
                  size="small"
                  sx={{
                    padding: { xs: '4px', sm: '8px' },
                  }}
                >
                  {isExpanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )}
            </Box>

            {hasSubordinates && (
              <Box className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <Typography 
                  variant="caption" 
                  className="text-gray-500 dark:text-gray-400 flex items-center text-xs sm:text-sm"
                >
                  <Person className="text-xs mr-1" />
                  {subordinates.length} {subordinates.length === 1 ? 'subordinate' : 'subordinates'}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
);

EmployeeCard.displayName = 'EmployeeCard';

export default React.memo(EmployeeCard);
