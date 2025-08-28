import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PricingPlan } from '../../types';

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/payments',
  }),
  tagTypes: ['Plan', 'Subscription'],
  endpoints: (builder) => ({
    getPricingPlans: builder.query<PricingPlan[], void>({
      query: () => '/plans',
      providesTags: ['Plan'],
      // Mock pricing data
      async queryFn() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          data: [
            {
              id: 'free',
              name: 'Free Explorer',
              price: 0,
              interval: 'month' as const,
              features: [
                'Access to basic courses',
                '1 child profile',
                'Basic progress tracking',
                'Community support',
                'Limited AI tutor interactions (5/month)',
              ],
              limits: {
                children: 1,
                courses: 10,
                aiTutorHours: 2,
              },
            },
            {
              id: 'premium',
              name: 'Smart Learner',
              price: 19.99,
              interval: 'month' as const,
              popular: true,
              features: [
                'Access to all courses',
                'Up to 3 child profiles',
                'Advanced analytics',
                'Personalized learning paths',
                'Unlimited AI tutor interactions',
                'Parental controls & safety features',
                'Priority support',
                'Offline content download',
              ],
              limits: {
                children: 3,
                courses: -1, // unlimited
                aiTutorHours: -1, // unlimited
              },
            },
            {
              id: 'family',
              name: 'Family Plus',
              price: 39.99,
              interval: 'month' as const,
              features: [
                'Everything in Smart Learner',
                'Up to 5 child profiles',
                'Family dashboard',
                'Advanced parental controls',
                'Custom learning goals',
                'Video calls with AI tutors',
                'Progress reports & insights',
                'Early access to new features',
              ],
              limits: {
                children: 5,
                courses: -1, // unlimited
                aiTutorHours: -1, // unlimited
              },
            },
          ],
        };
      },
    }),
    createSubscription: builder.mutation<any, { planId: string; paymentMethod: string }>({
      query: (data) => ({
        url: '/subscribe',
        method: 'POST',
        body: data,
      }),
      // Mock payment processing
      async queryFn(data) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {
          data: {
            success: true,
            subscriptionId: `sub_${Date.now()}`,
            message: 'Subscription created successfully',
          },
        };
      },
    }),
    processPayment: builder.mutation<any, { amount: number; currency: string; method: string }>({
      query: (data) => ({
        url: '/process',
        method: 'POST',
        body: data,
      }),
      // Mock Stripe/PayPal/Razorpay integration
      async queryFn(data) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return {
          data: {
            success: true,
            transactionId: `txn_${Date.now()}`,
            status: 'completed',
          },
        };
      },
    }),
  }),
});

export const {
  useGetPricingPlansQuery,
  useCreateSubscriptionMutation,
  useProcessPaymentMutation,
} = paymentsApi;