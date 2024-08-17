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
    
    // 로딩 메시지 추가
    setMessages(prev => [...prev, { isLoading: true, isUser: false }]);
    
    try {
      const response = await AcademicChatBotData({
        input: text,
        session_id: String(userData.apiData.userID)
      });
      // 로딩 메시지 제거 후 실제 응답 추가
      setMessages(prev => prev.slice(0, -1).concat({ text: response.answer, isUser: false }));
    } catch (error) {
      setError(error);
      // 로딩 메시지 제거 후 에러 메시지 추가
      setMessages(prev => prev.slice(0, -1).concat({ text: "오류가 발생했습니다.", isUser: false }));
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, error, sendMessage };
};