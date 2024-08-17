import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatJobMessage';
import '../../assets/styles/chatbot/ChatWindow.css';
import sendIcon from '../../assets/images/send.png';
import RecordModal from '../chatbot/RecordModal';
import axios from 'axios'; // axios를 사용하여 HTTP 요청 전송

function ChatJobWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesContainerRef = useRef(null);

  /*-------------스크롤----------------*/
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };
  /*-----------------------------------*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
        const userMessage = { id: messages.length + 1, text: input, isUser: true };
        setMessages([...messages, userMessage]);
        setInput('');

        try {
            const formData = new FormData();
            formData.append('query', input);

            // 백엔드로 메시지 전송 및 응답 처리
            const response = await axios.post('http://localhost:8000/search_jobs', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            // 응답 데이터와 상태 코드 확인
            console.log('Response:', response.data); // 전체 응답 데이터
            console.log('Status:', response.status); // 상태 코드

            // 응답에서 output을 추출. 사용자 메시지와 봇 메시지를 각각 고유한 ID로 구분
            const botMessage = { id: messages.length + 2, text: response.data.response, isUser: false };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error.response ? error.response.data : error.message);
            setMessages([...messages, userMessage, { id: messages.length + 2, text: "Sorry, there was an error processing your request.", isUser: false }]);
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
      <div className="messages" ref={messagesContainerRef}>
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <div className='wrap-form-box'>
        <form onSubmit={handleSubmit} className='form-box'>
          
          <div className='modal_input_btn'>
            <RecordModal 
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
