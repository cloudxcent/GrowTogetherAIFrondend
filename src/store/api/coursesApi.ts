import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Course, Task } from '../../types';

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/courses',
  }),
  tagTypes: ['Course', 'Task'],
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], { category?: string; search?: string }>({
      query: ({ category, search }) => ({
        url: '',
        params: { category, search },
      }),
      providesTags: ['Course'],
      // Mock implementation with dummy data
      async queryFn() {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
          data: [
            {
              id: 'course1',
              title: 'AI Adventures in Math',
              description: 'Learn mathematics through AI-powered interactive adventures',
              category: 'Mathematics',
              difficulty: 'beginner' as const,
              duration: 120,
              thumbnail: 'https://images.pexels.com/photos/8617606/pexels-photo-8617606.jpeg?auto=compress&cs=tinysrgb&w=400',
              instructor: 'AI Tutor Maya',
              rating: 4.8,
              enrolled: 1234,
              price: 0,
              isPremium: false,
              tags: ['Interactive', 'AI-Powered', 'Beginner'],
            },
            {
              id: 'course2',
              title: 'Creative Coding for Kids',
              description: 'Build amazing games and animations with block-based programming',
              category: 'Programming',
              difficulty: 'intermediate' as const,
              duration: 180,
              thumbnail: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=400',
              instructor: 'Code Master Alex',
              rating: 4.9,
              enrolled: 856,
              price: 29.99,
              isPremium: true,
              tags: ['Coding', 'Creative', 'Games'],
            },
            {
              id: 'course3',
              title: 'Science Lab Experiments',
              description: 'Virtual science experiments with AI guidance and safety tips',
              category: 'Science',
              difficulty: 'intermediate' as const,
              duration: 150,
              thumbnail: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
              instructor: 'Dr. Science Bot',
              rating: 4.7,
              enrolled: 945,
              price: 24.99,
              isPremium: true,
              tags: ['Experiments', 'Virtual Lab', 'AI Guidance'],
            },
            {
              id: 'course4',
              title: 'English Adventures',
              description: 'Improve reading and writing skills through storytelling and AI feedback',
              category: 'Language Arts',
              difficulty: 'beginner' as const,
              duration: 100,
              thumbnail: 'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=400',
              instructor: 'Story Wizard Luna',
              rating: 4.6,
              enrolled: 1678,
              price: 0,
              isPremium: false,
              tags: ['Reading', 'Writing', 'Stories'],
            },
            {
              id: 'course5',
              title: 'Digital Art & Design',
              description: 'Create stunning digital artwork with AI-assisted tools and techniques',
              category: 'Art',
              difficulty: 'advanced' as const,
              duration: 200,
              thumbnail: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400',
              instructor: 'Art AI Companion',
              rating: 4.8,
              enrolled: 567,
              price: 39.99,
              isPremium: true,
              tags: ['Digital Art', 'AI Tools', 'Creative'],
            },
          ],
        };
      },
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => `/${id}`,
      providesTags: ['Course'],
    }),
    getTasks: builder.query<Task[], string>({
      query: (userId) => `/tasks/${userId}`,
      providesTags: ['Task'],
      // Mock implementation
      async queryFn() {
        await new Promise(resolve => setTimeout(resolve, 600));
        return {
          data: [
            {
              id: 'task1',
              title: 'Complete Chapter 1: Numbers and Counting',
              description: 'Learn basic counting and number recognition through interactive games',
              courseId: 'course1',
              userId: 'child1',
              type: 'assignment' as const,
              dueDate: '2025-02-15',
              status: 'in-progress' as const,
              progress: 65,
              aiGenerated: true,
            },
            {
              id: 'task2',
              title: 'AI-Generated Quiz: Basic Addition',
              description: 'Complete this personalized quiz generated by our AI tutor',
              courseId: 'course1',
              userId: 'child1',
              type: 'quiz' as const,
              dueDate: '2025-02-10',
              status: 'pending' as const,
              progress: 0,
              aiGenerated: true,
            },
            {
              id: 'task3',
              title: 'Create Your First Animation',
              description: 'Build a simple animation using block-based coding',
              courseId: 'course2',
              userId: 'child2',
              type: 'project' as const,
              dueDate: '2025-02-20',
              status: 'completed' as const,
              progress: 100,
              aiGenerated: false,
            },
          ],
        };
      },
    }),
    generateAIQuiz: builder.mutation<Task, { courseId: string; userId: string; topic: string }>({
      query: (data) => ({
        url: '/ai/generate-quiz',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),
    searchContent: builder.query<any[], string>({
      query: (searchTerm) => `/search?q=${searchTerm}`,
      // Mock AI-powered search
      async queryFn(searchTerm) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
          data: [
            {
              type: 'course',
              id: 'course1',
              title: 'AI Adventures in Math',
              relevance: 0.95,
              snippet: 'Perfect match for math learning with AI guidance',
            },
            {
              type: 'task',
              id: 'task1',
              title: 'Numbers and Counting Assignment',
              relevance: 0.87,
              snippet: 'Interactive assignment on basic math concepts',
            },
          ],
        };
      },
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetTasksQuery,
  useGenerateAIQuizMutation,
  useSearchContentQuery,
} = coursesApi;