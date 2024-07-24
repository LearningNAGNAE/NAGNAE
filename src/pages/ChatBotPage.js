import React from 'react'
import ChatWindow from '../components/chatbot/ChatLegalVisaWindow';
import Sidebar from '../components/chatbot/Sidebar';
import '../assets/styles/global.css';

function ChatBotPage() {
  return (
    <div className="main-content">
      <Sidebar />
      <ChatWindow />
    </div>
  )
}

export default ChatBotPage