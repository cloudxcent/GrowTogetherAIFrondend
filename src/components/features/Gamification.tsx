import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Avatar,
  Chip,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import {
  EmojiEvents,
  Star,
  LocalFireDepartment,
  TrendingUp,
  School,
  Psychology,
  Palette,
  Code,
  Science,
  Close,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { mockBadges } from '../../data/mockData';

interface GamificationProps {
  userId: string;
  currentLevel?: number;
  totalXP?: number;
  streak?: number;
}

export const Gamification: React.FC<GamificationProps> = ({
  userId,
  currentLevel = 5,
  totalXP = 2450,
  streak = 7,
}) => {
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [showAllBadges, setShowAllBadges] = useState(false);

  const xpToNextLevel = 500;
  const currentLevelXP = 450;
  const progressPercent = (currentLevelXP / xpToNextLevel) * 100;

  const earnedBadges = mockBadges.filter(badge => badge.earned);
  const availableBadges = mockBadges.filter(badge => !badge.earned);

  const achievements = [
    {
      id: 'daily_streak',
      title: '7-Day Learning Streak',
      description: 'Learn something new every day for a week',
      progress: 7,
      target: 7,
      reward: '50 XP + Fire Badge',
      icon: '🔥',
      completed: true,
    },
    {
      id: 'math_master',
      title: 'Math Master Challenge',
      description: 'Complete 20 math exercises with 90%+ accuracy',
      progress: 15,
      target: 20,
      reward: '100 XP + Math Wizard Badge',
      icon: '🧮',
      completed: false,
    },
    {
      id: 'creative_coder',
      title: 'Creative Coding Journey',
      description: 'Build 3 interactive projects',
      progress: 1,
      target: 3,
      reward: '150 XP + Coding Star Badge',
      icon: '💻',
      completed: false,
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Chen', xp: 3200, avatar: '👦' },
    { rank: 2, name: 'Emma Wilson', xp: 2800, avatar: '👧' },
    { rank: 3, name: 'You', xp: 2450, avatar: '🎓', isCurrentUser: true },
    { rank: 4, name: 'Lucas Brown', xp: 2100, avatar: '👦' },
    { rank: 5, name: 'Sophia Davis', xp: 1950, avatar: '👧' },
  ];

  const BadgeCard: React.FC<{ badge: any; size?: 'small' | 'medium' | 'large' }> = ({ 
    badge, 
    size = 'medium' 
  }) => {
    const sizeMap = {
      small: { width: 60, height: 60, fontSize: '1.5rem' },
      medium: { width: 80, height: 80, fontSize: '2rem' },
      large: { width: 120, height: 120, fontSize: '3rem' },
    };

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSelectedBadge(badge)}
      >
        <Box
          sx={{
            ...sizeMap[size],
            borderRadius: '50%',
            backgroundColor: badge.earned ? badge.color : 'grey.300',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            filter: badge.earned ? 'none' : 'grayscale(100%)',
            opacity: badge.earned ? 1 : 0.5,
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: `0 4px 20px ${badge.color}40`,
            },
          }}
        >
          <Typography variant="h4" sx={{ fontSize: sizeMap[size].fontSize }}>
            {badge.icon}
          </Typography>
          {badge.earned && (
            <Box
              sx={{
                position: 'absolute',
                bottom: -5,
                right: -5,
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: 'success.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: 'white', fontSize: '0.7rem' }}>✓</Typography>
            </Box>
          )}
        </Box>
      </motion.div>
    );
  };

  return (
    <Box>
      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 2,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    fontSize: '1.5rem',
                  }}
                >
                  🎓
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    Level {currentLevel} Learner
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {totalXP.toLocaleString()} Total XP
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6" fontWeight={600}>
                  {currentLevelXP}/{xpToNextLevel} XP
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  to Level {currentLevel + 1}
                </Typography>
              </Box>
            </Box>
            
            <LinearProgress
              variant="determinate"
              value={progressPercent}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'white',
                  borderRadius: 4,
                },
              }}
            />
          </CardContent>
        </Card>
      </motion.div>

      <Grid container spacing={3}>
        {/* Achievements & Badges */}
        <Grid item xs={12} md={8}>
          {/* Current Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>
                    🎯 Active Challenges
                  </Typography>
                  <Button variant="outlined" size="small">
                    View All
                  </Button>
                </Box>

                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        border: 1,
                        borderColor: achievement.completed ? 'success.main' : 'divider',
                        borderRadius: 2,
                        mb: 2,
                        backgroundColor: achievement.completed ? 'success.light' : 'background.paper',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography sx={{ fontSize: '1.5rem', mr: 2 }}>
                          {achievement.icon}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {achievement.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {achievement.description}
                          </Typography>
                        </Box>
                        {achievement.completed && (
                          <Chip
                            label="Completed!"
                            color="success"
                            size="small"
                            icon={<EmojiEvents />}
                          />
                        )}
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ flexGrow: 1, mr: 2 }}>
                          <LinearProgress
                            variant="determinate"
                            value={(achievement.progress / achievement.target) * 100}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                              },
                            }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            {achievement.progress}/{achievement.target} - {achievement.reward}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Badge Collection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight={600}>
                    🏆 Badge Collection ({earnedBadges.length}/{mockBadges.length})
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setShowAllBadges(true)}
                  >
                    View All Badges
                  </Button>
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Recently Earned
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                  {earnedBadges.slice(0, 5).map((badge) => (
                    <Box key={badge.id} sx={{ textAlign: 'center' }}>
                      <BadgeCard badge={badge} size="medium" />
                      <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                        {badge.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Next to Unlock
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {availableBadges.slice(0, 3).map((badge) => (
                    <Box key={badge.id} sx={{ textAlign: 'center' }}>
                      <BadgeCard badge={badge} size="medium" />
                      <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                        {badge.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Streak Counter */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card sx={{ mb: 3, textAlign: 'center' }}>
              <CardContent>
                <LocalFireDepartment sx={{ fontSize: 48, color: 'error.main', mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="error.main">
                  {streak}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Day Streak
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Keep learning to maintain your streak!
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  🏅 Weekly Leaderboard
                </Typography>
                <List dense>
                  {leaderboard.map((user, index) => (
                    <ListItem
                      key={user.rank}
                      sx={{
                        backgroundColor: user.isCurrentUser ? 'primary.light' : 'transparent',
                        borderRadius: 1,
                        mb: 0.5,
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: user.rank <= 3 ? 'gold' : 'grey.300',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          {user.rank}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ mr: 1 }}>{user.avatar}</Typography>
                            <Typography
                              variant="body2"
                              fontWeight={user.isCurrentUser ? 600 : 400}
                            >
                              {user.name}
                            </Typography>
                          </Box>
                        }
                        secondary={`${user.xp.toLocaleString()} XP`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Badge Detail Dialog */}
      <Dialog
        open={Boolean(selectedBadge)}
        onClose={() => setSelectedBadge(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedBadge && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">Badge Details</Typography>
                <IconButton onClick={() => setSelectedBadge(null)}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ textAlign: 'center' }}>
              <BadgeCard badge={selectedBadge} size="large" />
              <Typography variant="h5" fontWeight={600} sx={{ mt: 2, mb: 1 }}>
                {selectedBadge.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {selectedBadge.description}
              </Typography>
              {selectedBadge.earned ? (
                <Chip
                  label={`Earned on ${new Date(selectedBadge.earnedDate).toLocaleDateString()}`}
                  color="success"
                  icon={<EmojiEvents />}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Keep learning to unlock this badge!
                </Typography>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* All Badges Dialog */}
      <Dialog
        open={showAllBadges}
        onClose={() => setShowAllBadges(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">All Badges</Typography>
            <IconButton onClick={() => setShowAllBadges(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {mockBadges.map((badge) => (
              <Grid item xs={6} sm={4} md={3} key={badge.id}>
                <Box sx={{ textAlign: 'center' }}>
                  <BadgeCard badge={badge} size="medium" />
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>
                    {badge.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {badge.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};