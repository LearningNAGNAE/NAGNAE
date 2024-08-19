import React, { useEffect } from 'react';
import { useChatLegalVisa } from '../../hooks/chatbot/useChatLegalVisa';
import { useScrollToBottom, useMessageInput } from '../../hooks/chatbot/useScrollToBottom';
import ChatMessage from './ChatLegalVisaMessage';
import '../../assets/styles/chatbot/ChatWindow.css';
import sendIcon from '../../assets/images/send.png';
import RecordModal from './RecordModal';

function ChatLegalVisaWindow({ selectedChat }) {
  const { messages, loading, error, sendMessage, loadChatHistory } = useChatLegalVisa(selectedChat);
  const messagesContainerRef = useScrollToBottom([messages]);
  const { input, setInput, handleSubmit, handleKeyPress } = useMessageInput(sendMessage);

  useEffect(() => {
    if (selectedChat && selectedChat.length > 0 && selectedChat[0].chatHisNo) {
      loadChatHistory(selectedChat[0].chatHisNo);
    }
  }, [selectedChat, loadChatHistory]);

  const handleSendMessage = (messageText) => {
    sendMessage(messageText);
    setInput('');
  };

  return (
    <div className="chat-window">
      <div className="messages" ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <ChatMessage key={`msg-${index}`} message={message} />
        ))}
        {loading && <p>로딩 중...</p>}
        {error && <p>오류: {error.message}</p>}
      </div>
      <div className='wrap-form-box'>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }} className='form-box'>
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
              placeholder="메시지를 입력하세요..."
            />
          </div>
          <button className='send-btn' type="submit" disabled={!input.trim()}>
            <img src={sendIcon} alt="Send" className="window-send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatLegalVisaWindow;