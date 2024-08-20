import { useState, useCallback } from 'react';
import { useRecentChatsApi } from '../../contexts/chatbot/ChatRecentApi';

export const useRecentAll = () => {
    const [recentChats, setRecentChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const api = useRecentChatsApi();
  
    const fetchChats = useCallback(async () => {
      if (!api || typeof api.fetchRecentChatAll !== 'function') {
        console.error('fetchRecentChatAll is not available or not a function');
        setError(new Error('API 함수를 불러올 수 없습니다.'));
        return;
      }
  
      setLoading(true);
      setError(null);
      try {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        if (!userData || !userData.apiData || !userData.apiData.userno) {
          throw new Error('사용자 정보를 찾을 수 없습니다.');
        }
        const response = await api.fetchRecentChatAll(userData.apiData.userno);
        console.log('API response:', response); // 응답 로깅
        // 응답 구조에 따라 적절히 처리
        const chats = Array.isArray(response.apiData) ? response.apiData : [];
        setRecentChats(chats);
      } catch (err) {
        console.error('Error fetching chats:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }, [api]);
  
    return { recentChats, loading, error, fetchChats };
  };