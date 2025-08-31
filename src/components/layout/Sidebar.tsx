import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  Payment as PaymentIcon,
  Settings as SettingsIcon,
  SmartToy as AIIcon,
  Tv as TvIcon,
  EmojiEvents as BadgeIcon,
  AccountCircle as ProfileIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const drawerWidth = 280;

const menuItems = [
  {
    section: 'Main',
    items: [
      { text: 'Dashboard', icon: DashboardIcon, path: '/dashboard', roles: ['parent', 'student', 'admin'] },
      { text: 'Courses', icon: SchoolIcon, path: '/courses', roles: ['parent', 'student', 'admin'] },
      { text: 'Tasks', icon: AssignmentIcon, path: '/tasks', roles: ['parent', 'student', 'admin'] },
      { text: 'AI Tutor', icon: AIIcon, path: '/ai-tutor', roles: ['parent', 'student', 'admin'], premium: true },
    ],
  },
  {
    section: 'Learning',
    items: [
      { text: 'TV Experience', icon: TvIcon, path: '/tv', roles: ['parent', 'student', 'admin'] },
      { text: 'Achievements', icon: BadgeIcon, path: '/achievements', roles: ['parent', 'student', 'admin'] },
      { text: 'Analytics', icon: AnalyticsIcon, path: '/analytics', roles: ['parent', 'student', 'admin'] },
    ],
  },
  {
    section: 'Management',
    items: [
      { text: 'Children', icon: PeopleIcon, path: '/children', roles: ['parent', 'admin'] },
      { text: 'Pricing', icon: PaymentIcon, path: '/pricing', roles: ['parent', 'admin'] },
      { text: 'Profile', icon: ProfileIcon, path: '/profile', roles: ['parent', 'student', 'admin'] },
      { text: 'Settings', icon: SettingsIcon, path: '/settings', roles: ['parent', 'student', 'admin'] },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'temporary';
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  variant = 'permanent',
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const drawerContent = (
    <Box sx={{ width: { xs: '80vw', sm: '260px' }, maxWidth: drawerWidth, pt: { xs: 7, md: 8 }, px: { xs: 1, sm: 0 } }}>
      {/* User Info */}
      <Box sx={{ position: 'relative', bottom: 16, left: 0, right: 0, px: { xs: 1, sm: 2 } }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Box
            sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: 2,
              backgroundColor: 'background.paper',
              border: 1,
              borderColor: 'divider',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'column' },
              alignItems: { xs: 'flex-start', sm: 'flex-start' },
              gap: 0.5,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Logged in as
            </Typography>
            <Typography variant="body2" fontWeight={600} noWrap sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
              {user?.name}
            </Typography>
            <Chip
              label={user?.role?.toUpperCase()}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mt: 1, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
            />
          </Box>
        </motion.div>
      </Box>
      {menuItems.map((section, sectionIndex) => (
        <motion.div
          key={section.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
        >
          <Typography
            variant="overline"
            sx={{
              px: 2,
              py: 1,
              display: 'block',
              color: 'text.secondary',
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {section.section}
          </Typography>
          
          <List sx={{ px: 1 }}>
            {section.items
              .filter(item => item.roles.includes(user?.role || 'student'))
              .map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigation(item.path)}
                      sx={{
                        wordBreak: 'break-all',
                        borderRadius: 2,
                        mb: 0.5,
                        mx: 1,
                        backgroundColor: active ? 'primary.main' : 'transparent',
                        color: active ? 'primary.contrastText' : 'text.primary',
                        '&:hover': {
                          backgroundColor: active ? 'primary.dark' : 'action.hover',
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: active ? 'primary.contrastText' : 'primary.main',
                          minWidth: 40,
                        }}
                      >
                        <Icon />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontWeight: active ? 600 : 500,
                          },
                        }}
                      />
                      {item.premium && (
                        <Chip
                          label="PRO"
                          size="small"
                          color="secondary"
                          sx={{
                            height: 20,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
          
          {sectionIndex < menuItems.length - 1 && (
            <Divider sx={{ my: 1, mx: 2 }} />
          )}
        </motion.div>
      ))}

    </Box>
  );

  return (
    <Drawer
      variant={variant}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: { xs: '80vw', sm: '280px' },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { xs: '80vw', sm: drawerWidth },
          maxWidth: drawerWidth,
          boxSizing: 'border-box',
          borderRight: 1,
          borderColor: 'divider',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};