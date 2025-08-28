import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Star,
  CreditCard,
  Security,
  Support,
  Close,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetPricingPlansQuery, useCreateSubscriptionMutation, useProcessPaymentMutation } from '../store/api/paymentsApi';

const paymentMethods = [
  { name: 'Stripe', logo: '💳', description: 'Credit/Debit Cards' },
  { name: 'PayPal', logo: '🅿️', description: 'PayPal Account' },
  { name: 'Razorpay', logo: '💰', description: 'UPI, Net Banking, Cards' },
];

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'Best investment for my kids education. The AI tutor is amazing!',
    rating: 5,
  },
  {
    name: 'Michael R.',
    text: 'Affordable premium education. My daughter loves the interactive lessons.',
    rating: 5,
  },
  {
    name: 'Priya S.',
    text: 'Great value for money. The analytics help me track progress effectively.',
    rating: 5,
  },
];

export const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Stripe');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
  });
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { data: plans = [], isLoading } = useGetPricingPlansQuery();
  const [createSubscription] = useCreateSubscriptionMutation();
  const [processPayment] = useProcessPaymentMutation();

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);
    if (plan.price > 0) {
      setPaymentDialog(true);
    } else {
      // Handle free plan signup
      handleFreePlanSignup(plan);
    }
  };

  const handleFreePlanSignup = async (plan: any) => {
    try {
      setProcessing(true);
      await createSubscription({ planId: plan.id, paymentMethod: 'free' });
      setPaymentSuccess(true);
    } catch (error) {
      console.error('Free plan signup failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (!selectedPlan) return;

    try {
      setProcessing(true);
      
      // Process payment
      const paymentResult = await processPayment({
        amount: getAnnualPrice(selectedPlan.price),
        currency: 'USD',
        method: selectedPaymentMethod.toLowerCase(),
      }).unwrap();

      if (paymentResult.success) {
        // Create subscription
        await createSubscription({
          planId: selectedPlan.id,
          paymentMethod: selectedPaymentMethod.toLowerCase(),
        }).unwrap();

        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  const getAnnualPrice = (monthlyPrice: number) => {
    return isAnnual ? monthlyPrice * 12 * 0.8 : monthlyPrice; // 20% discount for annual
  };

  const getAnnualSavings = (monthlyPrice: number) => {
    return monthlyPrice * 12 * 0.2; // 20% savings
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Choose Your Learning Plan 🚀
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Unlock your child's potential with AI-powered education
          </Typography>

          {/* Billing Toggle */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mb: 4,
            }}
          >
            <Typography variant="body1" color={!isAnnual ? 'primary' : 'text.secondary'}>
              Monthly
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={isAnnual}
                  onChange={(e) => setIsAnnual(e.target.checked)}
                  color="primary"
                />
              }
              label=""
            />
            <Typography variant="body1" color={isAnnual ? 'primary' : 'text.secondary'}>
              Annual
            </Typography>
            <Chip
              label="Save 20%"
              size="small"
              color="success"
              sx={{ ml: 1 }}
            />
          </Box>
        </Box>
      </motion.div>

      {/* Pricing Cards */}
      <Grid container spacing={3} sx={{ mb: 8 }}>
        {plans.map((plan, index) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  border: plan.popular ? 3 : 1,
                  borderColor: plan.popular ? 'primary.main' : 'divider',
                  '&:hover': {
                    boxShadow: plan.popular ? '0 12px 40px rgba(37, 99, 235, 0.2)' : '0 8px 32px rgba(0,0,0,0.12)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {plan.popular && (
                  <Chip
                    label="⭐ MOST POPULAR"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontWeight: 600,
                      zIndex: 1,
                    }}
                  />
                )}

                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {plan.name}
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h3"
                      fontWeight={700}
                      color="primary"
                      component="span"
                    >
                      ${plan.price === 0 ? '0' : getAnnualPrice(plan.price).toFixed(2)}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" component="span">
                      /{isAnnual ? 'year' : 'month'}
                    </Typography>
                    
                    {plan.price > 0 && isAnnual && (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="success.main">
                          Save ${getAnnualSavings(plan.price).toFixed(2)}/year
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <List sx={{ mb: 4, textAlign: 'left' }}>
                    {plan.features.map((feature: string, idx: number) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle color="primary" sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{ fontSize: '0.9rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant={plan.popular ? 'contained' : 'outlined'}
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => handleSelectPlan(plan)}
                    disabled={processing}
                    sx={{
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                  >
                    {plan.price === 0 ? 'Start Free' : 'Get Started'}
                  </Button>

                  {/* Plan Limits */}
                  <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Plan Includes:
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption">Children:</Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {plan.limits.children === -1 ? 'Unlimited' : plan.limits.children}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption">Courses:</Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {plan.limits.courses === -1 ? 'Unlimited' : plan.limits.courses}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">AI Tutor:</Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {plan.limits.aiTutorHours === -1 ? 'Unlimited' : `${plan.limits.aiTutorHours}h/month`}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Features Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Card sx={{ mb: 8, p: 4 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom textAlign="center">
            🔒 Safe & Secure Payment
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4} textAlign="center">
              <Security sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>256-bit SSL Encryption</Typography>
              <Typography variant="body2" color="text.secondary">
                Your payment information is protected with bank-level security
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <CreditCard sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Multiple Payment Options</Typography>
              <Typography variant="body2" color="text.secondary">
                Pay with credit cards, PayPal, UPI, and more payment methods
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Support sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>24/7 Support</Typography>
              <Typography variant="body2" color="text.secondary">
                Get help anytime with our dedicated customer support team
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
          What Parents Say 💬
        </Typography>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Box sx={{ mb: 2 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} sx={{ color: '#FFD700', fontSize: '1.2rem' }} />
                  ))}
                </Box>
                <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                  "{testimonial.text}"
                </Typography>
                <Typography variant="subtitle2" fontWeight={600}>
                  - {testimonial.name}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Payment Dialog */}
      <Dialog
        open={paymentDialog}
        onClose={() => setPaymentDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Complete Your Subscription
            </Typography>
            <Button
              onClick={() => setPaymentDialog(false)}
              sx={{ minWidth: 'auto', p: 1 }}
            >
              <Close />
            </Button>
          </Box>
        </DialogTitle>

        <DialogContent>
          <AnimatePresence>
            {paymentSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Welcome to GrowTogether AI! 🎉
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Your subscription is now active. Start exploring amazing courses!
                  </Typography>
                </Box>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Plan Summary */}
                <Card sx={{ mb: 3, p: 2, backgroundColor: 'grey.50' }}>
                  <Typography variant="h6" gutterBottom>
                    {selectedPlan?.name}
                  </Typography>
                  <Typography variant="h4" color="primary" fontWeight={700}>
                    ${selectedPlan ? getAnnualPrice(selectedPlan.price).toFixed(2) : '0'}
                    <Typography variant="body2" component="span" color="text.secondary">
                      /{isAnnual ? 'year' : 'month'}
                    </Typography>
                  </Typography>
                </Card>

                {/* Payment Method Selection */}
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Choose Payment Method
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {paymentMethods.map((method) => (
                    <Grid item xs={12} key={method.name}>
                      <Card
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          border: selectedPaymentMethod === method.name ? 2 : 1,
                          borderColor: selectedPaymentMethod === method.name ? 'primary.main' : 'divider',
                        }}
                        onClick={() => setSelectedPaymentMethod(method.name)}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ fontSize: '1.5rem', mr: 2 }}>{method.logo}</Box>
                          <Box>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {method.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {method.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Payment Details Form */}
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Payment Details
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Cardholder Name"
                    value={paymentDetails.name}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, name: e.target.value }))}
                    fullWidth
                    placeholder="John Doe"
                  />
                  <TextField
                    label="Email Address"
                    type="email"
                    value={paymentDetails.email}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, email: e.target.value }))}
                    fullWidth
                    placeholder="john@example.com"
                  />
                  <TextField
                    label="Card Number"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                    fullWidth
                    placeholder="1234 5678 9012 3456"
                  />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      label="Expiry Date"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                      placeholder="MM/YY"
                    />
                    <TextField
                      label="CVV"
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value }))}
                      placeholder="123"
                    />
                  </Box>
                </Box>

                <Alert severity="info" sx={{ mt: 2 }}>
                  This is a demo payment form. No real transactions will be processed.
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>

        {!paymentSuccess && (
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setPaymentDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handlePayment}
              disabled={processing}
              startIcon={processing ? <CircularProgress size={20} /> : null}
            >
              {processing ? 'Processing...' : 'Complete Payment'}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
};