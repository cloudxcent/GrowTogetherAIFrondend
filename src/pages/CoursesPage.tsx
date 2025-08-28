import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Rating,
  IconButton,
  Skeleton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList,
  PlayArrow,
  BookmarkBorder,
  Bookmark,
  People,
  AccessTime,
  Star,
  ExpandMore,
  SmartToy,
  Tv,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetCoursesQuery } from '../store/api/coursesApi';

const categories = [
  'All',
  'Mathematics',
  'Science',
  'Programming',
  'Language Arts',
  'Art',
  'Music',
  'History',
  'Geography',
];

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = ['Newest', 'Popular', 'Rating', 'Price'];

export const CoursesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const { data: courses = [], isLoading } = useGetCoursesQuery({
    category: selectedCategory === 'All' ? undefined : selectedCategory,
    search: searchQuery,
  });

  const handleBookmark = (courseId: string) => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  const CourseCard: React.FC<{ course: any; index: number }> = ({ course, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={course.thumbnail}
            alt={course.title}
            sx={{
              filter: 'brightness(0.9)',
              '&:hover': { filter: 'brightness(1)' },
              transition: 'filter 0.3s ease',
            }}
          />
          
          {/* Overlay Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Chip
              label={course.category}
              size="small"
              sx={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                fontWeight: 600,
              }}
            />
            {course.isPremium && (
              <Chip
                label="PREMIUM"
                size="small"
                color="secondary"
                sx={{ fontWeight: 600 }}
              />
            )}
          </Box>

          <IconButton
            onClick={() => handleBookmark(course.id)}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(255,255,255,0.9)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
            }}
          >
            {bookmarked.has(course.id) ? (
              <Bookmark color="primary" />
            ) : (
              <BookmarkBorder />
            )}
          </IconButton>

          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor: 'rgba(0,0,0,0.7)',
              borderRadius: 1,
              px: 1,
              py: 0.5,
            }}
          >
            <AccessTime sx={{ fontSize: '1rem', color: 'white' }} />
            <Typography variant="caption" color="white" fontWeight={600}>
              {course.duration}min
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
            {course.title}
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
            {course.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
              <SmartToy />
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              {course.instructor}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={course.rating} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {course.rating} ({course.enrolled.toLocaleString()})
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {course.tags.slice(0, 3).map((tag: string) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
          </Box>

          <Box
            sx={{
              mt: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" color="primary" fontWeight={700}>
              {course.price === 0 ? 'FREE' : `$${course.price}`}
            </Typography>
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              size="small"
              sx={{ borderRadius: 2 }}
            >
              {course.enrolled > 0 ? 'Continue' : 'Start'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  const CourseSkeleton: React.FC = () => (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" height={32} />
        <Skeleton variant="text" height={20} width="80%" />
        <Skeleton variant="text" height={20} width="60%" />
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="rectangular" height={36} width="100%" />
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Explore Courses 🚀
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Discover AI-powered learning experiences tailored for young minds
          </Typography>
        </Box>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card sx={{ mb: 4, p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="🔍 Search courses, topics, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {categories.slice(0, 6).map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => setSelectedCategory(category)}
                    color={selectedCategory === category ? 'primary' : 'default'}
                    variant={selectedCategory === category ? 'filled' : 'outlined'}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setShowFilters(!showFilters)}
                fullWidth
              >
                Filters
              </Button>
            </Grid>
          </Grid>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel>Difficulty</InputLabel>
                        <Select
                          value={selectedDifficulty}
                          onChange={(e) => setSelectedDifficulty(e.target.value)}
                          label="Difficulty"
                        >
                          {difficulties.map((difficulty) => (
                            <MenuItem key={difficulty} value={difficulty}>
                              {difficulty}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          label="Sort By"
                        >
                          {sortOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          icon={<Tv />}
                          label="TV-Optimized"
                          onClick={() => {}}
                          variant="outlined"
                          color="secondary"
                        />
                        <Chip
                          icon={<SmartToy />}
                          label="AI-Enhanced"
                          onClick={() => {}}
                          variant="outlined"
                          color="primary"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SmartToy sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h5" fontWeight={600}>
              AI Recommendations for You
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Based on your learning patterns and interests
          </Typography>
          
          {/* This would be a horizontal scrollable list of recommended courses */}
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
            {courses.slice(0, 3).map((course, index) => (
              <Box key={`rec-${course.id}`} sx={{ minWidth: 280 }}>
                <CourseCard course={course} index={index} />
              </Box>
            ))}
          </Box>
        </Box>
      </motion.div>

      {/* Courses Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
          All Courses ({courses.length})
        </Typography>
        
        <Grid container spacing={3}>
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CourseSkeleton />
                </Grid>
              ))
            : courses.map((course, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                  <CourseCard course={course} index={index} />
                </Grid>
              ))
          }
        </Grid>
      </motion.div>

      {/* Load More */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          variant="outlined"
          size="large"
          sx={{ px: 4 }}
        >
          Load More Courses
        </Button>
      </Box>
    </Box>
  );
};