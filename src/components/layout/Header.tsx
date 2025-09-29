import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { 
  Brightness4, 
  Brightness7, 
  Logout, 
  Person
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleTheme } from '../../store/slices/themeSlice';
import { logoutUser } from '../../store/slices/authSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, logout } = useAuth();
  const { theme } = useAppSelector(state => state.theme);
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      className="dashboard-header"
      sx={{ 
        backgroundColor: 'var(--bg-primary)', 
        borderBottom: '1px solid var(--border-primary)',
        zIndex: 1100
      }}
    >
      <Toolbar className="px-4 sm:px-6">
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, color: 'var(--text-primary)' }}
        >
          Employee Hierarchy Chart
        </Typography>

        <Box className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <IconButton
            onClick={handleThemeToggle}
            sx={{ color: 'var(--text-secondary)' }}
            aria-label="toggle theme"
          >
            {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>

          {/* User Menu */}
          <Box 
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
            onClick={handleMenuClick}
          >
            <Avatar 
              className="bg-blue-600 text-white w-8 h-8 text-sm"
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            
            <Box className="hidden sm:block">
              <Typography 
                variant="body2" 
                sx={{ color: 'var(--text-primary)', fontWeight: 500 }}
              >
                {user?.name}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ color: 'var(--text-secondary)' }}
              >
                {user?.role}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* User Menu Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          className="mt-2"
          PaperProps={{
            sx: {
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-primary)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }
          }}
        >
          <MenuItem 
            onClick={handleMenuClose}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Person className="text-gray-500" />
            <Box>
              <Typography variant="body2" className="font-medium">
                {user?.name}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                {user?.username}
              </Typography>
            </Box>
          </MenuItem>
          
          <Divider className="my-1" />
          
          <MenuItem 
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Logout className="text-red-500" />
            <Typography variant="body2">
              Sign Out
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
