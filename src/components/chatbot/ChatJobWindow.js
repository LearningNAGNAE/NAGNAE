import React from 'react';
import ChatJobMessage from './ChatJobMessage';
import '../../assets/styles/chatbot/ChatWindow.css';
import { useScrollToBottom, useMessageInput } from '../../hooks/chatbot/useScrollToBottom';
import sendIcon from '../../assets/images/send.png';
import RecordModal from '../chatbot/RecordModal';
import { useChatJob } from '../../hooks/chatbot/useChatJob'; // useChatJob 훅 불러오기

function ChatJobWindow({ selectedChat, categoryNo, onChatComplete }) {
  const { messages, loading, error, sendMessage } = useChatJob(selectedChat, categoryNo);
  const messagesContainerRef = useScrollToBottom([messages]);
  const { input, setInput, handleKeyPress } = useMessageInput(sendMessage);

  const handleSendMessage = (messageText) => {
    sendMessage(messageText);
    setInput('');
    if (onChatComplete) onChatComplete();
  };


  return (
    <div className="chat-window">
      <div className="messages" ref={messagesContainerRef}>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <ChatJobMessage key={`msg-${index}`} message={message} />
          ))
        ) : (
          <p>Start a new conversation</p>
        )}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
      <div className='wrap-form-box'>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }} className='form-box'>
          <div className='modal_input_btn'>
            {/* <RecordModal
              onRecordingComplete={(blob) => console.log('Recording completed', blob)}
              onAudioSend={(data) => console.log('Audio data', data)}
            /> */}
            <input
              className='botinput'
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter a message..."
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

export default ChatJobWindow;
