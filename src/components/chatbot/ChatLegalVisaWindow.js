import React from 'react';
import { useChatLegalVisa } from '../../hooks/chatbot/useChatLegalVisa';
import { useScrollToBottom, useMessageInput } from '../../hooks/chatbot/useScrollToBottom';
import ChatMessage from './ChatLegalVisaMessage';
import '../../assets/styles/chatbot/ChatWindow.css';
import uploadIcon from '../../assets/images/free-icon-grab.png';
import sendIcon from '../../assets/images/send.png';
import RecordModal from './RecordModal';
import { ChatLegalVisaProvider } from '../../contexts/chatbot/ChatLegalVisaApi';

function ChatLegalVisaWindowInner() {
  const { messages, loading, error, sendMessage, sendImage } = useChatLegalVisa();
  const messagesContainerRef = useScrollToBottom([messages]);
  const { input, setInput, handleSubmit, handleKeyPress } = useMessageInput(sendMessage);

  const handleRecordingComplete = (blob) => {
    console.log('Recording completed', blob);
    // TODO: Implement audio processing logic
  };

  const handleAudioSend = (data) => {
    console.log('Audio data', data);
    // TODO: Implement audio sending logic
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      try {
        await sendImage(file);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.error('Invalid file type. Please upload an image.');
    }
  };

  return (
    <div className="chat-window">
      <div className="messages" ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
      <div className='wrap-form-box'>
        <form onSubmit={handleSubmit} className='form-box'>
          <div className='modal_input_btn'>
            <RecordModal 
              onRecordingComplete={handleRecordingComplete}
              onAudioSend={handleAudioSend}
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
          <button className='send-btn' type="submit" disabled={!input.trim()}>
            <img src={sendIcon} alt="Send" className="window-send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

function ChatLegalVisaWindow() {
  return (
    <ChatLegalVisaProvider>
      <ChatLegalVisaWindowInner />
    </ChatLegalVisaProvider>
  );
}

export default ChatLegalVisaWindow;