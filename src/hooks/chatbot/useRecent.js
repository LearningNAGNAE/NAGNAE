import { useState, useEffect, useCallback } from 'react';
import { useRecentChatsApi } from '../../contexts/chatbot/ChatRecentApi';

export const useRecentChats = () => {
  const [recentChats, setRecentChats] = useState([]);
  const [recentChatAll, setRecentChatAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const api = useRecentChatsApi();

  const fetchChats = useCallback(async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      if (!userData || !userData.apiData || !userData.apiData.userno) {
        throw new Error('User data not found in session storage');
      }
      const userNo = userData.apiData.userno;
      const response = await api.fetchRecentChatAll(userNo);
      console.log('Fetched chats:', response.apiData);
      setRecentChatAll(response.apiData);
    } catch (err) {
      console.error('Error fetching chats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // 최근 채팅 목록을 불러오는 함수
  const loadRecentChats = useCallback(async () => {
    if (!api) {
      setError('최근 채팅 API를 사용할 수 없습니다. 연결을 확인해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      if (!userData || !userData.apiData || !userData.apiData.userno) {
        throw new Error('세션 스토리지에서 사용자 데이터를 찾을 수 없습니다');
      }

      const userNo = userData.apiData.userno;
      const response = await api.fetchRecentChats(userNo);
      setRecentChats(response.apiData.map(chat => ({...chat, isNew: chat.isNew || false})));
    } catch (error) {
      console.error('최근 채팅 로딩 오류:', error);
      setError(error.message || '최근 채팅을 불러오는데 실패했습니다');
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    loadRecentChats();
  }, [loadRecentChats]);

  // 특정 채팅을 선택하는 함수
  const selectChat = useCallback(async (chatHisNo) => {
    if (!api) {
      setError('채팅 상세 API를 사용할 수 없습니다. 연결을 확인해주세요.');
      return null;
    }
 
    setLoading(true);
    setError(null);
 
    try {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      if (!userData || !userData.apiData || !userData.apiData.userno) {
        throw new Error('세션 스토리지에서 사용자 데이터를 찾을 수 없습니다');
      }
 
      const userNo = userData.apiData.userno;
      const chatDetails = await api.fetchChatHistory(userNo, chatHisNo);
      return chatDetails;
    } catch (error) {
      console.error('채팅 상세 정보 가져오기 오류:', error);
      setError(error.message || '채팅 상세 정보를 가져오는데 실패했습니다');
      return null;
    } finally {
      setLoading(false);
    }
  }, [api]);

  return { recentChats, loading, error, selectChat, loadRecentChats, recentChatAll };
};