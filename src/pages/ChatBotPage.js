import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/chatbot/Sidebar';
import '../assets/styles/chatbot/ChatBotPage.css';
import { RecentChatsProvider } from '../contexts/chatbot/ChatRecentApi';
import { ChatLegalVisaProvider } from '../contexts/chatbot/ChatLegalVisaApi';

function ChatBotPage() {
  const location = useLocation();
  const selectedChat = location.state?.selectedChat;

  const handleChatSelect = (chatData) => {
    console.log("Selected chat in ChatBotPage:", chatData);
  };

  return (
    <ChakraProvider>
      <RecentChatsProvider>
        <ChatLegalVisaProvider>
          <div className="main-content">
            <div className="chatbot-contents">
              <Sidebar onSelectChat={handleChatSelect} initialSelectedChat={selectedChat} />
            </div>
          </div>
        </ChatLegalVisaProvider>
      </RecentChatsProvider>
    </ChakraProvider>
  );
}

export default ChatBotPage;