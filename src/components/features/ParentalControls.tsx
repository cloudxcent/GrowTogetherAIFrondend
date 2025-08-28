import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Slider,
  Chip,
  Button,
  TextField,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemSecondary,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider,
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
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ParentalControls as ParentalControlsType } from '../../types';

interface ParentalControlsProps {
  childId: string;
  childName: string;
  controls: ParentalControlsType;
  onUpdate: (controls: ParentalControlsType) => void;
}

export const ParentalControls: React.FC<ParentalControlsProps> = ({
  childId,
  childName,
  controls,
  onUpdate,
}) => {
  const [localControls, setLocalControls] = useState<ParentalControlsType>(controls);
  const [addBlockedContentDialog, setAddBlockedContentDialog] = useState(false);
  const [newBlockedContent, setNewBlockedContent] = useState('');
  const [scheduleDialog, setScheduleDialog] = useState(false);

  const categories = [
    'Educational',
    'Creative',
    'STEM',
    'Arts',
    'Music',
    'Sports',
    'Games',
    'Social',
    'Entertainment',
  ];

  const contentTypes = [
    'Violence',
    'Mature Themes',
    'Inappropriate Language',
    'Scary Content',
    'Complex Topics',
    'Social Media',
    'Chat Features',
  ];

  const handleControlChange = (key: keyof ParentalControlsType, value: any) => {
    const updated = { ...localControls, [key]: value };
    setLocalControls(updated);
    onUpdate(updated);
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategories = localControls.allowedCategories;
    const updated = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    handleControlChange('allowedCategories', updated);
  };

  const handleAddBlockedContent = () => {
    if (newBlockedContent.trim()) {
      const updated = [...localControls.blockedContent, newBlockedContent.trim()];
      handleControlChange('blockedContent', updated);
      setNewBlockedContent('');
      setAddBlockedContentDialog(false);
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

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Shield sx={{ mr: 2, color: 'primary.main' }} />
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  Parental Controls for {childName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage safety settings and content restrictions
                </Typography>
              </Box>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
              All changes are automatically saved and applied immediately to ensure your child's safety.
            </Alert>

            {/* Safe Mode */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Security sx={{ mr: 2, color: 'success.main' }} />
                  <Typography variant="h6">Safe Mode</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
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
                      <Typography variant="body1">Enable Safe Mode</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Restricts access to age-inappropriate content and enables additional safety features
                      </Typography>
                    </Box>
                  }
                />
                
                {localControls.safeMode && (
                  <Box sx={{ mt: 2, p: 2, backgroundColor: 'success.light', borderRadius: 2 }}>
                    <Typography variant="body2" color="success.dark">
                      ✅ Safe Mode Active: Enhanced content filtering, restricted chat features, and parental notifications enabled
                    </Typography>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>

            {/* Screen Time Management */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ mr: 2, color: 'warning.main' }} />
                  <Typography variant="h6">Screen Time Management</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Daily Screen Time Limit: {formatTime(localControls.screenTime)}
                  </Typography>
                  <Slider
                    value={localControls.screenTime}
                    onChange={(_, value) => handleControlChange('screenTime', value)}
                    min={30}
                    max={480}
                    step={15}
                    marks={[
                      { value: 30, label: '30m' },
                      { value: 60, label: '1h' },
                      { value: 120, label: '2h' },
                      { value: 240, label: '4h' },
                      { value: 480, label: '8h' },
                    ]}
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Recommended: 1-2 hours for elementary age, 2-3 hours for middle school
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  startIcon={<Schedule />}
                  onClick={() => setScheduleDialog(true)}
                  sx={{ mb: 2 }}
                >
                  Set Learning Schedule
                </Button>

                <Box sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Current Usage Today
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: '60%',
                        height: 8,
                        backgroundColor: 'success.light',
                        borderRadius: 1,
                        mr: 2,
                      }}
                    />
                    <Typography variant="body2">
                      45 minutes used of {formatTime(localControls.screenTime)}
                    </Typography>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Content Categories */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FilterList sx={{ mr: 2, color: 'info.main' }} />
                  <Typography variant="h6">Allowed Content Categories</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Select which types of content your child can access
                </Typography>
                <Grid container spacing={1}>
                  {categories.map((category) => (
                    <Grid item key={category}>
                      <Chip
                        label={category}
                        onClick={() => handleCategoryToggle(category)}
                        color={localControls.allowedCategories.includes(category) ? 'primary' : 'default'}
                        variant={localControls.allowedCategories.includes(category) ? 'filled' : 'outlined'}
                        sx={{ cursor: 'pointer' }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Blocked Content */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Block sx={{ mr: 2, color: 'error.main' }} />
                  <Typography variant="h6">Blocked Content & Keywords</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Content types and keywords that will be automatically blocked
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Add />}
                    onClick={() => setAddBlockedContentDialog(true)}
                  >
                    Add Block
                  </Button>
                </Box>

                <List>
                  {localControls.blockedContent.map((content, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 1,
                      }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={() => handleRemoveBlockedContent(content)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={content}
                        secondary={contentTypes.includes(content) ? 'Content Type' : 'Custom Keyword'}
                      />
                    </ListItem>
                  ))}
                </List>

                {localControls.blockedContent.length === 0 && (
                  <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 2 }}>
                    No blocked content configured. Click "Add Block" to add restrictions.
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>

            {/* Monitoring & Reports */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Visibility sx={{ mr: 2, color: 'secondary.main' }} />
                  <Typography variant="h6">Monitoring & Reports</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Weekly Progress Reports"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Activity Notifications"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={<Switch />}
                      label="Screenshot Monitoring"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="AI Content Analysis"
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Report Delivery
                </Typography>
                <TextField
                  fullWidth
                  label="Email for Reports"
                  defaultValue="parent@example.com"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Button variant="outlined" size="small">
                  Send Test Report
                </Button>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Blocked Content Dialog */}
      <Dialog
        open={addBlockedContentDialog}
        onClose={() => setAddBlockedContentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Blocked Content</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add content types or specific keywords to block
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom>
            Quick Add - Content Types
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {contentTypes
              .filter(type => !localControls.blockedContent.includes(type))
              .map((type) => (
                <Chip
                  key={type}
                  label={type}
                  onClick={() => {
                    handleControlChange('blockedContent', [...localControls.blockedContent, type]);
                    setAddBlockedContentDialog(false);
                  }}
                  variant="outlined"
                  sx={{ cursor: 'pointer' }}
                />
              ))}
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            Custom Keyword
          </Typography>
          <TextField
            fullWidth
            label="Enter keyword or phrase"
            value={newBlockedContent}
            onChange={(e) => setNewBlockedContent(e.target.value)}
            placeholder="e.g., specific topic, website, or term"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddBlockedContentDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAddBlockedContent}
            variant="contained"
            disabled={!newBlockedContent.trim()}
          >
            Add Block
          </Button>
        </DialogActions>
      </Dialog>

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
            Set specific times when learning is allowed
          </Typography>
          
          {/* This would contain a more complex schedule interface */}
          <Alert severity="info">
            Advanced scheduling features coming soon! For now, screen time limits apply throughout the day.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScheduleDialog(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};