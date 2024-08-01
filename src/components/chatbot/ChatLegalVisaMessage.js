import React from 'react';
import '../../assets/styles/chatbot/ChatMessage.css';
import userIcon from '../../assets/images/user.png';
import botIcon from '../../assets/images/chatbot.png';

function ChatLegalVisaMessage({ message }) {
  const formatText = (text) => {
    if (typeof text !== 'string') return JSON.stringify(text);

    // 텍스트를 줄바꿈 문자를 기준으로 분리하여 배열로 만듦
    const lines = text.split('\n');

    return lines.map((line, lineIndex) => {
      // 각 줄을 '**'로 둘러싸인 부분을 기준으로 분리
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, partIndex) => {
        // '**'로 시작하고 끝나는 부분을 <strong> 태그로 감싸기
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={`${lineIndex}-${partIndex}`}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        // 각 줄을 React Fragment로 감싸고, 마지막 줄이 아니면 <br /> 추가
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
    width: '55px',  // 원하는 크기로 조정
    height: '55px', // 원하는 크기로 조정
    objectFit: 'contain', // 이미지 비율 유지
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

export default ChatLegalVisaMessage;