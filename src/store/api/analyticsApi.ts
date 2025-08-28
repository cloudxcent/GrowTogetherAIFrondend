import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Analytics } from '../../types';

export const analyticsApi = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/analytics',
  }),
  tagTypes: ['Analytics'],
  endpoints: (builder) => ({
    getUserAnalytics: builder.query<Analytics, string>({
      query: (userId) => `/${userId}`,
      providesTags: ['Analytics'],
      // Mock analytics data
      async queryFn() {
        await new Promise(resolve => setTimeout(resolve, 700));
        return {
          data: {
            userId: 'child1',
            totalHours: 45.5,
            coursesCompleted: 3,
            currentStreak: 7,
            weakAreas: ['Advanced Math', 'Grammar'],
            strongAreas: ['Basic Math', 'Reading Comprehension', 'Creative Writing'],
            weeklyProgress: [
              { day: 'Mon', hours: 2.5 },
              { day: 'Tue', hours: 1.8 },
              { day: 'Wed', hours: 3.2 },
              { day: 'Thu', hours: 2.1 },
              { day: 'Fri', hours: 2.8 },
              { day: 'Sat', hours: 4.0 },
              { day: 'Sun', hours: 1.5 },
            ],
            subjectProgress: [
              { subject: 'Mathematics', progress: 78 },
              { subject: 'Science', progress: 65 },
              { subject: 'Language Arts', progress: 82 },
              { subject: 'Art', progress: 71 },
              { subject: 'Programming', progress: 45 },
            ],
          },
        };
      },
    }),
    getParentAnalytics: builder.query<Analytics[], string>({
      query: (parentId) => `/parent/${parentId}`,
      providesTags: ['Analytics'],
    }),
  }),
});

export const {
  useGetUserAnalyticsQuery,
  useGetParentAnalyticsQuery,
} = analyticsApi;