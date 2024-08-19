import { useState, useEffect, useCallback, useRef } from 'react';
import { useChatLegalVisaApi } from '../../contexts/chatbot/ChatLegalVisaApi';
import { v4 as uuidv4 } from 'uuid';

export const useChatLegalVisa = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sessionIdRef = useRef(localStorage.getItem('chatSessionId') || uuidv4());
  const isNewSessionRef = useRef(true);
  const { LegalVisaChatBotData, describeImage, fetchChatHistory } = useChatLegalVisaApi();

  useEffect(() => {
    localStorage.setItem('chatSessionId', sessionIdRef.current);
  }, []);

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        setLoading(true);
        const chatHistory = await fetchChatHistory(sessionIdRef.current);
        setMessages(chatHistory);
      } catch (err) {
        console.error('채팅 내역을 불러오는 중 오류 발생:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadChatHistory();
  }, [fetchChatHistory]);

  const sendMessage = useCallback(async (messageText) => {
    if (messageText.trim()) {
      setLoading(true);
      setError(null);
      const userMessage = { id: Date.now(), text: messageText, isUser: true };
      const loadingMessage = { id: Date.now() + 1, isLoading: true, isUser: false };
      
      setMessages(prevMessages => [...prevMessages, userMessage, loadingMessage]);

      try {
        const response = await LegalVisaChatBotData(messageText, sessionIdRef.current, isNewSessionRef.current);
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
        isNewSessionRef.current = false;
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
  }, [LegalVisaChatBotData]);

  const sendImage = useCallback(async (imageFile) => {
    setLoading(true);
    setError(null);
    const userMessage = { id: Date.now(), image: URL.createObjectURL(imageFile), isUser: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      const response = await describeImage(imageFile);
      const botMessage = { 
        id: Date.now() + 1, 
        text: response.description, 
        isUser: false
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('이미지 전송 중 오류 발생:', error);
      setError(error);
      setMessages(prevMessages => [...prevMessages, { 
        id: Date.now() + 1, 
        text: "죄송합니다, 이미지 처리 중 오류가 발생했습니다. 다시 시도해 주세요.", 
        isUser: false 
      }]);
    } finally {
      setLoading(false);
    }
  }, [describeImage]);

  const resetSession = useCallback(() => {
    sessionIdRef.current = uuidv4();
    isNewSessionRef.current = true;
    localStorage.setItem('chatSessionId', sessionIdRef.current);
    setMessages([]);
  }, []);

  return { 
    messages, 
    setMessages,
    loading, 
    error, 
    sendMessage, 
    sendImage, 
    resetSession 
  };
};