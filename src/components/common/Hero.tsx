import React from 'react';
import { Box, Typography, useTheme, Container } from '@mui/material';
import { motion } from 'framer-motion';

interface HeroProps {
  headline?: string;
  subheadline?: string;
}

export const Hero: React.FC<HeroProps> = ({
  headline = 'Where AI Meets Learning Magic ✨',
  subheadline = 'Personalized, safe, and engaging education powered by cutting-edge AI. Help your child discover their potential and love for learning.',
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: 'white',
        py: { xs: 2, md: 4 }, // Reduced vertical padding
        textAlign: 'center',
        position: 'relative',
        mb: 2, // Reduced margin bottom
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Box
            sx={{
              width: 60, // Reduced logo size
              height: 60,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              mx: 'auto',
              mb: 1.5, // Reduced margin bottom
              boxShadow: '0 2px 12px rgba(0,0,0,0.10)'
            }}
          >
            <span role="img" aria-label="logo">🤖</span>
          </Box>
          <Typography
            variant="h4" // Smaller headline
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.2rem', md: '1.8rem', lg: '2.2rem' },
              lineHeight: 1.1,
              mb: 1,
            }}
          >
            {headline}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.92, fontWeight: 300, mb: 1 }}>
            {subheadline}
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};
