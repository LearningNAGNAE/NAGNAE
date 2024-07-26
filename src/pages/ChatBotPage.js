import React from 'react'
import Sidebar from '../components/chatbot/Sidebar';
import '../assets/styles/chatbot/ChatBotPage.css';

function ChatBotPage() {
  return (
    <div className="main-content">
      <div className="chatbot-contents">
        <Sidebar />
      </div>
    </div>
  )
}

export default ChatBotPage