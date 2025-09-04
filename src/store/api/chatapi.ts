import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
    reducerPath: 'chatApi',

    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    
    endpoints: (builder) => ({
        sendChatMessage: builder.mutation({
            query: (message) => ({
                url: '/api/chat',  // FastAPI common pattern
                method: 'POST',
                body: { message },
            }),
            transformResponse: (response: any) => {
                // Handle different FastAPI response formats
                if (typeof response === 'string') {
                    return response;
                }
                // Common FastAPI patterns
                return response?.response || response?.message || response?.content || 'No response';
            },
        }),
    }),
});

export const { useSendChatMessageMutation } = chatApi;