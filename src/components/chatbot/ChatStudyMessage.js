import React from 'react';
import '../../assets/styles/chatbot/ChatMessage.css';
import userIcon from '../../assets/images/free_user.png'; // 사용자 아이콘 이미지 경로
import botIcon from '../../assets/images/free-lock.png'; // 봇 아이콘 이미지 경로

function ChatStudyMessage({ message }) {
  return (
    <div className={`message-container ${message.isUser ? 'user' : 'bot'}`}>
      {message.isUser ? (
        <img src={userIcon} alt="User" className="user-icon" />
      ) : (
        <img src={botIcon} alt="Bot" className="bot-icon" />
      )}
      <div className={`message ${message.isUser ? 'user' : 'bot'}`}>
        {typeof message.text === 'object' ? JSON.stringify(message.text) : message.text}
      </div>
    </div>
  );
}

export default ChatStudyMessage;