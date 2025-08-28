import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  Stack,
} from '@mui/material';
import {
  Google as GoogleIcon,
  Microsoft as MicrosoftIcon,
  Mail as YahooIcon,
  AlternateEmail as OutlookIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { useLoginWithGoogleMutation, useLoginWithMicrosoftMutation } from '../../store/api/authApi';

const oauthProviders = [
  {
    name: 'Google',
    icon: GoogleIcon,
    color: '#4285f4',
    action: 'google',
  },
  {
    name: 'Microsoft',
    icon: MicrosoftIcon,
    color: '#00a1f1',
    action: 'microsoft',
  },
  {
    name: 'Yahoo',
    icon: YahooIcon,
    color: '#720e9e',
    action: 'yahoo',
  },
  {
    name: 'Outlook',
    icon: OutlookIcon,
    color: '#0078d4',
    action: 'outlook',
  },
];

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState<'parent' | 'student' | 'admin'>('parent');
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [loginWithGoogle] = useLoginWithGoogleMutation();
  const [loginWithMicrosoft] = useLoginWithMicrosoftMutation();

  const handleOAuthLogin = async (provider: string) => {
    try {
      setLoading(provider);
      setError(null);
      dispatch(loginStart());

      // In a real app, this would redirect to the OAuth provider
      // Here we're simulating the login process
      let result;
      switch (provider) {
        case 'google':
          result = await loginWithGoogle().unwrap();
          break;
        case 'microsoft':
          result = await loginWithMicrosoft().unwrap();
          break;
        default:
          // Mock for other providers
          await new Promise(resolve => setTimeout(resolve, 2000));
          result = {
            id: `${provider}_user_${Date.now()}`,
            name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
            email: `user@${provider}.com`,
            role: selectedRole,
            avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2`,
          };
      }

      dispatch(loginSuccess({ ...result, role: selectedRole }));
    } catch (err: any) {
      setError(err.message || `Failed to login with ${provider}`);
      dispatch(loginFailure(err.message || 'Login failed'));
    } finally {
      setLoading(null);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card
          sx={{
            maxWidth: 480,
            width: '100%',
            borderRadius: 3,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Logo and Title */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  🤖
                </Box>
              </motion.div>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Welcome to GrowTogether AI
              </Typography>
              <Typography variant="body1" color="text.secondary">
                AI-powered learning for the next generation
              </Typography>
            </Box>

            {/* Role Selection */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                I am a:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {(['parent', 'student', 'admin'] as const).map((role) => (
                  <Chip
                    key={role}
                    label={role.charAt(0).toUpperCase() + role.slice(1)}
                    onClick={() => setSelectedRole(role)}
                    color={selectedRole === role ? 'primary' : 'default'}
                    variant={selectedRole === role ? 'filled' : 'outlined'}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* OAuth Providers */}
            <Stack spacing={2}>
              {oauthProviders.map((provider) => {
                const Icon = provider.icon;
                const isLoading = loading === provider.action;
                
                return (
                  <motion.div
                    key={provider.action}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      size="large"
                      onClick={() => handleOAuthLogin(provider.action)}
                      disabled={Boolean(loading)}
                      startIcon={
                        isLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <Icon sx={{ color: provider.color }} />
                        )
                      }
                      sx={{
                        py: 1.5,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        borderColor: 'divider',
                        '&:hover': {
                          borderColor: provider.color,
                          backgroundColor: `${provider.color}08`,
                        },
                      }}
                    >
                      {isLoading ? 'Signing in...' : `Continue with ${provider.name}`}
                    </Button>
                  </motion.div>
                );
              })}
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Secure OAuth Authentication
              </Typography>
            </Divider>

            {/* Features Highlight */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                🔒 Safe & Secure • 🤖 AI-Powered Learning • 👨‍👩‍👧‍👦 Family Friendly
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};