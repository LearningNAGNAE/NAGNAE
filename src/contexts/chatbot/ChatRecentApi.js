import React, { createContext, useContext, useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const RecentChatsApiContext = createContext(null);

export const RecentChatsProvider = ({ children }) => {
  const SpringbaseUrl = useSelector(state => state.url.SpringbaseUrl);

  const api = useMemo(() => {
    if (!SpringbaseUrl) {
      console.error('SpringBootBaseUrl is not available');
      return null;
    }

    return {
      fetchRecentChats: async (userNo) => {
        try {
          const response = await axios.get(`${SpringbaseUrl}/chat-history/recent`, {
            params: { userNo },
          });
          return response.data;
        } catch (error) {
          console.error('Error fetching recent chats:', error);
          throw error;
        }
      },

      fetchChatHistory: async (userNo, chatHisNo) => {
        try {
          const response = await axios.get(`${SpringbaseUrl}/chat-history/recent-detail`, {
            params: { userNo, chatHisNo }
          });
          return response.data;
        } catch (error) {
          console.error('Error fetching chat history:', error);
          throw error;
        }
      },
    };
  }, [SpringbaseUrl]);

  return (
    <RecentChatsApiContext.Provider value={api}>
      {children}
    </RecentChatsApiContext.Provider>
  );
};

export const useRecentChatsApi = () => {
  const context = useContext(RecentChatsApiContext);
  if (context === undefined) {
    throw new Error('useRecentChatsApi must be used within a RecentChatsProvider');
  }
  return context;
};