import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  SmartToy,
  Quiz,
  CheckCircle,
  Cancel,
  Refresh,
  Send,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

interface QuizGeneratorProps {
  subject?: string;
  onQuizComplete?: (score: number, totalQuestions: number) => void;
}

export const QuizGenerator: React.FC<QuizGeneratorProps> = ({
  subject = 'Mathematics',
  onQuizComplete,
}) => {
  const [quizConfig, setQuizConfig] = useState({
    subject: subject,
    topic: '',
    difficulty: 'medium',
    questionCount: 5,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography'];
  const topics = {
    Mathematics: ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Fractions', 'Geometry'],
    Science: ['Biology', 'Chemistry', 'Physics', 'Earth Science', 'Space'],
    English: ['Grammar', 'Vocabulary', 'Reading Comprehension', 'Writing'],
    History: ['Ancient History', 'Modern History', 'World Wars', 'Civilizations'],
    Geography: ['Countries', 'Capitals', 'Rivers', 'Mountains', 'Climate'],
  };

  // Mock AI-generated questions
  const generateMockQuiz = (): Question[] => {
    const mockQuestions: Question[] = [
      {
        id: '1',
        question: 'What is 7 × 8?',
        options: ['54', '56', '58', '60'],
        correctAnswer: 1,
        explanation: '7 × 8 = 56. You can think of it as 7 groups of 8, or 8 groups of 7.',
        difficulty: 'medium',
        topic: 'Multiplication',
      },
      {
        id: '2',
        question: 'Which of these is a prime number?',
        options: ['15', '21', '17', '25'],
        correctAnswer: 2,
        explanation: '17 is a prime number because it can only be divided by 1 and itself.',
        difficulty: 'medium',
        topic: 'Number Theory',
      },
      {
        id: '3',
        question: 'What is the area of a rectangle with length 6 and width 4?',
        options: ['20', '24', '28', '32'],
        correctAnswer: 1,
        explanation: 'Area of rectangle = length × width = 6 × 4 = 24 square units.',
        difficulty: 'medium',
        topic: 'Geometry',
      },
      {
        id: '4',
        question: 'What is 3/4 + 1/4?',
        options: ['4/8', '1', '4/4', '1/2'],
        correctAnswer: 1,
        explanation: '3/4 + 1/4 = 4/4 = 1. When adding fractions with the same denominator, add the numerators.',
        difficulty: 'easy',
        topic: 'Fractions',
      },
      {
        id: '5',
        question: 'If a triangle has angles of 60°, 60°, and 60°, what type of triangle is it?',
        options: ['Right triangle', 'Equilateral triangle', 'Isosceles triangle', 'Scalene triangle'],
        correctAnswer: 1,
        explanation: 'An equilateral triangle has all three angles equal to 60° and all sides equal.',
        difficulty: 'hard',
        topic: 'Geometry',
      },
    ];

    return mockQuestions.slice(0, quizConfig.questionCount);
  };

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedQuiz = generateMockQuiz();
    setQuiz(generatedQuiz);
    setIsGenerating(false);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResults(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      setShowResults(true);
      const correctAnswers = quiz.reduce((count, question, index) => {
        return count + (userAnswers[index] === question.correctAnswer ? 1 : 0);
      }, 0);
      onQuizComplete?.(correctAnswers, quiz.length);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return quiz.reduce((count, question, index) => {
      return count + (userAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'error';
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.length) * 100);

    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" gutterBottom>
              🎉 Quiz Complete!
            </Typography>
            <Typography variant="h2" color={`${getScoreColor(score, quiz.length)}.main`} fontWeight={700}>
              {score}/{quiz.length}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              {percentage}% Correct
            </Typography>

            <Box sx={{ mb: 4 }}>
              {percentage >= 80 && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Excellent work! You've mastered this topic! 🌟
                </Alert>
              )}
              {percentage >= 60 && percentage < 80 && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Good job! A little more practice will help you improve. 📚
                </Alert>
              )}
              {percentage < 60 && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Keep practicing! Every mistake is a learning opportunity. 💪
                </Alert>
              )}
            </Box>

            {/* Detailed Results */}
            <Box sx={{ textAlign: 'left', mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Question Review:
              </Typography>
              {quiz.map((question, index) => (
                <Box
                  key={question.id}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: 1,
                    borderColor: userAnswers[index] === question.correctAnswer ? 'success.main' : 'error.main',
                    borderRadius: 2,
                    backgroundColor: userAnswers[index] === question.correctAnswer ? 'success.light' : 'error.light',
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={600}>
                    Q{index + 1}: {question.question}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Your answer: {question.options[userAnswers[index]]}
                    {userAnswers[index] === question.correctAnswer ? (
                      <CheckCircle sx={{ ml: 1, fontSize: 16, color: 'success.main' }} />
                    ) : (
                      <Cancel sx={{ ml: 1, fontSize: 16, color: 'error.main' }} />
                    )}
                  </Typography>
                  {userAnswers[index] !== question.correctAnswer && (
                    <Typography variant="body2" color="text.secondary">
                      Correct answer: {question.options[question.correctAnswer]}
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                    {question.explanation}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => {
                  setQuizStarted(false);
                  setShowResults(false);
                  setQuiz([]);
                }}
              >
                Generate New Quiz
              </Button>
              <Button
                variant="contained"
                startIcon={<Send />}
                onClick={() => {
                  // In a real app, this would save results
                  console.log('Quiz results saved');
                }}
              >
                Save Results
              </Button>
            </Box>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  if (quizStarted && quiz.length > 0) {
    const currentQ = quiz[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.length) * 100;

    return (
      <Card>
        <CardContent>
          {/* Progress */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6">
                Question {currentQuestion + 1} of {quiz.length}
              </Typography>
              <Chip
                label={currentQ.difficulty}
                size="small"
                color={currentQ.difficulty === 'easy' ? 'success' : currentQ.difficulty === 'medium' ? 'warning' : 'error'}
              />
            </Box>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
          </Box>

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
              {currentQ.question}
            </Typography>

            <RadioGroup
              value={userAnswers[currentQuestion] ?? ''}
              onChange={(e) => handleAnswerSelect(parseInt(e.target.value))}
            >
              {currentQ.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={option}
                  sx={{
                    mb: 1,
                    p: 1,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </motion.div>

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              variant="outlined"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={userAnswers[currentQuestion] === undefined}
              variant="contained"
            >
              {currentQuestion === quiz.length - 1 ? 'Finish Quiz' : 'Next'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SmartToy sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h5" fontWeight={600}>
            AI Quiz Generator
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Generate personalized quizzes powered by AI to test your knowledge and track your progress.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Subject</InputLabel>
            <Select
              value={quizConfig.subject}
              onChange={(e) => setQuizConfig(prev => ({ ...prev, subject: e.target.value }))}
              label="Subject"
            >
              {subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Topic</InputLabel>
            <Select
              value={quizConfig.topic}
              onChange={(e) => setQuizConfig(prev => ({ ...prev, topic: e.target.value }))}
              label="Topic"
            >
              {(topics[quizConfig.subject as keyof typeof topics] || []).map((topic) => (
                <MenuItem key={topic} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={quizConfig.difficulty}
              onChange={(e) => setQuizConfig(prev => ({ ...prev, difficulty: e.target.value }))}
              label="Difficulty"
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Number of Questions"
            type="number"
            value={quizConfig.questionCount}
            onChange={(e) => setQuizConfig(prev => ({ ...prev, questionCount: parseInt(e.target.value) }))}
            inputProps={{ min: 3, max: 20 }}
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
            startIcon={isGenerating ? null : <Quiz />}
            onClick={handleGenerateQuiz}
            disabled={isGenerating || !quizConfig.topic}
            sx={{ py: 1.5 }}
          >
            {isGenerating ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 2 }}>Generating AI Quiz...</Box>
                <LinearProgress sx={{ width: 100 }} />
              </Box>
            ) : (
              'Generate AI Quiz'
            )}
          </Button>
        </Box>

        {isGenerating && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              🤖 AI is analyzing your learning level and creating personalized questions...
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};