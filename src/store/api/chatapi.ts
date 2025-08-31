import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
    reducerPath: 'chatApi',

    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    
    endpoints: (builder) => ({
        sendChatMessage: builder.mutation({
            query: (message) => ({
                url: 'api/openai/chat',
                method: 'POST',
                body: { message },
            }),
        }),
    }),
});

export const { useSendChatMessageMutation } = chatApi;