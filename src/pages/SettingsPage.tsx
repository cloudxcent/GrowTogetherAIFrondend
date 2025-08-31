import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Settings,
  Person,
  Notifications,
  Security,
  Palette,
  Language,
  VolumeUp,
  Wifi,
  Storage,
  ExpandMore,
  Edit,
  Save,
  Cancel,
  Delete,
  Add,
  Shield,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/slices/themeSlice';

export const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { mode } = useSelector((state: RootState) => state.theme);
  
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    timezone: 'UTC-5',
    language: 'English',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weeklyReports: true,
    achievements: true,
    reminders: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    shareProgress: false,
    dataCollection: true,
    analytics: true,
  });
  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];
  const timezones = [
    'UTC-8 (Pacific)', 'UTC-7 (Mountain)', 'UTC-6 (Central)', 
    'UTC-5 (Eastern)', 'UTC+0 (GMT)', 'UTC+1 (CET)', 'UTC+8 (Asia)'
  ];

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile via API
    console.log('Saving profile:', profileData);
    setEditingProfile(false);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    // In a real app, this would update notification preferences via API
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    // In a real app, this would update privacy settings via API
  };

  const handleChangePassword = () => {
    // In a real app, this would change the password via API
    console.log('Changing password');
    setChangePasswordDialog(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const SettingCard: React.FC<{
    title: string;
    description: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ title, description, icon, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ mr: 2, color: 'primary.main' }}>{icon}</Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </Box>
          {children}
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
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Settings ⚙️
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Customize your GrowTogether AI experience
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Profile Settings */}
          <SettingCard
            title="Profile Information"
            description="Manage your personal information and account details"
            icon={<Person />}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                src={user?.avatar}
                sx={{ width: 80, height: 80, mr: 3 }}
              >
                <Person />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
                <Chip
                  label={user?.role?.toUpperCase()}
                  size="small"
                  color="primary"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>

            {editingProfile ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label="Phone Number"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={profileData.language}
                    onChange={(e) => setProfileData(prev => ({ ...prev, language: e.target.value }))}
                    label="Language"
                  >
                    {languages.map((lang) => (
                      <MenuItem key={lang} value={lang}>{lang}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={profileData.timezone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, timezone: e.target.value }))}
                    label="Timezone"
                  >
                    {timezones.map((tz) => (
                      <MenuItem key={tz} value={tz}>{tz}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={() => setEditingProfile(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setEditingProfile(true)}
              >
                Edit Profile
              </Button>
            )}
          </SettingCard>

          {/* Appearance Settings */}
          <SettingCard
            title="Appearance & Display"
            description="Customize the look and feel of your interface"
            icon={<Palette />}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={mode === 'dark'}
                    onChange={() => dispatch(toggleTheme())}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Dark Mode</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Switch between light and dark themes
                    </Typography>
                  </Box>
                }
              />
              
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={
                  <Box>
                    <Typography variant="body1">Animations</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enable smooth animations and transitions
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={<Switch defaultChecked />}
                label={
                  <Box>
                    <Typography variant="body1">High Contrast Mode</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Improve visibility for better accessibility
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </SettingCard>

          {/* Notification Settings */}
          <SettingCard
            title="Notifications"
            description="Control how and when you receive notifications"
            icon={<Notifications />}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.email}
                    onChange={(e) => handleNotificationChange('email', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Email Notifications</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Receive updates via email
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.push}
                    onChange={(e) => handleNotificationChange('push', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Push Notifications</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Get instant notifications in your browser
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.weeklyReports}
                    onChange={(e) => handleNotificationChange('weeklyReports', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Weekly Progress Reports</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Receive detailed learning progress summaries
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.achievements}
                    onChange={(e) => handleNotificationChange('achievements', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Achievement Notifications</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Get notified when badges and milestones are earned
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </SettingCard>

          {/* Privacy & Security */}
          <SettingCard
            title="Privacy & Security"
            description="Manage your privacy settings and account security"
            icon={<Security />}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Privacy Settings */}
              <Box>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Privacy Settings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacy.profileVisible}
                        onChange={(e) => handlePrivacyChange('profileVisible', e.target.checked)}
                      />
                    }
                    label="Make profile visible to other users"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacy.shareProgress}
                        onChange={(e) => handlePrivacyChange('shareProgress', e.target.checked)}
                      />
                    }
                    label="Share learning progress with community"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacy.dataCollection}
                        onChange={(e) => handlePrivacyChange('dataCollection', e.target.checked)}
                      />
                    }
                    label="Allow data collection for AI improvements"
                  />
                </Box>
              </Box>

              <Divider />

              {/* Security Settings */}
              <Box>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Account Security
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Lock />}
                    onClick={() => setChangePasswordDialog(true)}
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Shield />}
                  >
                    Enable Two-Factor Authentication
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Visibility />}
                  >
                    View Login History
                  </Button>
                </Box>
              </Box>

              <Divider />

              {/* Danger Zone */}
              <Box>
                <Typography variant="subtitle1" fontWeight={600} color="error" gutterBottom>
                  Danger Zone
                </Typography>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  These actions cannot be undone. Please proceed with caution.
                </Alert>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => setDeleteAccountDialog(true)}
                  >
                    Delete Account
                  </Button>
                </Box>
              </Box>
            </Box>
          </SettingCard>

          {/* AI & Learning Preferences */}
          <SettingCard
            title="AI & Learning Preferences"
            description="Customize your AI learning experience"
            icon={<Psychology />}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel>AI Tutor Personality</InputLabel>
                <Select defaultValue="friendly" label="AI Tutor Personality">
                  <MenuItem value="friendly">😊 Friendly & Encouraging</MenuItem>
                  <MenuItem value="professional">🎓 Professional & Academic</MenuItem>
                  <MenuItem value="playful">🎮 Playful & Fun</MenuItem>
                </Select>
              </FormControl>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Learning Difficulty Preference
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {['Beginner', 'Intermediate', 'Advanced', 'Adaptive'].map((level) => (
                    <Chip
                      key={level}
                      label={level}
                      onClick={() => {}}
                      color={level === 'Adaptive' ? 'primary' : 'default'}
                      variant={level === 'Adaptive' ? 'filled' : 'outlined'}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </Box>

              <FormControlLabel
                control={<Switch defaultChecked />}
                label={
                  <Box>
                    <Typography variant="body1">AI Recommendations</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Allow AI to suggest personalized learning content
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={<Switch defaultChecked />}
                label={
                  <Box>
                    <Typography variant="body1">Auto-Generate Quizzes</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Automatically create quizzes based on learning progress
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </SettingCard>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="outlined" startIcon={<Storage />} fullWidth>
                    Export My Data
                  </Button>
                  <Button variant="outlined" startIcon={<Wifi />} fullWidth>
                    Sync Settings
                  </Button>
                  <Button variant="outlined" startIcon={<Add />} fullWidth>
                    Import Settings
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Account Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Account Type"
                      secondary={user?.role === 'parent' ? 'Parent Account' : 'Student Account'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Member Since"
                      secondary="January 2025"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Subscription"
                      secondary="Premium Plan"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Data Usage"
                      secondary="2.3 GB this month"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Help & Support
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="text" fullWidth sx={{ justifyContent: 'flex-start' }}>
                    📚 Help Center
                  </Button>
                  <Button variant="text" fullWidth sx={{ justifyContent: 'flex-start' }}>
                    💬 Contact Support
                  </Button>
                  <Button variant="text" fullWidth sx={{ justifyContent: 'flex-start' }}>
                    🐛 Report a Bug
                  </Button>
                  <Button variant="text" fullWidth sx={{ justifyContent: 'flex-start' }}>
                    💡 Feature Request
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog
        open={changePasswordDialog}
        onClose={() => setChangePasswordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Current Password"
              type="password"
              value={passwordData.current}
              onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              value={passwordData.new}
              onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={passwordData.confirm}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangePasswordDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            disabled={!passwordData.current || !passwordData.new || passwordData.new !== passwordData.confirm}
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog
        open={deleteAccountDialog}
        onClose={() => setDeleteAccountDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle color="error">Delete Account</DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            This action cannot be undone. All your data, including children's profiles and learning progress, will be permanently deleted.
          </Alert>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete your account? This will:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="• Delete all children's profiles and learning data" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Cancel your subscription immediately" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Remove access to all courses and content" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Delete all achievements and progress" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAccountDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log('Account deletion requested');
              setDeleteAccountDialog(false);
            }}
            color="error"
            variant="contained"
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};