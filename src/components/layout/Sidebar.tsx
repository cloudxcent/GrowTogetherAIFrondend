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
  { text: 'AI Chat and Tutor', icon: AIIcon, path: '/ai-tutor', roles: ['parent', 'student', 'admin'], premium: true },
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
    <Box sx={{ width: drawerWidth, pt: 4 }}>
      {/* Company Logo at the top */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            mb: 1,
          }}
        >
          <span role="img" aria-label="logo">🤖</span>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>
          GrowTogether AI
        </Typography>
      </Box>
      {/* User Info (single line, above menu) */}
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, gap: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
          Logged in as
        </Typography>
        <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: 100 }}>
          {user?.name}
        </Typography>
        <Chip
          label={user?.role?.toUpperCase()}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ fontSize: '0.7rem', height: 20 }}
        />
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
              py: 0.5,
              display: 'block',
              color: 'text.secondary',
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            {section.section}
          </Typography>
          <List sx={{ px: 1, py: 0 }}>
            {section.items
              .filter(item => item.roles.includes(user?.role || 'student'))
              .map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <ListItem key={item.text} disablePadding sx={{ minHeight: 36 }}>
                    <ListItemButton
                      onClick={() => handleNavigation(item.path)}
                      sx={{
                        borderRadius: 2,
                        mb: 0.2,
                        mx: 1,
                        minHeight: 36,
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
                          minWidth: 36,
                        }}
                      >
                        <Icon />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          '& .MuiListItemText-primary': {
                            fontWeight: active ? 600 : 500,
                            fontSize: '0.97rem',
                          },
                        }}
                      />
                      {item.premium && (
                        <Chip
                          label="PRO"
                          size="small"
                          color="secondary"
                          sx={{
                            height: 18,
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
            <Divider sx={{ my: 0.5, mx: 2 }} />
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
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
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