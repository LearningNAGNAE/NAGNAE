import React from 'react';
import '../../assets/styles/chatbot/ChatMessage.css';
import userIcon from '../../assets/images/user.png';
import botIcon from '../../assets/images/chatbot.png';
import DOMPurify from 'dompurify';

// 텍스트 포맷팅 함수
const formatText = (text) => {
  if (typeof text !== 'string') return text;

  // 마크다운 태그를 HTML로 변환
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />');
};

function ChatLawMessage({ message }) {
  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const userIconStyle = {
    backgroundImage: `url(${userIcon})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '30px 30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#775A45',
  };

  const botIconStyle = {
    width: '55px',
    height: '55px',
    objectFit: 'contain',
  };

  // 스트리밍 중일 때 텍스트 포맷팅
  const formattedText = formatText(message.text);

  return (
    <div className={`message-container ${message.isUser ? 'user' : 'bot'}`}>
      {message.isUser ? (
        <div className="message-icon user-icon" style={userIconStyle} />
      ) : (
        <img 
          src={botIcon} 
          alt="Bot" 
          className="message-icon bot-icon" 
          style={botIconStyle}
        />
      )}
      <div className={`message ${message.isUser ? 'user' : 'bot'}`}>
        {message.image && (
          <div className="message-image-container">
            <img src={message.image} alt="Uploaded" className="message-image" />
          </div>
        )}
        {message.isLoading ? (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={createMarkup(formattedText)} />
        )}
      </div>
    </div>
  );
}

export default ChatLawMessage;
