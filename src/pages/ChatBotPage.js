import React from 'react'
import ChatWindow from '../components/ChatWindow';
import Sidebar from '../components/Sidebar';
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