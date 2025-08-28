import React from 'react';
import { Box, Typography } from '@mui/material';
import { Gamification } from '../components/features/Gamification';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const AchievementsPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Achievements & Badges 🏆
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Track your learning progress and unlock amazing rewards
      </Typography>

      <Gamification
        userId={user?.id || 'demo'}
        currentLevel={5}
        totalXP={2450}
        streak={7}
      />
    </Box>
  );
};