import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  PlayArrow,
  Star,
  ArrowForward,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Learning',
    description: "Personalized learning paths adapted to each child's pace and style",
  },
  {
    icon: '🛡️',
    title: 'Safe Environment',
    description: 'Comprehensive parental controls and age-appropriate content',
  },
  {
    icon: '📊',
    title: 'Smart Analytics',
    description: 'Track progress and identify learning opportunities with AI insights',
  },
  {
    icon: '🎮',
    title: 'Gamified Learning',
    description: 'Engaging games, badges, and challenges that make learning fun',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Parent of 2',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    content: "My kids love the AI tutor! It's like having a personal teacher who understands exactly what they need.",
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Father of 3',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    content: 'The parental controls give me peace of mind while my children explore and learn independently.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Homeschool Mom',
    avatar: 'https://images.pexels.com/photos/1462634/pexels-photo-1462634.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    content: 'GrowTogether AI has revolutionized our homeschool experience. The analytics help me track real progress.',
    rating: 5,
  },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() && isAuthenticated) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Box className="w-full">
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          minHeight: { xs: '80vh', md: '100vh' },
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          px: { xs: 0, sm: 0 },
        }}
        className="w-full"
      >
        <Container maxWidth="lg" className="px-2 sm:px-4 md:px-8">
          <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center md:text-left"
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem', lg: '4rem' },
                    lineHeight: 1.1,
                    mb: { xs: 2, md: 3 },
                  }}
                  className="leading-tight"
                >
                  Where AI Meets
                  <br />
                  <span style={{ background: 'linear-gradient(45deg, #FFD700, #FFA500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Learning Magic ✨
                  </span>
                </Typography>
                <Typography variant="h5" sx={{ mb: { xs: 2, md: 4 }, opacity: 0.9, fontWeight: 300, fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
                  Personalized, safe, and engaging education powered by cutting-edge AI.
                  Help your child discover their potential and love for learning.
                </Typography>
                {/* AI-Powered Search Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <TextField
                    fullWidth
                    placeholder="🔍 Ask AI: Find courses, topics, or get learning suggestions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    sx={{
                      mb: { xs: 2, md: 4 },
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: 3,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        '& input': {
                          color: theme.palette.text.primary,
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleSearch} edge="end">
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' } }}>
                    <Button
                      size="large"
                      variant="contained"
                      onClick={handleGetStarted}
                      sx={{
                        backgroundColor: 'white',
                        color: theme.palette.primary.main,
                        px: { xs: 2, md: 4 },
                        py: 1.5,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        fontWeight: 600,
                        borderRadius: 2,
                        width: { xs: '100%', sm: 'auto' },
                        mb: { xs: 1, sm: 0 },
                        '&:hover': {
                          backgroundColor: alpha('#ffffff', 0.9),
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                      endIcon={<ArrowForward />}
                    >
                      {isAuthenticated ? 'Go to Dashboard' : 'Start Free Trial'}
                    </Button>
                    <Button
                      size="large"
                      variant="outlined"
                      startIcon={<PlayArrow />}
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        px: { xs: 2, md: 4 },
                        py: 1.5,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        fontWeight: 600,
                        borderRadius: 2,
                        width: { xs: '100%', sm: 'auto' },
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderColor: 'white',
                        },
                      }}
                    >
                      Watch Demo
                    </Button>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    textAlign: 'center',
                    mt: { xs: 4, md: 0 },
                  }}
                >
                  <img
                    src="https://images.pexels.com/photos/8617606/pexels-photo-8617606.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="AI Learning"
                    style={{
                      width: '100%',
                      maxWidth: 500,
                      borderRadius: 24,
                      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    }}
                    loading="lazy"
                  />
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: 'absolute',
                      top: '10%',
                      left: '-10%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      fontSize: '0.95rem',
                    }}
                  >
                    <Typography variant="body2" fontWeight={600} color="primary">
                      🤖 AI Tutor Online
                    </Typography>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: 'absolute',
                      bottom: '10%',
                      right: '-10%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      fontSize: '0.95rem',
                    }}
                  >
                    <Typography variant="body2" fontWeight={600} color="secondary">
                      🎯 98% Success Rate
                    </Typography>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Features Section */}
      <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg" className="px-2 sm:px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              textAlign="center"
              fontWeight={700}
              gutterBottom
              sx={{ mb: { xs: 3, md: 6 }, fontSize: { xs: '2rem', md: '2.5rem' } }}
            >
              Why Choose GrowTogether AI?
            </Typography>
          </motion.div>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      p: { xs: 2, md: 3 },
                      borderRadius: 3,
                      border: 1,
                      borderColor: 'divider',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: { xs: '2rem', md: '3rem' },
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}>
                      {feature.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50' }}>
        <Container maxWidth="lg" className="px-2 sm:px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              textAlign="center"
              fontWeight={700}
              gutterBottom
              sx={{ mb: { xs: 3, md: 6 }, fontSize: { xs: '2rem', md: '2.5rem' } }}
            >
              Loved by Parents & Students
            </Typography>
          </motion.div>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={testimonial.name}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      p: { xs: 2, md: 3 },
                      borderRadius: 3,
                      position: 'relative',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', mb: 2 }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} sx={{ color: '#FFD700', fontSize: { xs: '1rem', md: '1.2rem' } }} />
                        ))}
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{ mb: 3, fontStyle: 'italic', fontSize: { xs: '1rem', md: '1.1rem' } }}
                      >
                        "{testimonial.content}"
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={testimonial.avatar}
                          sx={{ width: { xs: 40, md: 48 }, height: { xs: 40, md: 48 }, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 4, md: 8 },
          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }} className="px-2 sm:px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2.2rem' } }}>
              Ready to Transform Learning?
            </Typography>
            <Typography variant="h6" sx={{ mb: { xs: 2, md: 4 }, opacity: 0.9, fontSize: { xs: '1rem', md: '1.2rem' } }}>
              Join thousands of families already using GrowTogether AI
            </Typography>
            <Button
              size="large"
              variant="contained"
              onClick={handleGetStarted}
              sx={{
                backgroundColor: 'white',
                color: theme.palette.primary.main,
                px: { xs: 3, md: 6 },
                py: { xs: 1.2, md: 2 },
                fontSize: { xs: '1rem', md: '1.2rem' },
                fontWeight: 600,
                borderRadius: 2,
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  backgroundColor: alpha('#ffffff', 0.9),
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Start Your Free Trial'}
            </Button>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};