import { useState, useEffect, useCallback, useRef } from 'react';
import { useChatMedicalApi } from '../../contexts/chatbot/ChatMedicalApi';
import { v4 as uuidv4 } from 'uuid';

export const useChatMedical = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sessionIdRef = useRef(localStorage.getItem('chatSessionId') || uuidv4());
  const isNewSessionRef = useRef(true);
  const { MedicalChatBotData, describeImage } = useChatMedicalApi();

  useEffect(() => {
    localStorage.setItem('chatSessionId', sessionIdRef.current);
  }, []);

  const sendMessage = useCallback(async (messageText) => {
    if (messageText.trim()) {
      setLoading(true);
      setError(null);
      const userMessage = { id: Date.now(), text: messageText, isUser: true };
      const loadingMessage = { id: Date.now() + 1, isLoading: true, isUser: false };
      
      setMessages(prevMessages => [...prevMessages, userMessage, loadingMessage]);

      try {
        const response = await MedicalChatBotData(messageText, sessionIdRef.current, isNewSessionRef.current);
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
        isNewSessionRef.current = false;  // 첫 메시지 이후로는 새 세션이 아님
      } catch (error) {
        console.error('Error sending message:', error);
        setError(error);
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === loadingMessage.id 
              ? { ...msg, isLoading: false, text: "Sorry, there was an error processing your message. Please try again." }
              : msg
          )
        );
      } finally {
        setLoading(false);
      }
    }
  }, [MedicalChatBotData]);

  const resetSession = useCallback(() => {
    sessionIdRef.current = uuidv4();
    isNewSessionRef.current = true;
    localStorage.setItem('chatSessionId', sessionIdRef.current);
    setMessages([]);
  }, []);

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
      console.error('Error sending image:', error);
      setError(error);
      let errorMessage = "Sorry, there was an error processing your image. Please try again.";
      if (error.response && error.response.data) {
        errorMessage += ` Details: ${error.response.data.detail || JSON.stringify(error.response.data)}`;
      }
      setMessages(prevMessages => [...prevMessages, { 
        id: Date.now() + 1, 
        text: errorMessage, 
        isUser: false 
      }]);
    } finally {
      setLoading(false);
    }
  }, [describeImage]);

  return { messages, loading, error, sendMessage, sendImage, resetSession };
};