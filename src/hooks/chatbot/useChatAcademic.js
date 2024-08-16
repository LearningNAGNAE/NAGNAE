import { useState, useContext } from 'react';
import { ChatAcademicApi } from '../../contexts/chatbot/ChatAcademicApi';

export const useChatAcademic = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { AcademicChatBotData } = useContext(ChatAcademicApi);
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  const sendMessage = async (text) => {
    setLoading(true);
    setError(null);
    setMessages(prev => [...prev, { text, isUser: true }]);
    
    try {
      const response = await AcademicChatBotData({
        input: text,
        session_id: String(userData.apiData.userID)
      });
      setMessages(prev => [...prev, { text: response.answer, isUser: false }]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
};