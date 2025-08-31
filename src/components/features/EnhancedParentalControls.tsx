import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Slider,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondary,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TimePicker,
  Divider,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  ExpandMore,
  Shield,
  AccessTime,
  Block,
  Visibility,
  Add,
  Delete,
  Security,
  Schedule,
  FilterList,
  Warning,
  CheckCircle,
  Person,
  Tv,
  Smartphone,
  Computer,
  Tablet,
} from '@mui/icons-material';
import { LocalizationProvider, TimePicker as MUITimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { ParentalControls as ParentalControlsType } from '../../types';

interface EnhancedParentalControlsProps {
  childId: string;
  childName: string;
  controls: ParentalControlsType;
  onUpdate: (controls: ParentalControlsType) => void;
}

export const EnhancedParentalControls: React.FC<EnhancedParentalControlsProps> = ({
  childId,
  childName,
  controls,
  onUpdate,
}) => {
  const [localControls, setLocalControls] = useState<ParentalControlsType>(controls);
  const [scheduleDialog, setScheduleDialog] = useState(false);
  const [addBlockDialog, setAddBlockDialog] = useState(false);
  const [newBlockedItem, setNewBlockedItem] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('all');

  const [schedule, setSchedule] = useState({
    monday: { start: dayjs().hour(9).minute(0), end: dayjs().hour(17).minute(0), enabled: true },
    tuesday: { start: dayjs().hour(9).minute(0), end: dayjs().hour(17).minute(0), enabled: true },
    wednesday: { start: dayjs().hour(9).minute(0), end: dayjs().hour(17).minute(0), enabled: true },
    thursday: { start: dayjs().hour(9).minute(0), end: dayjs().hour(17).minute(0), enabled: true },
    friday: { start: dayjs().hour(9).minute(0), end: dayjs().hour(17).minute(0), enabled: true },
    saturday: { start: dayjs().hour(10).minute(0), end: dayjs().hour(16).minute(0), enabled: true },
    sunday: { start: dayjs().hour(10).minute(0), end: dayjs().hour(16).minute(0), enabled: false },
  });

  const devices = [
    { id: 'all', name: 'All Devices', icon: <Computer />, status: 'active' },
    { id: 'tablet', name: 'iPad', icon: <Tablet />, status: 'active' },
    { id: 'phone', name: 'iPhone', icon: <Smartphone />, status: 'restricted' },
    { id: 'tv', name: 'Smart TV', icon: <Tv />, status: 'active' },
  ];

  const contentCategories = [
    { name: 'Educational', allowed: true, description: 'Learning content and courses' },
    { name: 'Creative', allowed: true, description: 'Art, music, and creative projects' },
    { name: 'STEM', allowed: true, description: 'Science, technology, engineering, math' },
    { name: 'Games', allowed: false, description: 'Educational games and activities' },
    { name: 'Social', allowed: false, description: 'Social features and chat' },
    { name: 'Entertainment', allowed: false, description: 'Non-educational entertainment' },
  ];

  const handleControlChange = (key: keyof ParentalControlsType, value: any) => {
    const updated = { ...localControls, [key]: value };
    setLocalControls(updated);
    onUpdate(updated);
  };

  const handleAddBlockedContent = () => {
    if (newBlockedItem.trim()) {
      const updated = [...localControls.blockedContent, newBlockedItem.trim()];
      handleControlChange('blockedContent', updated);
      setNewBlockedItem('');
      setAddBlockDialog(false);
    }
  };

  const handleRemoveBlockedContent = (content: string) => {
    const updated = localControls.blockedContent.filter(c => c !== content);
    handleControlChange('blockedContent', updated);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getDeviceStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'restricted': return 'warning';
      case 'blocked': return 'error';
      default: return 'default';
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ width: 60, height: 60, mr: 2, backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>
                      Parental Controls for {childName}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Comprehensive safety and learning management
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h6" fontWeight={600}>
                    {localControls.safeMode ? '🛡️ Protected' : '⚠️ Basic'}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Safety Level
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Safe Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Shield sx={{ mr: 2, color: 'success.main' }} />
                    <Typography variant="h6">Safe Mode & Security</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Alert severity={localControls.safeMode ? 'success' : 'warning'} sx={{ mb: 3 }}>
                    {localControls.safeMode 
                      ? '🛡️ Safe Mode is active. Your child is protected with enhanced security features.'
                      : '⚠️ Safe Mode is disabled. Consider enabling it for younger children.'
                    }
                  </Alert>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={localControls.safeMode}
                        onChange={(e) => handleControlChange('safeMode', e.target.checked)}
                        color="success"
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight={600}>Enable Safe Mode</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Activates enhanced content filtering, disables chat features, and enables real-time monitoring
                        </Typography>
                      </Box>
                    }
                  />

                  {localControls.safeMode && (
                    <Box sx={{ mt: 3, p: 2, backgroundColor: 'success.light', borderRadius: 2 }}>
                      <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Active Safety Features:
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                          <ListItemText primary="AI Content Filtering" secondary="Real-time content analysis" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                          <ListItemText primary="Chat Restrictions" secondary="No direct messaging with strangers" />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                          <ListItemText primary="Activity Monitoring" secondary="Real-time activity tracking" />
                        </ListItem>
                      </List>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            </motion.div>

            {/* Screen Time Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ mr: 2, color: 'warning.main' }} />
                    <Typography variant="h6">Screen Time & Schedule</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Daily Screen Time Limit
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h4" color="primary" fontWeight={700}>
                          {formatTime(localControls.screenTime)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          per day
                        </Typography>
                      </Box>
                      <Slider
                        value={localControls.screenTime}
                        onChange={(_, value) => handleControlChange('screenTime', value)}
                        min={30}
                        max={480}
                        step={15}
                        marks={[
                          { value: 30, label: '30m' },
                          { value: 120, label: '2h' },
                          { value: 240, label: '4h' },
                          { value: 480, label: '8h' },
                        ]}
                        sx={{ mb: 2 }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Today's Usage
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={60}
                          sx={{ height: 12, borderRadius: 6, mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          72 minutes used of {formatTime(localControls.screenTime)}
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        startIcon={<Schedule />}
                        onClick={() => setScheduleDialog(true)}
                        fullWidth
                      >
                        Set Learning Schedule
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </motion.div>

            {/* Content Filtering */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FilterList sx={{ mr: 2, color: 'info.main' }} />
                    <Typography variant="h6">Content Filtering</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle2" gutterBottom>
                    Content Categories
                  </Typography>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {contentCategories.map((category) => (
                      <Grid item xs={12} sm={6} key={category.name}>
                        <Box
                          sx={{
                            p: 2,
                            border: 1,
                            borderColor: category.allowed ? 'success.main' : 'error.main',
                            borderRadius: 2,
                            backgroundColor: category.allowed ? 'success.light' : 'error.light',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {category.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {category.description}
                              </Typography>
                            </Box>
                            <Switch
                              checked={category.allowed}
                              onChange={() => {}}
                              color={category.allowed ? 'success' : 'error'}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle2">
                      Blocked Keywords & Content
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Add />}
                      onClick={() => setAddBlockDialog(true)}
                    >
                      Add Block
                    </Button>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {localControls.blockedContent.map((content, index) => (
                      <Chip
                        key={index}
                        label={content}
                        onDelete={() => handleRemoveBlockedContent(content)}
                        color="error"
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </motion.div>

            {/* Device Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Computer sx={{ mr: 2, color: 'secondary.main' }} />
                    <Typography variant="h6">Device Management</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {devices.map((device) => (
                      <Grid item xs={12} sm={6} key={device.id}>
                        <Card
                          variant="outlined"
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            border: selectedDevice === device.id ? 2 : 1,
                            borderColor: selectedDevice === device.id ? 'primary.main' : 'divider',
                          }}
                          onClick={() => setSelectedDevice(device.id)}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box sx={{ mr: 2, color: 'primary.main' }}>
                                {device.icon}
                              </Box>
                              <Box>
                                <Typography variant="subtitle2" fontWeight={600}>
                                  {device.name}
                                </Typography>
                                <Chip
                                  label={device.status}
                                  size="small"
                                  color={getDeviceStatusColor(device.status)}
                                  variant="outlined"
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </motion.div>

            {/* Monitoring & Reports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Visibility sx={{ mr: 2, color: 'info.main' }} />
                    <Typography variant="h6">Monitoring & Reports</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Monitoring Settings
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Real-time Activity Monitoring"
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Screenshot Alerts"
                        />
                        <FormControlLabel
                          control={<Switch />}
                          label="Keystroke Logging"
                        />
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="AI Behavior Analysis"
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Report Settings
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                          label="Report Email"
                          defaultValue="parent@example.com"
                          size="small"
                          fullWidth
                        />
                        <FormControl size="small" fullWidth>
                          <InputLabel>Report Frequency</InputLabel>
                          <Select defaultValue="weekly" label="Report Frequency">
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                          </Select>
                        </FormControl>
                        <Button variant="outlined" size="small">
                          Send Test Report
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          </Grid>

          {/* Right Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Today's Activity
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><AccessTime color="primary" /></ListItemIcon>
                      <ListItemText
                        primary="Screen Time"
                        secondary="1h 12m of 2h limit"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><School color="success" /></ListItemIcon>
                      <ListItemText
                        primary="Courses Accessed"
                        secondary="3 different courses"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Block color="error" /></ListItemIcon>
                      <ListItemText
                        primary="Blocked Attempts"
                        secondary="2 inappropriate sites"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </motion.div>

            {/* Emergency Controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Emergency Controls
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Block />}
                      fullWidth
                    >
                      Pause All Activity
                    </Button>
                    <Button
                      variant="outlined"
                      color="warning"
                      startIcon={<Warning />}
                      fullWidth
                    >
                      Lock Device
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Visibility />}
                      fullWidth
                    >
                      View Live Screen
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Alerts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Recent Alerts
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Warning color="warning" /></ListItemIcon>
                      <ListItemText
                        primary="Attempted access to blocked site"
                        secondary="2 hours ago"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText
                        primary="Completed math assignment"
                        secondary="4 hours ago"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><AccessTime color="info" /></ListItemIcon>
                      <ListItemText
                        primary="Screen time reminder sent"
                        secondary="6 hours ago"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Schedule Dialog */}
        <Dialog
          open={scheduleDialog}
          onClose={() => setScheduleDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Learning Schedule</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Set specific times when learning is allowed each day
            </Typography>
            
            {Object.entries(schedule).map(([day, times]) => (
              <Box key={day} sx={{ mb: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
                    {day}
                  </Typography>
                  <Switch
                    checked={times.enabled}
                    onChange={(e) => setSchedule(prev => ({
                      ...prev,
                      [day]: { ...times, enabled: e.target.checked }
                    }))}
                  />
                </Box>
                {times.enabled && (
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <MUITimePicker
                      label="Start Time"
                      value={times.start}
                      onChange={(newValue) => newValue && setSchedule(prev => ({
                        ...prev,
                        [day]: { ...times, start: newValue }
                      }))}
                      slotProps={{ textField: { size: 'small' } }}
                    />
                    <Typography>to</Typography>
                    <MUITimePicker
                      label="End Time"
                      value={times.end}
                      onChange={(newValue) => newValue && setSchedule(prev => ({
                        ...prev,
                        [day]: { ...times, end: newValue }
                      }))}
                      slotProps={{ textField: { size: 'small' } }}
                    />
                  </Box>
                )}
              </Box>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setScheduleDialog(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => setScheduleDialog(false)}>
              Save Schedule
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Blocked Content Dialog */}
        <Dialog
          open={addBlockDialog}
          onClose={() => setAddBlockDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add Blocked Content</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Keyword or Website"
              value={newBlockedItem}
              onChange={(e) => setNewBlockedItem(e.target.value)}
              placeholder="e.g., violence, inappropriate-site.com"
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddBlockDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddBlockedContent}
              variant="contained"
              disabled={!newBlockedItem.trim()}
            >
              Add Block
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};