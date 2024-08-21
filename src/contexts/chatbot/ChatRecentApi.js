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
      // 최근 채팅 목록을 가져오는 함수
      fetchRecentChats: async (userNo) => {
        try {
          const response = await axios.get(`${SpringbaseUrl}/chat-history/recent`, {
            params: { userNo },
          });
          return response.data;
        } catch (error) {
          console.error('최근 채팅 목록 가져오기 오류:', error);
          throw error;
        }
      },

      // 특정 채팅의 상세 내역을 가져오는 함수
      fetchChatHistory: async (userNo, chatHisNo) => {
        try {
          const response = await axios.get(`${SpringbaseUrl}/chat-history/recent-detail`, {
            params: { userNo, chatHisNo }
          });
          return response.data;
        } catch (error) {
          console.error('채팅 내역 가져오기 오류:', error);
          throw error;
        }
      },

      // 모든 최근 채팅을 가져오는 함수
      fetchRecentChatAll: async (userNo) => {
        try {
          console.log('Fetching recent chats for user:', userNo);
          const response = await axios.get(`${SpringbaseUrl}/chat-history/recent-all`, {
            params: { userNo }
          });
          console.log('Response:', response.data);
          return response.data;
        } catch (error) {
          console.error('Error fetching recent chats:', error);
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
    throw new Error('useRecentChatsApi는 RecentChatsProvider 내에서 사용되어야 합니다');
  }
  return context;
};
