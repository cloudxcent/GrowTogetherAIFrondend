import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  LinearProgress,
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
  Avatar,
  Fab,
} from '@mui/material';
import {
  Add,
  Assignment,
  PlayArrow,
  CheckCircle,
  Schedule,
  Warning,
  SmartToy,
  Edit,
  Delete,
  FilterList,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useGetTasksQuery } from '../store/api/coursesApi';
import { QuizGenerator } from '../components/features/QuizGenerator';

export const TasksPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const userId = user?.role === 'parent' ? 'child1' : user?.id || 'child1';
  
  const { data: tasks = [], isLoading } = useGetTasksQuery(userId);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showQuizGenerator, setShowQuizGenerator] = useState(false);
  const [addTaskDialog, setAddTaskDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: 'assignment',
    dueDate: '',
  });

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

  const filteredTasks = tasks.filter(task => 
    filterStatus === 'all' || task.status === filterStatus
  );

  const TaskCard: React.FC<{ task: any; index: number }> = ({ task, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card
        sx={{
          height: '100%',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          },
          transition: 'all 0.3s ease',
        }}
        onClick={() => setSelectedTask(task)}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Chip
              icon={getStatusIcon(task.status)}
              label={task.status.replace('-', ' ').toUpperCase()}
              color={getStatusColor(task.status)}
              size="small"
            />
            {task.aiGenerated && (
              <Chip
                icon={<SmartToy />}
                label="AI Generated"
                size="small"
                color="secondary"
                variant="outlined"
              />
            )}
          </Box>

          <Typography variant="h6" fontWeight={600} gutterBottom>
            {task.title}
          </Typography>
          
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            {task.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Schedule sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </Typography>
          </Box>

          {task.status === 'in-progress' && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Progress</Typography>
                <Typography variant="body2">{task.progress}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={task.progress}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<PlayArrow />}
              fullWidth
            >
              {task.status === 'completed' ? 'Review' : 'Continue'}
            </Button>
            <IconButton size="small">
              <Edit />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Typography>Loading tasks...</Typography>
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
              Tasks & Assignments 📝
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Manage your learning tasks and track progress
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<SmartToy />}
              onClick={() => setShowQuizGenerator(true)}
            >
              AI Quiz
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setAddTaskDialog(true)}
            >
              Add Task
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card sx={{ mb: 4, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FilterList />
            <Typography variant="subtitle2">Filter by status:</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['all', 'pending', 'in-progress', 'completed', 'overdue'].map((status) => (
                <Chip
                  key={status}
                  label={status === 'all' ? 'All' : status.replace('-', ' ')}
                  onClick={() => setFilterStatus(status)}
                  color={filterStatus === status ? 'primary' : 'default'}
                  variant={filterStatus === status ? 'filled' : 'outlined'}
                  sx={{ cursor: 'pointer', textTransform: 'capitalize' }}
                />
              ))}
            </Box>
          </Box>
        </Card>
      </motion.div>

      {/* Tasks Grid */}
      <Grid container spacing={3}>
        {filteredTasks.map((task, index) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskCard task={task} index={index} />
          </Grid>
        ))}
      </Grid>

      {filteredTasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Assignment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No tasks found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {filterStatus === 'all' 
                ? "You don't have any tasks yet. Create your first task to get started!"
                : `No tasks with status "${filterStatus.replace('-', ' ')}" found.`
              }
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setAddTaskDialog(true)}
            >
              Create First Task
            </Button>
          </Box>
        </motion.div>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        onClick={() => setShowQuizGenerator(true)}
      >
        <SmartToy />
      </Fab>

      {/* Add Task Dialog */}
      <Dialog
        open={addTaskDialog}
        onClose={() => setAddTaskDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
              fullWidth
            />
            
            <TextField
              label="Description"
              value={newTask.description}
              onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
              multiline
              rows={3}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Task Type</InputLabel>
              <Select
                value={newTask.type}
                onChange={(e) => setNewTask(prev => ({ ...prev, type: e.target.value }))}
                label="Task Type"
              >
                <MenuItem value="assignment">Assignment</MenuItem>
                <MenuItem value="quiz">Quiz</MenuItem>
                <MenuItem value="project">Project</MenuItem>
                <MenuItem value="reading">Reading</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Due Date"
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddTaskDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              // In a real app, this would create the task via API
              console.log('Creating task:', newTask);
              setAddTaskDialog(false);
              setNewTask({ title: '', description: '', type: 'assignment', dueDate: '' });
            }}
            variant="contained"
            disabled={!newTask.title || !newTask.dueDate}
          >
            Create Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quiz Generator Dialog */}
      <Dialog
        open={showQuizGenerator}
        onClose={() => setShowQuizGenerator(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <QuizGenerator
            subject="Mathematics"
            onQuizComplete={(score, total) => {
              console.log(`Quiz completed: ${score}/${total}`);
              // In a real app, this would save the quiz result
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Task Detail Dialog */}
      <Dialog
        open={Boolean(selectedTask)}
        onClose={() => setSelectedTask(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedTask && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{selectedTask.title}</Typography>
                <Chip
                  icon={getStatusIcon(selectedTask.status)}
                  label={selectedTask.status.replace('-', ' ').toUpperCase()}
                  color={getStatusColor(selectedTask.status)}
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedTask.description}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Chip label={`Type: ${selectedTask.type}`} variant="outlined" />
                <Chip label={`Due: ${new Date(selectedTask.dueDate).toLocaleDateString()}`} variant="outlined" />
                {selectedTask.aiGenerated && (
                  <Chip icon={<SmartToy />} label="AI Generated" color="secondary" variant="outlined" />
                )}
              </Box>

              {selectedTask.status === 'in-progress' && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Progress: {selectedTask.progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={selectedTask.progress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedTask(null)}>
                Close
              </Button>
              <Button variant="contained" startIcon={<PlayArrow />}>
                {selectedTask.status === 'completed' ? 'Review' : 'Continue'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};