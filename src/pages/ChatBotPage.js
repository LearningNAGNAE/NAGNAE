import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Sidebar from '../components/chatbot/Sidebar';
import '../assets/styles/chatbot/ChatBotPage.css';
import { RecentChatsProvider } from '../contexts/chatbot/ChatRecentApi';
import { ChatLegalVisaProvider } from '../contexts/chatbot/ChatLegalVisaApi';

function ChatBotPage() {
  const handleChatSelect = (chatData) => {
    console.log("Selected chat in ChatBotPage:", chatData);
    // 여기에서 선택된 채팅 데이터를 처리하는 로직을 추가할 수 있습니다.
  };

  return (
    <ChakraProvider>
      <RecentChatsProvider>
        <ChatLegalVisaProvider>
          <div className="main-content">
            <div className="chatbot-contents">
              <Sidebar onSelectChat={handleChatSelect} />
            </div>
          </div>
        </ChatLegalVisaProvider>
      </RecentChatsProvider>
    </ChakraProvider>
  );
}

export default ChatBotPage;