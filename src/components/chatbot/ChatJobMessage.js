import React from 'react';
import '../../assets/styles/chatbot/ChatMessage.css';
import userIcon from '../../assets/images/user.png';
import botIcon from '../../assets/images/chatbot.png';

function ChatJobMessage({ message }) {
  // 텍스트 내 URL을 감지하고, 링크 요소로 변환하는 함수
  const formatText = (text) => {
    if (typeof text !== 'string') return JSON.stringify(text);

    const urlPattern = /(https?:\/\/[^\s]+)/g;  // URL을 감지하는 정규식
    const lines = text.split('\n');

    return lines.map((line, lineIndex) => {
      const parts = line.split(/(\*\*.*?\*\*|\bhttps?:\/\/[^\s]+\b)/g); // 링크와 굵은 텍스트를 감지
      const formattedLine = parts.map((part, partIndex) => {
        
        // **텍스트**를 굵은 텍스트로 변환
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={`${lineIndex}-${partIndex}`}>{part.slice(2, -2)}</strong>;
        }

        // URL을 링크로 변환
        if (urlPattern.test(part)) {
          return (
            <a className = "job-link" key={`${lineIndex}-${partIndex}`} href={part} target="_blank" rel="noopener noreferrer">
              {part}
            </a>
          );
        }

        // 다른 부분은 그대로 반환
        return part;
      });

      return (
        <React.Fragment key={lineIndex}>
          {formattedLine}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
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
        {message.isLoading ? (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          message.text && formatText(message.text)
        )}
      </div>
    </div>
  );
}


export default ChatJobMessage;