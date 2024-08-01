import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatLegalVisaMessage';
import '../../assets/styles/chatbot/ChatWindow.css';
import uploadIcon from '../../assets/images/free-icon-grab.png';
import sendIcon from '../../assets/images/send.png';
import Record_Modal from './Record_Modal';
import axios from 'axios';

function ChatLegalVisaWindow() {
  // 상태 관리: 메시지 목록, 입력값, 세션 ID
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState('');
  const messagesContainerRef = useRef(null); //스크롤

  useEffect(() => {
    // 컴포넌트 마운트 시 세션 ID 생성
    setSessionId(Math.random().toString(36).substring(7));
  }, []);

  // ---스크롤 ---
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  // -------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      // 사용자 메시지 추가
      const userMessage = { id: messages.length + 1, text: input, isUser: true };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      try {
        // 백엔드로 메시지 전송 및 응답 처리
        const response = await axios.post('http://localhost:8000/law', {
          question: input,
          session_id: sessionId
        });
        // 봇 응답 메시지 추가
        const botMessage = { 
          id: messages.length + 2, 
          text: response.data.answer, 
          isUser: false,
          detectedLanguage: response.data.detected_language
        };
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

  // Enter 키 입력 시 메시지 전송
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  // 음성 녹음 완료 시 처리 함수
  const handleRecordingComplete = (blob) => {
    console.log('Recording completed', blob);
    // 음성 녹음 처리 로직 추가 필요
  };

  // 음성 데이터 전송 처리 함수
  const handleAudioSend = (data) => {
    console.log('Audio data', data);
    // 음성 데이터 전송 로직 추가 필요
  };

  return (
    <div className="chat-window">
      {/* 메시지 목록 표시 영역 */}
      <div className="messages" ref={messagesContainerRef}>
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      {/* 메시지 입력 및 전송 폼 */}
      <div className='wrap-form-box'>
        <form onSubmit={handleSubmit} className='form-box'>
          {/* 파일 업로드 버튼 */}
          <div className='upload-box'>
            <label htmlFor="file-upload" className="custom-file-upload">
              <img src={uploadIcon} alt="Upload" className="window-upload-icon" />
            </label>
            <input id="file-upload" type="file" style={{display: 'none'}}/>
          </div>
          <div className='modal_input_btn'>
            {/* 음성 녹음 모달 컴포넌트 */}
            <Record_Modal 
              onRecordingComplete={handleRecordingComplete}
              onAudioSend={handleAudioSend}
            />
            {/* 텍스트 입력 필드 */}
            <input 
              className='botinput'
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
            />
          </div>
          {/* 메시지 전송 버튼 */}
          <button className='send-btn' type="submit">
            <img src={sendIcon} alt="Send" className="window-send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatLegalVisaWindow;