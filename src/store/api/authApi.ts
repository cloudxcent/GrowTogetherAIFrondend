import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, Child } from '../../types';

// This is a mock API - replace with your actual backend endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
    // Add auth headers here when integrating with real backend
  }),
  tagTypes: ['User', 'Child'],
  endpoints: (builder) => ({
    // OAuth login endpoints (mock)
    loginWithGoogle: builder.mutation<User, void>({
      query: () => ({
        url: '/google',
        method: 'POST',
      }),
      // Mock implementation
      async queryFn() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
          data: {
            id: '1',
            name: 'John Parent',
            email: 'john@example.com',
            role: 'parent' as const,
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
          },
        };
      },
    }),
    loginWithMicrosoft: builder.mutation<User, void>({
      query: () => ({
        url: '/microsoft',
        method: 'POST',
      }),
      // Mock implementation
      async queryFn() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
          data: {
            id: '2',
            name: 'Jane Parent',
            email: 'jane@example.com',
            role: 'parent' as const,
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
          },
        };
      },
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => '/me',
      providesTags: ['User'],
    }),
    getChildren: builder.query<Child[], string>({
      query: (parentId) => `/children/${parentId}`,
      providesTags: ['Child'],
      // Mock implementation
      async queryFn() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          data: [
            {
              id: 'child1',
              name: 'Emma',
              age: 8,
              grade: '3rd Grade',
              parentId: '1',
              avatar: 'https://images.pexels.com/photos/1462634/pexels-photo-1462634.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
              learningGoals: ['Math', 'Science', 'Reading'],
              restrictions: {
                screenTime: 120,
                allowedCategories: ['Educational', 'Creative'],
                blockedContent: ['Violence', 'Mature Themes'],
                safeMode: true,
              },
            },
            {
              id: 'child2',
              name: 'Lucas',
              age: 12,
              grade: '7th Grade',
              parentId: '1',
              avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
              learningGoals: ['Programming', 'Physics', 'Art'],
              restrictions: {
                screenTime: 180,
                allowedCategories: ['Educational', 'STEM', 'Creative'],
                blockedContent: ['Violence'],
                safeMode: false,
              },
            },
          ],
        };
      },
    }),
    addChild: builder.mutation<Child, Partial<Child>>({
      query: (child) => ({
        url: '/children',
        method: 'POST',
        body: child,
      }),
      invalidatesTags: ['Child'],
    }),
    updateChild: builder.mutation<Child, { id: string; updates: Partial<Child> }>({
      query: ({ id, updates }) => ({
        url: `/children/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: ['Child'],
    }),
  }),
});

export const {
  useLoginWithGoogleMutation,
  useLoginWithMicrosoftMutation,
  useGetCurrentUserQuery,
  useGetChildrenQuery,
  useAddChildMutation,
  useUpdateChildMutation,
} = authApi;