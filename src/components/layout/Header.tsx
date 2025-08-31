import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Switch,
  InputBase,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleTheme } from '../../store/slices/themeSlice';
import { logout } from '../../store/slices/authSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Logo = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '& .logo-icon': {
    width: 40,
    height: 40,
    background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    fontSize: '1.5rem',
  },
}));

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.theme);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        backgroundColor: mode === 'dark' ? 'background.paper' : 'primary.main',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ px: { xs: 1, sm: 2, md: 4 }, minHeight: { xs: 56, sm: 64 } }}>
        <Logo
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.location.href = '/'}
          style={{ minWidth: 0 }}
        >
          <div className="logo-icon text-lg md:text-2xl">🤖</div>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'inherit', fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}>
            GrowTogether AI
          </Typography>
        </Logo>

        <Box sx={{ flexGrow: 1 }} />

        {/* AI-Powered Search */}
        <Box sx={{ minWidth: { xs: 120, sm: 200, md: 250 }, mx: { xs: 1, sm: 2 } }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="AI Search courses, tasks..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: 1, sm: 2 } }}>
          {/* Theme Toggle */}
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={handleThemeToggle} color="inherit" size="large">
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>

          {isAuthenticated && (
            <>
              {/* Notifications */}
              <Tooltip title="Notifications">
                <IconButton color="inherit" size="large">
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Profile */}
              <Tooltip title="Account">
                <IconButton
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{ ml: 1 }}
                  size="large"
                >
                  {user?.avatar ? (
                    <Avatar src={user.avatar} sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 } }} />
                  ) : (
                    <AccountCircle sx={{ fontSize: { xs: 28, sm: 32 } }} />
                  )}
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => { handleMenuClose(); window.location.href = '/profile'; }}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); window.location.href = '/children'; }}>Parental Controls</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};