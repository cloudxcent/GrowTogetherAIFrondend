import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondary,
  Divider,
  IconButton,
  Badge,
} from '@mui/material';
import {
  TrendingUp,
  Assignment,
  PlayArrow,
  Add,
  Star,
  Schedule,
  CheckCircle,
  Warning,
  SmartToy,
  EmojiEvents,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetTasksQuery } from '../store/api/coursesApi';
import { useGetUserAnalyticsQuery } from '../store/api/analyticsApi';
import { useGetChildrenQuery } from '../store/api/authApi';
import { Hero } from '../components/common/Hero';
import { mockBadges, mockAIRecommendations } from '../data/mockData';

const StatCard: React.FC<{
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}> = ({ title, value, subtitle, icon, color, trend }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight={700}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
            {trend && (
              <Chip
                label={trend}
                size="small"
                color="success"
                variant="outlined"
                sx={{ mt: 1 }}
              />
            )}
          </Box>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: `${color}20`,
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  </motion.div>
);

export const DashboardPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  
  // Mock user ID for demo
  const userId = user?.role === 'parent' ? 'child1' : user?.id || 'child1';
  
  const { data: tasks = [], isLoading: tasksLoading } = useGetTasksQuery(userId);
  const { data: analytics } = useGetUserAnalyticsQuery(userId);
  const { data: children = [] } = useGetChildrenQuery(user?.id || '1');

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const earnedBadges = mockBadges.filter(badge => badge.earned);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'pending': return 'warning';
      case 'overdue': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle />;
      case 'in-progress': return <PlayArrow />;
      case 'pending': return <Schedule />;
      case 'overdue': return <Warning />;
      default: return <Assignment />;
    }
  };

  if (tasksLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography>Loading dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Hero
        headline={`Welcome back, ${user?.name}! 👋`}
        subheadline={user?.role === 'parent'
          ? "Here's what your children have been learning today"
          : "Ready to continue your learning journey?"
        }
      />

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Learning Hours"
            value={analytics?.totalHours.toString() || '45.5'}
            subtitle="This month"
            icon={<Schedule />}
            color="#2563eb"
            trend="+12%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Courses"
            value={analytics?.coursesCompleted.toString() || '3'}
            subtitle="Total achievements"
            icon={<CheckCircle />}
            color="#10b981"
            trend="+2 this week"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Current Streak"
            value={`${analytics?.currentStreak || 7} days`}
            subtitle="Keep it up!"
            icon={<TrendingUp />}
            color="#f59e0b"
            trend="🔥"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="AI Interactions"
            value="24"
            subtitle="This week"
            icon={<SmartToy />}
            color="#8b5cf6"
            trend="+8"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Tasks & Assignments */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Tasks & Assignments
                  </Typography>
                  <Button
                    startIcon={<Add />}
                    variant="outlined"
                    size="small"
                  >
                    New Task
                  </Button>
                </Box>

                <List>
                  {tasks.slice(0, 5).map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <ListItem
                        sx={{
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 2,
                          mb: 1,
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                        secondaryAction={
                          <IconButton edge="end">
                            <PlayArrow />
                          </IconButton>
                        }
                      >
                        <ListItemIcon>
                          <Box
                            sx={{
                              color: getStatusColor(task.status) === 'success' 
                                ? 'success.main' 
                                : getStatusColor(task.status) === 'primary'
                                ? 'primary.main'
                                : getStatusColor(task.status) === 'warning'
                                ? 'warning.main'
                                : 'error.main'
                            }}
                          >
                            {getStatusIcon(task.status)}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {task.title}
                              </Typography>
                              {task.aiGenerated && (
                                <Chip label="AI" size="small" color="secondary" />
                              )}
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                              </Typography>
                              {task.status === 'in-progress' && (
                                <LinearProgress
                                  variant="determinate"
                                  value={task.progress}
                                  sx={{ mt: 1, height: 4, borderRadius: 2 }}
                                />
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                    </motion.div>
                  ))}
                </List>

                <Button fullWidth variant="text" sx={{ mt: 2 }}>
                  View All Tasks
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* AI Recommendations */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <SmartToy sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6" fontWeight={600}>
                        AI Recommendations
                      </Typography>
                    </Box>
                    
                    <List dense>
                      {mockAIRecommendations.slice(0, 3).map((rec, index) => (
                        <ListItem key={rec.id} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <Avatar
                              src={rec.thumbnail}
                              sx={{ width: 32, height: 32 }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={rec.title}
                            secondary={rec.reason}
                            secondaryTypographyProps={{ variant: 'caption' }}
                          />
                          <Chip
                            label={`${Math.round(rec.confidence * 100)}%`}
                            size="small"
                            variant="outlined"
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Recent Badges */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <EmojiEvents sx={{ mr: 1, color: 'warning.main' }} />
                      <Typography variant="h6" fontWeight={600}>
                        Recent Achievements
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {earnedBadges.slice(0, 3).map((badge, index) => (
                        <motion.div
                          key={badge.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 2,
                              border: 1,
                              borderColor: 'divider',
                              borderRadius: 2,
                              backgroundColor: `${badge.color}10`,
                            }}
                          >
                            <Box
                              sx={{
                                fontSize: '1.5rem',
                                mr: 2,
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                backgroundColor: badge.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {badge.icon}
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {badge.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Earned {new Date(badge.earnedDate!).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Quick Actions */}
            {user?.role === 'parent' && (
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card>
                    <CardContent>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        Quick Actions
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button
                          variant="outlined"
                          startIcon={<Add />}
                          fullWidth
                        >
                          Add Child Profile
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<SmartToy />}
                          fullWidth
                        >
                          Generate AI Quiz
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<TrendingUp />}
                          fullWidth
                        >
                          View Analytics
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};