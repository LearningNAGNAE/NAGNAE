import { useState, useCallback } from 'react';
import axios from 'axios';

export const useChatJob = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (messageText) => {
    if (messageText.trim()) {
      setLoading(true);
      const userMessage = { id: Date.now(), text: messageText, isUser: true };
      const loadingMessage = { id: Date.now() + 1, text: 'Loading...', isUser: false, isLoading: true };

      setMessages(prevMessages => [...prevMessages, userMessage, loadingMessage]);

      try {
        const formData = new FormData();
        formData.append('query', messageText);

        const response = await axios.post('http://localhost:8000/search_jobs', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === loadingMessage.id
              ? { ...msg, text: response.data.response, isLoading: false }
              : msg
          )
        );
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === loadingMessage.id
              ? { ...msg, text: 'Sorry, there was an error processing your request.', isLoading: false }
              : msg
          )
        );
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return {
    messages,
    sendMessage,
    loading,
  };
};
