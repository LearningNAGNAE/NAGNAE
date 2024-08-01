import React, { useState } from 'react';
import ChatMessage from './ChatMedicalMessage';
import '../../assets/styles/chatbot/ChatWindow.css';
import uploadIcon from '../../assets/images/free-icon-grab.png'; // 이미지 파일 경로
import sendIcon from '../../assets/images/send.png'; // 이미지 파일 경로
import Record_Modal from '../chatbot/Record_Modal';
import axios from 'axios';

function ChatMedicalWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { id: messages.length + 1, text: input, isUser: true };
      setMessages([...messages, userMessage]);
      setInput('');

      try {
        // 백엔드로 메시지 전송 및 응답 처리
        const response = await axios.post('http://localhost:8000/medical', {
          input: input
        });
        // 봇 응답 메시지 추가
        const botMessage = { 
          id: messages.length + 2, 
          text: response.data.answer,
          isUser: false
        };
        console.log(response.data);
        console.log(response.data.answer);
        console.log(response.data.answer.answer);
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        // 오류 발생 시 에러 메시지 표시
        setMessages(prevMessages => [...prevMessages, { 
          id: messages.length + 2, 
          text: "Sorry, there was an error processing your request.", 
          isUser: false 
        }]);
      }
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

export default ChatMedicalWindow;