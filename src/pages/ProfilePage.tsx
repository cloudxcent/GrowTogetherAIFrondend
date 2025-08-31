import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Grid,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Badge,
  Tab,
  Tabs,
  Paper,
} from '@mui/material';
import {
  Edit,
  Camera,
  Share,
  Download,
  Print,
  Bookmark,
  Favorite,
  Person,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetUserAnalyticsQuery } from '../store/api/analyticsApi';
import { useGetChildrenQuery } from '../store/api/authApi';
import { mockBadges } from '../data/mockData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

export const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: analytics } = useGetUserAnalyticsQuery(user?.id || 'demo');
  const { data: children = [] } = useGetChildrenQuery(user?.id || '1');

  const [tabValue, setTabValue] = useState(0);
  const [editDialog, setEditDialog] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    bio: 'Passionate about AI-powered education and helping children reach their full potential.',
    location: 'San Francisco, CA',
    interests: ['Mathematics', 'Science', 'Programming', 'Art'],
  });

  const earnedBadges = mockBadges.filter(badge => badge.earned);
  const totalBadges = mockBadges.length;

  const achievements = [
    { title: 'Learning Streak Master', description: '30-day learning streak', date: '2025-01-20', icon: '🔥' },
    { title: 'Course Completion Champion', description: 'Completed 10 courses', date: '2025-01-15', icon: '🎓' },
    { title: 'AI Tutor Expert', description: '100+ AI interactions', date: '2025-01-10', icon: '🤖' },
    { title: 'Quiz Master', description: '50 quizzes completed', date: '2025-01-05', icon: '📝' },
  ];

  const learningStats = [
    { label: 'Total Learning Hours', value: analytics?.totalHours || 125, unit: 'hours' },
    { label: 'Courses Completed', value: analytics?.coursesCompleted || 8, unit: 'courses' },
    { label: 'Current Streak', value: analytics?.currentStreak || 15, unit: 'days' },
    { label: 'Badges Earned', value: earnedBadges.length, unit: 'badges' },
  ];

  const handleSaveProfile = () => {
    // In a real app, this would update the profile via API
    console.log('Saving profile:', profileData);
    setEditDialog(false);
  };

  const handleAvatarUpload = () => {
    // In a real app, this would handle avatar upload
    console.log('Avatar upload triggered');
  };

  return (
    <Box>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ mb: 4 }}>
          <Box sx={{ width: '100%' }}>
            <Typography variant="h4" fontWeight={700} gutterBottom sx={{ width: '100%' }}>
              Profile 👤
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ width: '100%' }}>
              Manage your profile and view your learning journey
            </Typography>
          </Box>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {/* Profile Header */}
            
  <Grid item xs={12} sx={{ width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                mb: 3,
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <IconButton
                          size="small"
                          onClick={handleAvatarUpload}
                          sx={{
                            backgroundColor: 'white',
                            color: 'primary.main',
                            width: 32,
                            height: 32,
                            '&:hover': { backgroundColor: 'grey.100' },
                          }}
                        >
                          <Camera sx={{ fontSize: 16 }} />
                        </IconButton>
                      }
                    >
                      <Avatar
                        src={user?.avatar}
                        sx={{ width: 120, height: 120, mr: 3 }}
                      >
                        <Person sx={{ fontSize: 60 }} />
                      </Avatar>
                    </Badge>
                    <Box>
                      <Typography variant="h4" fontWeight={700} gutterBottom>
                        {user?.name}
                      </Typography>
                      <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                        {profileData.bio}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip
                          label={user?.role?.toUpperCase()}
                          sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                        />
                        <Chip
                          label={`Level ${Math.floor((analytics?.totalHours || 0) / 10) + 1}`}
                          sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                        />
                        <Chip
                          label="Premium Member"
                          sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        📍 {profileData.location} • 🌐 {profileData.interests.join(', ')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={() => setEditDialog(true)}
                      sx={{
                        backgroundColor: 'white',
                        color: 'primary.main',
                        '&:hover': { backgroundColor: 'grey.100' },
                      }}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Share />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                      }}
                    >
                      Share
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        {/* Learning Statistics */}
  <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Grid container spacing={3} sx={{ mb: 3 }}>
              {learningStats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={stat.label}>
                  <Card sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h3" color="primary" fontWeight={700}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.unit}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {stat.label}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Grid>

        {/* Profile Tabs */}
  <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Paper sx={{ mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={(_, newValue) => setTabValue(newValue)}
                variant="fullWidth"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
              >
                <Tab label="🏆 Achievements" />
                <Tab label="📊 Progress" />
                <Tab label="👨‍👩‍👧‍👦 Family" />
                <Tab label="📚 Favorites" />
              </Tabs>

              {/* Achievements Tab */}
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Recent Achievements
                    </Typography>
                    <List>
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <ListItem
                            sx={{
                              border: 1,
                              borderColor: 'divider',
                              borderRadius: 2,
                              mb: 1,
                            }}
                          >
                            <ListItemIcon>
                              <Box
                                sx={{
                                  fontSize: '2rem',
                                  width: 48,
                                  height: 48,
                                  borderRadius: '50%',
                                  backgroundColor: 'primary.light',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                {achievement.icon}
                              </Box>
                            </ListItemIcon>
                            <ListItemText
                              primary={achievement.title}
                              secondary={
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    {achievement.description}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    Earned on {achievement.date}
                                  </Typography>
                                </Box>
                              }
                            />
                          </ListItem>
                        </motion.div>
                      ))}
                    </List>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Badge Collection ({earnedBadges.length}/{totalBadges})
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {mockBadges.map((badge) => (
                        <motion.div
                          key={badge.id}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Box
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: '50%',
                              backgroundColor: badge.earned ? badge.color : 'grey.300',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              filter: badge.earned ? 'none' : 'grayscale(100%)',
                              opacity: badge.earned ? 1 : 0.5,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                boxShadow: badge.earned ? `0 4px 20px ${badge.color}40` : 'none',
                              },
                            }}
                          >
                            <Typography variant="h4">
                              {badge.icon}
                            </Typography>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Progress Tab */}
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Learning Progress
                    </Typography>
                    {analytics?.subjectProgress?.map((subject, index) => (
                      <Box key={subject.subject} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" fontWeight={500}>
                            {subject.subject}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {subject.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={subject.progress}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Learning Goals
                    </Typography>
                    <List>
                      {[
                        { goal: 'Master Multiplication Tables', progress: 85, target: 100 },
                        { goal: 'Complete Python Course', progress: 60, target: 100 },
                        { goal: 'Read 20 Books', progress: 12, target: 20 },
                        { goal: 'Science Project', progress: 40, target: 100 },
                      ].map((goal, index) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemText
                            primary={goal.goal}
                            secondary={
                              <Box sx={{ mt: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={(goal.progress / goal.target) * 100}
                                  sx={{ height: 6, borderRadius: 3 }}
                                />
                                <Typography variant="caption" color="text.secondary">
                                  {goal.progress}/{goal.target}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Family Tab */}
              <TabPanel value={tabValue} index={2}>
                {user?.role === 'parent' ? (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        Children Profiles
                      </Typography>
                    </Grid>
                    {children.map((child, index) => (
                      <Grid item xs={12} sm={6} md={4} key={child.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card>
                            <CardContent sx={{ textAlign: 'center' }}>
                              <Avatar
                                src={child.avatar}
                                sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                              >
                                <Person />
                              </Avatar>
                              <Typography variant="h6" fontWeight={600}>
                                {child.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                {child.age} years old • {child.grade}
                              </Typography>
                              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 2 }}>
                                {child.learningGoals.slice(0, 2).map((goal) => (
                                  <Chip key={goal} label={goal} size="small" variant="outlined" />
                                ))}
                              </Box>
                              <Button variant="outlined" size="small" fullWidth>
                                View Progress
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Person sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      Family information is managed by your parent account
                    </Typography>
                  </Box>
                )}
              </TabPanel>

              {/* Favorites Tab */}
              <TabPanel value={tabValue} index={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Favorite Courses
                    </Typography>
                    <List>
                      {[
                        { title: 'AI Adventures in Math', category: 'Mathematics', progress: 85 },
                        { title: 'Creative Coding for Kids', category: 'Programming', progress: 60 },
                        { title: 'Science Lab Experiments', category: 'Science', progress: 40 },
                      ].map((course, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 2,
                            mb: 1,
                          }}
                        >
                          <ListItemIcon>
                            <Bookmark color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={course.title}
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  {course.category}
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={course.progress}
                                  sx={{ mt: 1, height: 4, borderRadius: 2 }}
                                />
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Favorite Topics
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {profileData.interests.map((interest) => (
                        <Chip
                          key={interest}
                          label={interest}
                          color="primary"
                          variant="outlined"
                          icon={<Favorite />}
                        />
                      ))}
                    </Box>

                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Quick Actions
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button variant="outlined" startIcon={<Download />} fullWidth>
                        Download Learning Report
                      </Button>
                      <Button variant="outlined" startIcon={<Print />} fullWidth>
                        Print Certificate
                      </Button>
                      <Button variant="outlined" startIcon={<Share />} fullWidth>
                        Share Achievements
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog
        open={editDialog}
        onClose={() => setEditDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Full Name"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Bio"
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Location"
              value={profileData.location}
              onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
              fullWidth
            />
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Interests
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {['Mathematics', 'Science', 'Programming', 'Art', 'Music', 'History', 'Geography'].map((interest) => (
                  <Chip
                    key={interest}
                    label={interest}
                    onClick={() => {
                      const isSelected = profileData.interests.includes(interest);
                      if (isSelected) {
                        setProfileData(prev => ({
                          ...prev,
                          interests: prev.interests.filter(i => i !== interest)
                        }));
                      } else {
                        setProfileData(prev => ({
                          ...prev,
                          interests: [...prev.interests, interest]
                        }));
                      }
                    }}
                    color={profileData.interests.includes(interest) ? 'primary' : 'default'}
                    variant={profileData.interests.includes(interest) ? 'filled' : 'outlined'}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveProfile} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};