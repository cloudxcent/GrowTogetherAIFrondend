import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Add,
  Edit,
  Settings,
  TrendingUp,
  School,
  Shield,
  Person,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetChildrenQuery } from '../store/api/authApi';
import { ParentalControls } from '../components/features/ParentalControls';
import { Child } from '../types';

export const ChildrenPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: children = [], isLoading } = useGetChildrenQuery(user?.id || '1');
  
  const [addChildDialog, setAddChildDialog] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [showControls, setShowControls] = useState(false);
  const [newChild, setNewChild] = useState({
    name: '',
    age: '',
    grade: '',
    learningGoals: [] as string[],
  });

  const grades = [
    'Pre-K', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade',
    '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade',
    '9th Grade', '10th Grade', '11th Grade', '12th Grade'
  ];

  const learningGoalOptions = [
    'Mathematics', 'Science', 'Reading', 'Writing', 'Art', 'Music',
    'Programming', 'History', 'Geography', 'Foreign Languages'
  ];

  const handleAddChild = () => {
    // In a real app, this would call the API
    console.log('Adding child:', newChild);
    setAddChildDialog(false);
    setNewChild({ name: '', age: '', grade: '', learningGoals: [] });
  };

  const handleParentalControlsUpdate = (childId: string, controls: any) => {
    // In a real app, this would update the child's controls via API
    console.log('Updating controls for child:', childId, controls);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography>Loading children profiles...</Typography>
      </Box>
    );
  }

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
              Children Profiles 👨‍👩‍👧‍👦
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Manage your children's learning profiles and safety settings
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setAddChildDialog(true)}
            size="large"
          >
            Add Child
          </Button>
        </Box>
      </motion.div>

      {/* Children Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {children.map((child, index) => (
          <Grid item xs={12} sm={6} md={4} key={child.id}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  '&:hover': {
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Child Avatar and Basic Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      src={child.avatar}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    >
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {child.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {child.age} years old • {child.grade}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Learning Goals */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Learning Goals
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {child.learningGoals.slice(0, 3).map((goal) => (
                        <Chip
                          key={goal}
                          label={goal}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                      {child.learningGoals.length > 3 && (
                        <Chip
                          label={`+${child.learningGoals.length - 3} more`}
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  </Box>

                  {/* Quick Stats */}
                  <Box sx={{ mb: 3 }}>
                    <List dense>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <School sx={{ fontSize: 20, color: 'primary.main' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Courses Completed"
                          secondary="3 this month"
                          primaryTypographyProps={{ variant: 'body2' }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <TrendingUp sx={{ fontSize: 20, color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Learning Streak"
                          secondary="5 days"
                          primaryTypographyProps={{ variant: 'body2' }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Shield sx={{ fontSize: 20, color: child.restrictions.safeMode ? 'success.main' : 'warning.main' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Safe Mode"
                          secondary={child.restrictions.safeMode ? 'Active' : 'Inactive'}
                          primaryTypographyProps={{ variant: 'body2' }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                    </List>
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<TrendingUp />}
                      fullWidth
                    >
                      View Progress
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Settings />}
                      onClick={() => {
                        setSelectedChild(child);
                        setShowControls(true);
                      }}
                      fullWidth
                    >
                      Controls
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Add Child Dialog */}
      <Dialog
        open={addChildDialog}
        onClose={() => setAddChildDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Child Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Child's Name"
              value={newChild.name}
              onChange={(e) => setNewChild(prev => ({ ...prev, name: e.target.value }))}
              fullWidth
            />
            
            <TextField
              label="Age"
              type="number"
              value={newChild.age}
              onChange={(e) => setNewChild(prev => ({ ...prev, age: e.target.value }))}
              inputProps={{ min: 3, max: 18 }}
            />

            <FormControl fullWidth>
              <InputLabel>Grade Level</InputLabel>
              <Select
                value={newChild.grade}
                onChange={(e) => setNewChild(prev => ({ ...prev, grade: e.target.value }))}
                label="Grade Level"
              >
                {grades.map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Learning Goals (Select up to 5)
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {learningGoalOptions.map((goal) => (
                  <Chip
                    key={goal}
                    label={goal}
                    onClick={() => {
                      const isSelected = newChild.learningGoals.includes(goal);
                      if (isSelected) {
                        setNewChild(prev => ({
                          ...prev,
                          learningGoals: prev.learningGoals.filter(g => g !== goal)
                        }));
                      } else if (newChild.learningGoals.length < 5) {
                        setNewChild(prev => ({
                          ...prev,
                          learningGoals: [...prev.learningGoals, goal]
                        }));
                      }
                    }}
                    color={newChild.learningGoals.includes(goal) ? 'primary' : 'default'}
                    variant={newChild.learningGoals.includes(goal) ? 'filled' : 'outlined'}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddChildDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAddChild}
            variant="contained"
            disabled={!newChild.name || !newChild.age || !newChild.grade}
          >
            Add Child
          </Button>
        </DialogActions>
      </Dialog>

      {/* Parental Controls Dialog */}
      <Dialog
        open={showControls}
        onClose={() => setShowControls(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          {selectedChild && (
            <ParentalControls
              childId={selectedChild.id}
              childName={selectedChild.name}
              controls={selectedChild.restrictions}
              onUpdate={(controls) => handleParentalControlsUpdate(selectedChild.id, controls)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};