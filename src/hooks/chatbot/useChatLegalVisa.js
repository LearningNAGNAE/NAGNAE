import { useState, useCallback, useRef, useEffect } from 'react';
import { useChatLegalVisaApi } from '../../contexts/chatbot/ChatLegalVisaApi';
import { useRecentChatsApi } from '../../contexts/chatbot/ChatRecentApi';
import { v4 as uuidv4 } from 'uuid';

export const useChatLegalVisa = (initialSelectedChat, categoryNo) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sessionIdRef = useRef(localStorage.getItem('chatSessionId') || uuidv4());
  const isNewSessionRef = useRef(true);
  const currentChatHisNoRef = useRef(null);
  const legalVisaApi = useChatLegalVisaApi();
  const recentChatsApi = useRecentChatsApi();

  const [currentChatHisNo, setCurrentChatHisNo] = useState(null);
  const [isNewSession, setIsNewSession] = useState(true);

  const userData = JSON.parse(sessionStorage.getItem('userData'));

  // 채팅 기록 로드
  const loadChatHistory = useCallback(async (chatHisNo) => {
    if (!chatHisNo) {
      console.error('chatHisNo is undefined');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      if (!userData || !userData.apiData || !userData.apiData.userno) {
        throw new Error('User data not found in session storage');
      }
      const userNo = userData.apiData.userno;
      const response = await recentChatsApi.fetchChatHistory(userNo, chatHisNo);
      console.log('Loaded chat history:', response);
      if (response && response.apiData) {
        const formattedMessages = response.apiData.flatMap(msg => {
          const messages = [];
          if (msg.question) {
            messages.push({
              id: `q-${msg.chatHisSeq}`,
              text: msg.question,
              isUser: true,
              detectedLanguage: msg.detectedLanguage
            });
          }
          if (msg.answer) {
            messages.push({
              id: `a-${msg.chatHisSeq}`,
              text: msg.answer,
              isUser: false,
              detectedLanguage: msg.detectedLanguage
            });
          }
          return messages;
        });
        setMessages(formattedMessages);
      }
    } catch (err) {
      console.error('채팅 내역을 불러오는 중 오류 발생:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [recentChatsApi]);

  useEffect(() => {
    if (initialSelectedChat && initialSelectedChat.chatHisNo) {
      setCurrentChatHisNo(initialSelectedChat.chatHisNo);
      setIsNewSession(false);
      loadChatHistory(initialSelectedChat.chatHisNo);
    } else {
      setMessages([]);
      setCurrentChatHisNo(null);
      setIsNewSession(true);
    }
  }, [initialSelectedChat, loadChatHistory]);

  // 메시지 전송
  const sendMessage = useCallback(async (messageText) => {
    if (messageText.trim()) {
      setLoading(true);
      setError(null);
      const userMessage = { id: Date.now(), text: messageText, isUser: true };
      const loadingMessage = { id: Date.now() + 1, isLoading: true, isUser: false };
      
      setMessages(prevMessages => [...prevMessages, userMessage, loadingMessage]);

      try {
        const requestData = {
          question: messageText,
          userNo: userData.apiData.userno,
          categoryNo: categoryNo,
          session_id: sessionIdRef.current,
          is_new_session: isNewSession,
          chat_his_no: currentChatHisNo
        };
        console.log("Sending request data:", requestData);
        const response = await legalVisaApi.LegalVisaChatBotData(requestData);

        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === loadingMessage.id
              ? {
                  ...msg,
                  isLoading: false,
                  text: response.answer,
                  detectedLanguage: response.detected_language
                }
              : msg
          )
        );
        
        setCurrentChatHisNo(response.chatHisNo);
        setIsNewSession(false);

        isNewSessionRef.current = false;
        currentChatHisNoRef.current = response.chatHisNo || currentChatHisNoRef.current;
      } catch (error) {
        console.error('메시지 전송 중 오류 발생:', error);
        setError(error);
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === loadingMessage.id
              ? { ...msg, isLoading: false, text: "죄송합니다, 메시지 처리 중 오류가 발생했습니다. 다시 시도해 주세요." }
              : msg
          )
        );
      } finally {
        setLoading(false);
      }
    }
  }, [legalVisaApi, currentChatHisNo, isNewSession, categoryNo, userData]);

  return {
    messages,
    setMessages,
    loading,
    error,
    sendMessage,
    loadChatHistory
  };
};