import React from 'react';
import { Box, Typography } from '@mui/material';
import { AITutor } from '../components/features/AITutor';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const AITutorPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        AI Tutor 🤖
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Your personal AI learning companion is here to help
      </Typography>

      <AITutor
        studentName={user?.name}
        subject="Mathematics"
        difficulty="intermediate"
      />
    </Box>
  );
};