import React from 'react';
import '../../assets/styles/chatbot/ChatMessage.css';

function ChatStudyMessage({ message }) {
  return (
    <div className={`message ${message.isUser ? 'user' : 'bot'}`}>
      {typeof message.text === 'object' ? JSON.stringify(message.text) : message.text}
    </div>
  );
}

export default ChatStudyMessage;