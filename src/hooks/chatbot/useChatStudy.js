import { useState, useContext } from 'react';
import { ChatStudyApi } from '../../contexts/chatbot/ChatStudyApi';

export const useChatStudy = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { StudyChatBotData } = useContext(ChatStudyApi);
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  const sendMessage = async (text) => {
    setLoading(true);
    setError(null);
    setMessages(prev => [...prev, { text, isUser: true }]);
    
    try {
      const response = await StudyChatBotData({
        input: text,
        session_id: String(userData.apiData.userID)
      });
      setMessages(prev => [...prev, { text: response.response, isUser: false }]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
};