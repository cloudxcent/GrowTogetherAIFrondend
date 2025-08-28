import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  Fullscreen,
  ClosedCaption,
  Speed,
  SmartToy,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  transcript?: string[];
  aiInsights?: string[];
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  transcript = [],
  aiInsights = [],
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card sx={{ mb: 3 }}>
      <Box sx={{ position: 'relative', backgroundColor: 'black' }}>
        <video
          ref={videoRef}
          width="100%"
          height="400"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          poster="https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=800"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Controls Overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            p: 2,
          }}
        >
          {/* Progress Bar */}
          <Slider
            value={currentTime}
            max={duration}
            onChange={(_, value) => {
              if (videoRef.current) {
                videoRef.current.currentTime = value as number;
                setCurrentTime(value as number);
              }
            }}
            sx={{
              color: 'primary.main',
              mb: 1,
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
              },
            }}
          />

          {/* Control Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={handlePlayPause} sx={{ color: 'white' }}>
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
              
              <Typography variant="body2" sx={{ color: 'white', minWidth: 80 }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', width: 100 }}>
                <VolumeUp sx={{ color: 'white', mr: 1 }} />
                <Slider
                  value={volume}
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={(_, value) => {
                    setVolume(value as number);
                    if (videoRef.current) {
                      videoRef.current.volume = value as number;
                    }
                  }}
                  sx={{ color: 'white' }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                startIcon={<Speed />}
                onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
                sx={{ color: 'white', minWidth: 'auto' }}
              >
                {playbackSpeed}x
              </Button>
              
              <IconButton
                onClick={() => setShowCaptions(!showCaptions)}
                sx={{ color: showCaptions ? 'primary.main' : 'white' }}
              >
                <ClosedCaption />
              </IconButton>
              
              <IconButton sx={{ color: 'white' }}>
                <Fullscreen />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* AI-Generated Captions */}
        {showCaptions && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 80,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0,0,0,0.8)',
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: 1,
              maxWidth: '80%',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2">
              AI-Generated Caption: "Welcome to this exciting lesson on mathematics..."
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              icon={<SmartToy />}
              label="AI Enhanced"
              color="primary"
              size="small"
            />
            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowTranscript(true)}
            >
              View Transcript
            </Button>
          </Box>
        </Box>

        {/* AI Insights */}
        {aiInsights.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              🤖 AI Learning Insights
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {aiInsights.map((insight, index) => (
                <Chip
                  key={index}
                  label={insight}
                  variant="outlined"
                  size="small"
                  color="secondary"
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>

      {/* Transcript Dialog */}
      <Dialog
        open={showTranscript}
        onClose={() => setShowTranscript(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">AI-Generated Transcript</Typography>
            <FormControlLabel
              control={<Switch checked={showCaptions} onChange={(e) => setShowCaptions(e.target.checked)} />}
              label="Live Captions"
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <List>
            {transcript.length > 0 ? transcript.map((line, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={line}
                  secondary={`${formatTime(index * 10)} - ${formatTime((index + 1) * 10)}`}
                />
              </ListItem>
            )) : (
              <ListItem>
                <ListItemText
                  primary="Welcome to this exciting lesson on mathematics. Today we'll explore the wonderful world of numbers and how AI can help us learn more effectively..."
                  secondary="0:00 - 0:10"
                />
              </ListItem>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </Card>
  );
};