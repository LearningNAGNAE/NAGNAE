import React from 'react';
import { useChatAcademic } from '../../hooks/chatbot/useChatAcademic';
import { useScrollToBottom, useMessageInput } from '../../hooks/chatbot/useScrollToBottom';
import ChatAcademicMessage from './ChatAcademicMessage';
import '../../assets/styles/chatbot/ChatWindow.css';
import sendIcon from '../../assets/images/send.png';
import RecordModal from './RecordModal';

function ChatAcademicWindow() {
  const { messages, loading, error, sendMessage } = useChatAcademic();
  const messagesContainerRef = useScrollToBottom([messages]);
  const { input, setInput, handleSubmit, handleKeyPress } = useMessageInput(sendMessage);

  // const userData = JSON.parse(sessionStorage.getItem('userData'));

  return (
    <div className="chat-window">
      <div className="messages" ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <ChatAcademicMessage key={index} message={message} />
        ))}
        {loading && <p>로딩 중...</p>}
        {error && <p>에러 발생: {error.message}</p>}
      </div>
      <div className='wrap-form-box'>
        <form onSubmit={handleSubmit} className='form-box'>
          <div className='modal_input_btn'>
            <RecordModal 
              onRecordingComplete={(blob) => console.log('Recording completed', blob)}
              onAudioSend={(data) => console.log('Audio data', data)}
            />
            {/* <div>test: ============={userData.apiData.userName}</div> */}
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

export default ChatAcademicWindow;