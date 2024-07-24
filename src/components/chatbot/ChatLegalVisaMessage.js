import React from 'react';

function ChatLegalVisaMessage({ message }) {
  return (
    <div className={`message ${message.isUser ? 'user' : 'bot'}`}>
      {message.text}
    </div>
  );
}

export default ChatLegalVisaMessage;