import React from 'react';
import '../../assets/styles/chatbot/ChatMessage.css';
import userIcon from '../../assets/images/user.png';
import botIcon from '../../assets/images/chatbot.png';

function ChatStudyMessage({ message }) {
  const formatText = (text) => {
    if (typeof text === 'string') {
      try {
        const jsonObject = JSON.parse(text);
        if (jsonObject.output) {
          text = jsonObject.output;
        }
      } catch (e) {
        // JSON 파싱에 실패하면 원래 텍스트를 그대로 사용
      }
    } else if (typeof text === 'object' && text.output) {
      text = text.output;
    }
  
    if (typeof text !== 'string') return JSON.stringify(text);
  
    const lines = text.split('\n');
  
    return lines.map((line, lineIndex) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={`${lineIndex}-${partIndex}`}>{part.slice(2, -2)}</strong>;
        }
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
        {formatText(message.text)}
      </div>
    </div>
  );
}

export default ChatStudyMessage;