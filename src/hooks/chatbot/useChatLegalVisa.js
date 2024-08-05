import { useState, useEffect, useCallback } from 'react';
import { useChatLegalVisaApi } from '../../contexts/chatbot/ChatLegalVisaApi';

export const useChatLegalVisa = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const { LegalVisaChatBotData, describeImage } = useChatLegalVisaApi();

  useEffect(() => {
    setSessionId(Math.random().toString(36).substring(7));
  }, []);

  const sendMessage = useCallback(async (messageText) => {
    if (messageText.trim()) {
      setLoading(true);
      setError(null);
      const userMessage = { id: Date.now(), text: messageText, isUser: true };
      const loadingMessage = { id: Date.now() + 1, isLoading: true, isUser: false };
      
      setMessages(prevMessages => [...prevMessages, userMessage, loadingMessage]);

      try {
        const response = await LegalVisaChatBotData({
          question: messageText,
          session_id: sessionId
        });
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
      } catch (error) {
        console.error('Error sending message:', error);
        setError(error);
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === loadingMessage.id 
              ? { ...msg, isLoading: false, text: "Sorry, there was an error processing your message." }
              : msg
          )
        );
      } finally {
        setLoading(false);
      }
    }
  }, [LegalVisaChatBotData, sessionId]);

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
      let errorMessage = "Sorry, there was an error processing your image.";
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

  return { messages, loading, error, sendMessage, sendImage };
};