import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  School,
  Psychology,
  AccessTime,
  EmojiEvents,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetUserAnalyticsQuery, useGetParentAnalyticsQuery } from '../store/api/analyticsApi';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export const AnalyticsPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedChild, setSelectedChild] = useState('all');

  // Mock user ID for demo
  const userId = user?.role === 'parent' ? 'child1' : user?.id || 'child1';
  
  const { data: analytics } = useGetUserAnalyticsQuery(userId);
  const { data: parentAnalytics = [] } = useGetParentAnalyticsQuery(
    user?.role === 'parent' ? user.id : ''
  );

  // Mock additional analytics data
  const learningPatterns = [
    { time: '6 AM', focus: 20, engagement: 15 },
    { time: '8 AM', focus: 45, engagement: 40 },
    { time: '10 AM', focus: 80, engagement: 85 },
    { time: '12 PM', focus: 60, engagement: 55 },
    { time: '2 PM', focus: 70, engagement: 75 },
    { time: '4 PM', focus: 90, engagement: 95 },
    { time: '6 PM', focus: 65, engagement: 60 },
    { time: '8 PM', focus: 40, engagement: 35 },
  ];

  const aiInsights = [
    {
      type: 'strength',
      icon: <CheckCircle color="success" />,
      title: 'Strong Visual Learning',
      description: 'Emma excels with visual content and diagrams. Consider more image-based lessons.',
      confidence: 92,
    },
    {
      type: 'opportunity',
      icon: <TrendingUp color="primary" />,
      title: 'Math Improvement Opportunity',
      description: 'Focus on multiplication tables. AI suggests 15 minutes daily practice.',
      confidence: 87,
    },
    {
      type: 'warning',
      icon: <Warning color="warning" />,
      title: 'Attention Span Pattern',
      description: 'Concentration drops after 25 minutes. Consider shorter learning sessions.',
      confidence: 78,
    },
    {
      type: 'recommendation',
      icon: <Psychology color="secondary" />,
      title: 'Optimal Learning Time',
      description: 'Peak performance between 4-6 PM. Schedule challenging topics during this time.',
      confidence: 85,
    },
  ];

  const StatCard: React.FC<{
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, change, trend, icon, color }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="text.secondary" gutterBottom variant="body2">
                {title}
              </Typography>
              <Typography variant="h4" component="div" fontWeight={700}>
                {value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                {trend === 'up' ? (
                  <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
                )}
                <Typography
                  variant="body2"
                  color={trend === 'up' ? 'success.main' : 'error.main'}
                >
                  {change}
                </Typography>
              </Box>
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

  return (
    <Box>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Learning Analytics 📊
            </Typography>
            <Typography variant="h6" color="text.secondary">
              AI-powered insights into learning patterns and progress
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Period</InputLabel>
              <Select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                label="Period"
              >
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="quarter">This Quarter</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>
            </FormControl>
            {user?.role === 'parent' && (
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Child</InputLabel>
                <Select
                  value={selectedChild}
                  onChange={(e) => setSelectedChild(e.target.value)}
                  label="Child"
                >
                  <MenuItem value="all">All Children</MenuItem>
                  <MenuItem value="child1">Emma</MenuItem>
                  <MenuItem value="child2">Lucas</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        </Box>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Learning Hours"
            value={analytics?.totalHours.toString() || '45.5'}
            change="+12% from last week"
            trend="up"
            icon={<AccessTime />}
            color="#2563eb"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Courses Completed"
            value={analytics?.coursesCompleted.toString() || '8'}
            change="+2 this week"
            trend="up"
            icon={<School />}
            color="#10b981"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Current Streak"
            value={`${analytics?.currentStreak || 12} days`}
            change="Personal best!"
            trend="up"
            icon={<EmojiEvents />}
            color="#f59e0b"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="AI Accuracy Score"
            value="94%"
            change="+3% improvement"
            trend="up"
            icon={<Psychology />}
            color="#8b5cf6"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Learning Progress Chart */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  📈 Weekly Learning Progress
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analytics?.weeklyProgress || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="hours"
                      stroke="#2563eb"
                      fill="#2563eb"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Subject Progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  📚 Subject Progress
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics?.subjectProgress || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="progress" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Learning Patterns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  🧠 Daily Focus & Engagement Patterns
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={learningPatterns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="focus"
                      stroke="#2563eb"
                      strokeWidth={2}
                      name="Focus Level"
                    />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Engagement"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  🤖 AI Learning Insights
                </Typography>
                <List>
                  {aiInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                        <ListItemIcon sx={{ mt: 0.5 }}>
                          {insight.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={insight.title}
                          secondary={
                            <Box>
                              <Typography variant="body2" sx={{ mb: 1 }}>
                                {insight.description}
                              </Typography>
                              <Chip
                                label={`${insight.confidence}% confidence`}
                                size="small"
                                variant="outlined"
                                color="primary"
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < aiInsights.length - 1 && <Divider />}
                    </motion.div>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>

          {/* Strengths & Weaknesses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  💪 Strengths & Areas for Growth
                </Typography>
                
                <Typography variant="subtitle2" color="success.main" gutterBottom>
                  Strong Areas
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {analytics?.strongAreas.map((area) => (
                    <Chip
                      key={area}
                      label={area}
                      size="small"
                      color="success"
                      variant="outlined"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>

                <Typography variant="subtitle2" color="warning.main" gutterBottom>
                  Growth Opportunities
                </Typography>
                <Box>
                  {analytics?.weakAreas.map((area) => (
                    <Chip
                      key={area}
                      label={area}
                      size="small"
                      color="warning"
                      variant="outlined"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Learning Goals Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  🎯 Learning Goals Progress
                </Typography>
                
                {[
                  { goal: 'Master Multiplication Tables', progress: 85, target: 100 },
                  { goal: 'Read 10 Books This Month', progress: 7, target: 10 },
                  { goal: 'Complete Coding Course', progress: 60, target: 100 },
                ].map((goal, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {goal.goal}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {goal.progress}/{goal.target}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(goal.progress / goal.target) * 100}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};