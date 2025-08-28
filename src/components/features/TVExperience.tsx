import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Tv,
  PlayArrow,
  Pause,
  VolumeUp,
  Fullscreen,
  ArrowBack,
  ArrowForward,
  Star,
  AccessTime,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { mockTVContent } from '../../data/mockData';

interface TVExperienceProps {
  isFullscreen?: boolean;
  onFullscreenToggle?: () => void;
}

export const TVExperience: React.FC<TVExperienceProps> = ({
  isFullscreen = false,
  onFullscreenToggle,
}) => {
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [showPlayer, setShowPlayer] = useState(false);

  const handlePlayContent = (content: any) => {
    setSelectedContent(content);
    setShowPlayer(true);
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setIsPlaying(false);
    setSelectedContent(null);
  };

  const TVRemoteControl = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          position: 'fixed',
          right: 20,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 80,
          zIndex: 1000,
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
        }}
      >
        <CardContent sx={{ p: 1, textAlign: 'center' }}>
          <Typography variant="caption" gutterBottom>
            TV Remote
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <IconButton
              onClick={() => setIsPlaying(!isPlaying)}
              sx={{ color: 'white' }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton sx={{ color: 'white' }}>
              <VolumeUp />
            </IconButton>
            <IconButton
              onClick={onFullscreenToggle}
              sx={{ color: 'white' }}
            >
              <Fullscreen />
            </IconButton>
            <IconButton
              onClick={() => setCurrentEpisode(Math.max(1, currentEpisode - 1))}
              sx={{ color: 'white' }}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              onClick={() => setCurrentEpisode(currentEpisode + 1)}
              sx={{ color: 'white' }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (showPlayer) {
    return (
      <Dialog
        open={showPlayer}
        onClose={handleClosePlayer}
        maxWidth={false}
        fullScreen={isFullscreen}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'black',
            width: isFullscreen ? '100%' : '90%',
            height: isFullscreen ? '100%' : '80%',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          {/* Video Player */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <img
              src={selectedContent?.thumbnail}
              alt={selectedContent?.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: isPlaying ? 'brightness(0.7)' : 'brightness(1)',
              }}
            />

            {/* Play/Pause Overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <IconButton
                    onClick={() => setIsPlaying(true)}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      width: 80,
                      height: 80,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,1)',
                      },
                    }}
                  >
                    <PlayArrow sx={{ fontSize: 40, color: 'primary.main' }} />
                  </IconButton>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TV-Style Info Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                p: 3,
                color: 'white',
              }}
            >
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {selectedContent?.title}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Episode {currentEpisode}: Introduction to Numbers
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Chip
                  label={selectedContent?.category}
                  sx={{ backgroundColor: 'primary.main', color: 'white' }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body2">{selectedContent?.duration}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Star sx={{ mr: 1, fontSize: 16, color: 'gold' }} />
                  <Typography variant="body2">4.8</Typography>
                </Box>
              </Box>
              
              {/* Progress Bar */}
              <Box sx={{ mb: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={35}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'primary.main',
                    },
                  }}
                />
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  8:45 / 25:00 - 35% complete
                </Typography>
              </Box>

              {/* TV-Style Controls */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={isPlaying ? <Pause /> : <PlayArrow />}
                  onClick={() => setIsPlaying(!isPlaying)}
                  sx={{ minWidth: 120 }}
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClosePlayer}
                  sx={{ color: 'white', borderColor: 'white' }}
                >
                  Exit
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ArrowForward />}
                  sx={{ color: 'white', borderColor: 'white' }}
                >
                  Next Episode
                </Button>
              </Box>
            </Box>
          </Box>

          {/* TV Remote Control */}
          <TVRemoteControl />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Box>
      {/* TV Experience Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              p: 2,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              mb: 2,
            }}
          >
            <Tv sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" fontWeight={700}>
              TV Learning Experience
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary">
            Optimized for big screen learning in your living room
          </Typography>
        </Box>
      </motion.div>

      {/* Featured Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card
          sx={{
            mb: 4,
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '50%',
              height: '100%',
              backgroundImage: `url(${mockTVContent[0]?.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.3,
            }}
          />
          <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Featured: Math Adventures TV
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              Interactive math lessons designed for TV viewing with voice commands and gesture controls
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Chip label="12 Episodes" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} />
              <Chip label="Ages 6-10" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} />
              <Chip label="Interactive" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} />
            </Box>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={() => handlePlayContent(mockTVContent[0])}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Start Watching
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* TV Content Grid */}
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
        📺 TV-Optimized Shows
      </Typography>
      
      <Grid container spacing={3}>
        {mockTVContent.map((content, index) => (
          <Grid item xs={12} sm={6} md={4} key={content.id}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  '&:hover': {
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  },
                  transition: 'all 0.3s ease',
                }}
                onClick={() => handlePlayContent(content)}
              >
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={content.thumbnail}
                    alt={content.title}
                    style={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                    }}
                  />
                  
                  {/* TV Icon Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      borderRadius: 1,
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Tv sx={{ color: 'white', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
                      TV
                    </Typography>
                  </Box>

                  {/* Play Button Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      '.MuiCard-root:hover &': {
                        opacity: 1,
                      },
                    }}
                  >
                    <IconButton
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        width: 60,
                        height: 60,
                        '&:hover': {
                          backgroundColor: 'white',
                        },
                      }}
                    >
                      <PlayArrow sx={{ fontSize: 30, color: 'primary.main' }} />
                    </IconButton>
                  </Box>

                  {/* Episode Count */}
                  <Chip
                    label={`${content.episodes} Episodes`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      right: 12,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: 'white',
                    }}
                  />
                </Box>

                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {content.title}
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
                    {content.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Chip
                      label={content.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {content.duration}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* TV Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card sx={{ mt: 4, p: 3, backgroundColor: 'grey.50' }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            🎮 TV Experience Features
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 1 }}>🎙️</Typography>
                <Typography variant="subtitle2" fontWeight={600}>Voice Commands</Typography>
                <Typography variant="body2" color="text.secondary">
                  "Play next episode", "Pause", "Repeat that"
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 1 }}>👋</Typography>
                <Typography variant="subtitle2" fontWeight={600}>Gesture Control</Typography>
                <Typography variant="body2" color="text.secondary">
                  Wave to pause, point to select, thumbs up to like
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 1 }}>📱</Typography>
                <Typography variant="subtitle2" fontWeight={600}>Remote App</Typography>
                <Typography variant="body2" color="text.secondary">
                  Control from your phone or tablet
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 1 }}>👨‍👩‍👧‍👦</Typography>
                <Typography variant="subtitle2" fontWeight={600}>Family Mode</Typography>
                <Typography variant="body2" color="text.secondary">
                  Multiple profiles, parental controls
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </motion.div>
    </Box>
  );
};