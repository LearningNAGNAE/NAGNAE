import React, { useState } from 'react';
import Sidebar from '../components/chatbot/Sidebar';
import LegalVisaChatWindow from '../components/chatbot/ChatLegalVisaWindow';
// import MedicalChatWindow from '../components/chatbot/ChatMedicalWindow';
// import AcademicChatWindow from '../components/chatbot/ChatStudyWindow';
// import EmploymentChatWindow from '../components/chatbot/ChatJobWindow';
import '../assets/styles/chatbot/ChatBotPage.css';
import { RecentChatsProvider } from '../contexts/chatbot/ChatRecentApi';
import { ChatLegalVisaProvider } from '../contexts/chatbot/ChatLegalVisaApi'; // ChatLegalVisaProvider import 추가

function ChatBotPage() {
  const [selectedChat, setSelectedChat] = useState(null);

  // 채팅 선택 핸들러
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <RecentChatsProvider>
      <ChatLegalVisaProvider> {/* ChatLegalVisaProvider 추가 */}
        <div className="main-content">
          <div className="chatbot-contents">
            <Sidebar onSelectChat={handleChatSelect} />
            {/* <LegalVisaChatWindow selectedChat={selectedChat} /> */}
            {/* <MedicalChatWindow selectedChat={selectedChat} />
            <AcademicChatWindow selectedChat={selectedChat} />
            <EmploymentChatWindow selectedChat={selectedChat} /> */}
          </div>
        </div>
      </ChatLegalVisaProvider>
    </RecentChatsProvider>
  );
}

export default ChatBotPage;