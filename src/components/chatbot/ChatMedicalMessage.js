import React from 'react';
import '../../assets/styles/chatbot/ChatMessage.css';

function ChatLegalVisaMessage({ message }) {
  return (
    <div className={`message ${message.isUser ? 'user' : 'bot'}`}>
      {message.text}
      {!message.isUser && message.detectedLanguage && (
        <div className="detected-language">
          Detected Language: {message.detectedLanguage}
        </div>
      )}
    </div>
  );
}

export default ChatLegalVisaMessage;