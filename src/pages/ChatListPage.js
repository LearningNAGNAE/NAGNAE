import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RecentChatsProvider } from '../contexts/chatbot/ChatRecentApi';
import { ChatHistoryContent } from '../components/chatbot/ChatList';

function ChatListPage() {
  const navigate = useNavigate();

  const handleChatSelect = (selectedChatData) => {
    navigate('/ChatBotPage', {
      state: {
        selectedChat: selectedChatData,
        categoryNo: selectedChatData.categoryNo
      }
    });
  };

  return (
    <RecentChatsProvider>
      <ChatHistoryContent onChatSelect={handleChatSelect} />
    </RecentChatsProvider>
  );
}

export default ChatListPage;