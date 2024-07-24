import React, { useState } from 'react';
import ChatMessage from './ChatEmploymentMessage';

function ChatEmploymentWindow() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Có thể lập hợp đồng lao động chỉ bằng tiếng Hàn không?", isUser: true },
    { id: 2, text: "Yêu cầu pháp lý: Theo luật lao động Hàn Quốc, không bắt buộc phải lập hợp đồng bằng tiếng nước ngoài. Tuy nhiên, để bảo vệ quyền lợi của người lao động nước ngoài, việc này được khuyến khích mạnh mẽ.", isUser: false },
    { id: 3, text: "Có thể lập hợp đồng lao động chỉ bằng tiếng Hàn không?", isUser: true },
  ]);

  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: input, isUser: true }]);
      setInput('');
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatEmploymentWindow;