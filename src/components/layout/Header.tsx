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
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleTheme, clearTheme } from '../../store/slices/themeSlice';
import { useKeycloakAuth } from '../../hooks/useKeycloakAuth';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { theme } = useAppSelector(state => state.theme);
  const { logout } = useKeycloakAuth();
  
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
    try {
      dispatch(clearTheme());
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      className="dashboard-header"
      style={{ 
        backgroundColor: 'var(--bg-primary)', 
        borderBottom: '1px solid var(--border-primary)',
        zIndex: 1100
      }}
    >
      <Toolbar className="px-2 sm:px-4 md:px-6">
        <Typography 
          variant="h6" 
          component="div" 
          className="flex-grow text-primary text-sm sm:text-base md:text-lg truncate"
        >
          <span className="hidden sm:inline">Employee Hierarchy Chart</span>
          <span className="sm:hidden">EHC</span>
        </Typography>

        <Box className="flex items-center space-x-2 sm:space-x-4">
          <IconButton
            onClick={handleThemeToggle}
            className="text-secondary"
            aria-label="toggle theme"
            size="small"
            sx={{ 
              padding: { xs: '8px', sm: '12px' },
            }}
          >
            {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>

          <Box 
            className="flex items-center space-x-1 sm:space-x-2 cursor-pointer rounded-lg p-1 sm:p-2 transition-colors hover:bg-tertiary"
            onClick={handleMenuClick}
          >
            <Avatar 
              className="bg-blue-600 text-white w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm"
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            
            <Box className="hidden sm:block">
              <Typography 
                variant="body2" 
                className="text-primary font-semibold text-xs sm:text-sm"
              >
                {user?.name}
              </Typography>
              <Typography 
                variant="caption" 
                className="text-secondary text-xs"
              >
                {user?.role}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          className="mt-2"
          PaperProps={{
            className: "user-menu-dropdown"
          }}
        >
          <MenuItem 
            onClick={handleMenuClose}
            className="flex items-center space-x-2 text-primary hover:bg-tertiary"
          >
            <Person className="text-tertiary" />
            <Box>
              <Typography 
                variant="body2" 
                className="font-semibold text-primary"
              >
                {user?.name}
              </Typography>
              <Typography 
                variant="caption" 
                className="text-secondary"
              >
                {user?.username}
              </Typography>
            </Box>
          </MenuItem>
          
          <Divider style={{ borderColor: 'var(--border-primary)', margin: '0.25rem 0' }} />
          
          <MenuItem 
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 hover:bg-red-50"
          >
            <Logout className="text-red-600" />
            <Typography variant="body2" className="text-red-600">
              Sign Out
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
