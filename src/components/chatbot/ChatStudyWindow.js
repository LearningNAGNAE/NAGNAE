import React, { useState } from 'react';
import { useChatStudy } from '../../hooks/chatbot/useChatStudy';
import ChatStudyMessage from './ChatStudyMessage';
import '../../assets/styles/chatbot/ChatWindow.css';
import uploadIcon from '../../assets/images/free-icon-grab.png';
import sendIcon from '../../assets/images/send.png';
import Record_Modal from '../chatbot/Record_Modal';

function ChatStudyWindow() {
  const { messages, loading, error, sendMessage } = useChatStudy();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      sendMessage(input); // 변경된 부분
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message, index) => (
          <ChatStudyMessage key={index} message={message} />
        ))}
        {loading && <p>로딩 중...</p>}
        {error && <p>에러 발생: {error.message}</p>}
      </div>
      <div className='wrap-form-box'>
        <form onSubmit={handleSubmit} className='form-box'>
          <div className='upload-box'>
            <label htmlFor="file-upload" className="custom-file-upload">
              <img src={uploadIcon} alt="Upload" className="window-upload-icon" />
            </label>
            <input id="file-upload" type="file" style={{display: 'none'}}/>
          </div>
          <div className='modal_input_btn'>
            <Record_Modal 
              onRecordingComplete={(blob) => console.log('Recording completed', blob)}
              onAudioSend={(data) => console.log('Audio data', data)}
            />
            <input 
              className='botinput'
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={handleKeyPress}
              placeholder="질문을 입력하세요..."
            />
          </div>
          <button className='send-btn' type="submit">
            <img src={sendIcon} alt="Send" className="window-send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatStudyWindow;