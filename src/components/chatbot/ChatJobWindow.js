import React, { useState } from 'react';
import ChatMessage from './ChatJobMessage';
import '../../assets/styles/chatbot/ChatWindow.css';
import uploadIcon from '../../assets/images/free-icon-grab.png'; // 이미지 파일 경로
import sendIcon from '../../assets/images/send.png'; // 이미지 파일 경로
import Record_Modal from '../chatbot/Record_Modal';

function ChatJobWindow() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Có thể lập hợp đồng lao động chỉ bằng tiếng Hàn không?", isUser: true },
    { id: 2, text: "Yêu cầu pháp lý: Theo luật lao động Hàn Quốc, không bắt buộc phải lập hợp đồng bằng tiếng nước ngoài. Tuy nhiên, để bảo vệ quyền lợi của người lao động nước ngoài, việc này được khuyến khích mạnh mẽ.", isUser: false },
    { id: 3, text: "Có thể lập hợp đồng lao động chỉ bằng tiếng Hàn không?", isUser: true },
    { id: 4, text: "2?", isUser: true },
    { id: 5, text: "5?", isUser: true },
  ]);

  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: input, isUser: true }]);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
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
              placeholder="Type a message..."
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

export default ChatJobWindow;