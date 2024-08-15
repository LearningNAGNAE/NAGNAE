import React from 'react';
import { useChatMedical } from '../../hooks/chatbot/useChatMedical';
import { useScrollToBottom, useMessageInput } from '../../hooks/chatbot/useScrollToBottom';
import ChatMessage from './ChatMedicalMessage';
import '../../assets/styles/chatbot/ChatWindow.css';
import uploadIcon from '../../assets/images/free-icon-grab.png';
import sendIcon from '../../assets/images/send.png';
import Record_Modal from './Record_Modal';
import { ChatMedicalProvider } from '../../contexts/chatbot/ChatMedicalApi';

function ChatMedicalWindowInner() {
  const { messages, loading, error, sendMessage, sendImage } = useChatMedical();
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
            <Record_Modal 
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

function ChatMedicalWindow() {
  return (
    <ChatMedicalProvider>
      <ChatMedicalWindowInner />
    </ChatMedicalProvider>
  );
}

export default ChatMedicalWindow;