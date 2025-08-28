import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Hero } from '../components/common/Hero';
import HomePage from './HomePage';

export const WelcomePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Box>
      <Hero
        headline={`Welcome back, ${user?.name || 'User'}! 👋`}
        subheadline={user?.role === 'parent'
          ? "Here's what your children have been learning today. Use the sidebar to explore more."
          : "Ready to continue your learning journey? Use the sidebar to explore more."
        }
      />
      {/* Show some Home page content below the hero */}
      <HomePage />
    </Box>
  );
};
