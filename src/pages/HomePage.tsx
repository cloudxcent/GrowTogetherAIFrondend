import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Star,
  ArrowForward,
  PlayArrow,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Learning',
      description: 'Personalized learning paths for every child.',
    },
    {
      icon: '📊',
      title: 'Smart Analytics',
      description: 'Track progress with clear, actionable insights.',
    },
    {
      icon: '🎮',
      title: 'Gamified Learning',
      description: 'Earn badges and complete fun challenges.',
    },
    {
      icon: '🛡️',
      title: 'Safe Environment',
      description: 'Parental controls for a secure learning space.',
    },
    {
      icon: '📺',
      title: 'Integrate with TV',
      description: 'Connect to your smart TV for focused learning.',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Parent',
      content: 'GrowTogether AI has made learning fun and safe for my daughter. The TV integration is a game changer!',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      name: 'Rahul Verma',
      role: 'Student',
      content: 'I love the games and the AI tutor! I learn new things every day and my parents can see my progress.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      name: 'Anita Desai',
      role: 'Parent',
      content: 'Parental controls give me peace of mind. The analytics help me support my son’s learning journey.',
      rating: 4,
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
  ];

  function HomePage() {
    const theme = useTheme();
    const navigate = useNavigate();
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
      <Box>
        {/* Hero Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                      lineHeight: 1.1,
                      mb: 3,
                    }}
                  >
                    Where AI Meets
                    <br />
                    <span style={{ background: 'linear-gradient(45deg, #FFD700, #FFA500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Learning Magic ✨
                    </span>
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, fontWeight: 300 }}>
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
                        mb: 4,
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          borderRadius: 3,
                          fontSize: '1.1rem',
                          '& input': {
                            color: theme.palette.text.primary,
                          },
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleSearch} edge="end">
                              <Star />
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
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button
                        size="large"
                        variant="contained"
                        onClick={handleGetStarted}
                        sx={{
                          backgroundColor: 'white',
                          color: theme.palette.primary.main,
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          borderRadius: 2,
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
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          borderRadius: 2,
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
                    />
                    {/* Floating Elements */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        position: 'absolute',
                        top: '20%',
                        left: '-10%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
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
                        bottom: '20%',
                        right: '-10%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
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
        <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
          <Container maxWidth="lg">
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
                sx={{ mb: 6 }}
              >
                Why Choose GrowTogether AI?
              </Typography>
            </motion.div>
            <Grid container spacing={4} justifyContent="center">
              {features.map((feature, index) => (
                <Grid key={feature.title} item xs={12} sm={6} md={4} lg={4} sx={{ display: 'flex' }}>
                  <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h2" component="div" gutterBottom>
                        {feature.icon}
                      </Typography>
                      <Typography variant="h6" component="div" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        {/* Testimonials Section */}
        <Box sx={{ py: 8, backgroundColor: 'grey.50' }}>
          <Container maxWidth="lg">
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
                sx={{ mb: 6 }}
              >
                Loved by Parents & Students
              </Typography>
            </motion.div>
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid key={testimonial.name} item xs={12} md={4}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        p: 3,
                        borderRadius: 3,
                        position: 'relative',
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', mb: 2 }}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
                          ))}
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{ mb: 3, fontStyle: 'italic' }}
                        >
                          "{testimonial.content}"
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            src={testimonial.avatar}
                            sx={{ width: 48, height: 48, mr: 2 }}
                          />
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {testimonial.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
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
            py: 8,
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
            color: 'white',
          }}
        >
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography variant="h3" fontWeight={700} gutterBottom>
                Ready to Transform Learning?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Join thousands of families already using GrowTogether AI
              </Typography>
              <Button
                size="large"
                variant="contained"
                onClick={handleGetStarted}
                sx={{
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  borderRadius: 2,
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
  }

  export default HomePage;