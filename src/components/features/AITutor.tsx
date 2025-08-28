import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  Slider,
} from '@mui/material';
import {
  Send,
  Mic,
  MicOff,
  VolumeUp,
  VolumeOff,
  Settings,
  SmartToy,
  Psychology,
  School,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'quiz' | 'suggestion' | 'encouragement';
}

interface AITutorProps {
  studentName?: string;
  subject?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export const AITutor: React.FC<AITutorProps> = ({
  studentName = 'Student',
  subject = 'Mathematics',
  difficulty = 'beginner',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi ${studentName}! I'm Maya, your AI learning companion. I'm here to help you with ${subject}. What would you like to learn today?`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);
  const [aiPersonality, setAiPersonality] = useState('friendly');
  const [speechSpeed, setSpeechSpeed] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiPersonalities = [
    { value: 'friendly', label: '😊 Friendly Maya', description: 'Encouraging and supportive' },
    { value: 'professional', label: '🎓 Professor Alex', description: 'Formal and academic' },
    { value: 'playful', label: '🎮 Buddy Bot', description: 'Fun and game-like' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    const responses = {
      math: [
        "Great question! Let me break this down step by step for you.",
        "I love your curiosity! Here's how we can solve this together.",
        "That's a fantastic problem to work on! Let's start with the basics.",
      ],
      help: [
        "I'm here to help! What specific topic would you like to explore?",
        "No worries, we'll figure this out together! What's confusing you?",
        "That's what I'm here for! Let me guide you through this.",
      ],
      encouragement: [
        "You're doing amazing! Keep up the great work!",
        "I can see you're really thinking hard about this. That's wonderful!",
        "Every question you ask makes you smarter. Great job!",
      ],
    };

    let responseType: 'text' | 'quiz' | 'suggestion' | 'encouragement' = 'text';
    let responseText = "That's an interesting question! Let me think about the best way to help you understand this concept.";

    if (userMessage.toLowerCase().includes('quiz') || userMessage.toLowerCase().includes('test')) {
      responseType = 'quiz';
      responseText = "I'd love to create a personalized quiz for you! Based on what we've been learning, here's a question: What is 7 + 5?";
    } else if (userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('confused')) {
      responseText = responses.help[Math.floor(Math.random() * responses.help.length)];
    } else if (userMessage.toLowerCase().includes('math') || userMessage.toLowerCase().includes('number')) {
      responseText = responses.math[Math.floor(Math.random() * responses.math.length)];
    } else if (userMessage.toLowerCase().includes('good') || userMessage.toLowerCase().includes('thanks')) {
      responseType = 'encouragement';
      responseText = responses.encouragement[Math.floor(Math.random() * responses.encouragement.length)];
    }

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: 'ai',
      timestamp: new Date(),
      type: responseType,
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      // Text-to-speech for AI responses
      if (voiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse.text);
        utterance.rate = speechSpeed;
        utterance.pitch = 1.2;
        speechSynthesis.speak(utterance);
      }
    }, 1500);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };

      recognition.start();
    }
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'quiz': return '📝';
      case 'suggestion': return '💡';
      case 'encouragement': return '🌟';
      default: return '🤖';
    }
  };

  const getPersonalityAvatar = () => {
    const personality = aiPersonalities.find(p => p.value === aiPersonality);
    return personality?.label.split(' ')[0] || '🤖';
  };

  return (
    <Card sx={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2, bgcolor: 'rgba(255,255,255,0.2)' }}>
              {getPersonalityAvatar()}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                AI Tutor - {aiPersonalities.find(p => p.value === aiPersonality)?.label.split(' ')[1]}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {subject} • {difficulty} level
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              sx={{ color: 'white', mr: 1 }}
            >
              {voiceEnabled ? <VolumeUp /> : <VolumeOff />}
            </IconButton>
            <IconButton
              onClick={(e) => setSettingsAnchor(e.currentTarget)}
              sx={{ color: 'white' }}
            >
              <Settings />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Messages */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                    color: message.sender === 'user' ? 'white' : 'text.primary',
                  }}
                >
                  {message.sender === 'ai' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="caption" sx={{ mr: 1 }}>
                        {getMessageIcon(message.type)}
                      </Typography>
                      {message.type && message.type !== 'text' && (
                        <Chip
                          label={message.type}
                          size="small"
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                  )}
                  <Typography variant="body2">{message.text}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 1,
                      opacity: 0.7,
                      textAlign: message.sender === 'user' ? 'right' : 'left',
                    }}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                <SmartToy />
              </Avatar>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" sx={{ mr: 1 }}>
                  AI is thinking
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    >
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me anything about your learning..."
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
          <IconButton
            onClick={handleVoiceInput}
            color={isListening ? 'primary' : 'default'}
            sx={{
              bgcolor: isListening ? 'primary.light' : 'grey.100',
              '&:hover': {
                bgcolor: isListening ? 'primary.main' : 'grey.200',
              },
            }}
          >
            {isListening ? <MicOff /> : <Mic />}
          </IconButton>
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            sx={{ minWidth: 'auto', p: 1.5, borderRadius: 3 }}
          >
            <Send />
          </Button>
        </Box>
      </Box>

      {/* Settings Menu */}
      <Menu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={() => setSettingsAnchor(null)}
      >
        <Box sx={{ p: 2, minWidth: 250 }}>
          <Typography variant="subtitle2" gutterBottom>
            AI Personality
          </Typography>
          {aiPersonalities.map((personality) => (
            <MenuItem
              key={personality.value}
              onClick={() => {
                setAiPersonality(personality.value);
                setSettingsAnchor(null);
              }}
              selected={aiPersonality === personality.value}
            >
              <Box>
                <Typography variant="body2">{personality.label}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {personality.description}
                </Typography>
              </Box>
            </MenuItem>
          ))}
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Speech Speed
            </Typography>
            <Slider
              value={speechSpeed}
              onChange={(_, value) => setSpeechSpeed(value as number)}
              min={0.5}
              max={2}
              step={0.1}
              marks={[
                { value: 0.5, label: 'Slow' },
                { value: 1, label: 'Normal' },
                { value: 2, label: 'Fast' },
              ]}
            />
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={voiceEnabled}
                onChange={(e) => setVoiceEnabled(e.target.checked)}
              />
            }
            label="Voice Responses"
            sx={{ mt: 1 }}
          />
        </Box>
      </Menu>
    </Card>
  );
};