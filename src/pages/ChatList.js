import React from 'react';
import '../assets/styles/chatbot/ChatList.css';

const ChatHistory = () => {
  const chats = [
    { title: "React Component Structure for Post List", lastMessage: "16시간 전" },
    { title: "Quill.Js Image Insertion Error", lastMessage: "20시간 전" },
    { title: "Optimizing Image Upload in React Quill Editor", lastMessage: "1일 전" },
    { title: "Untitled", lastMessage: "3일 전" },
    { title: "How to Use quill-image-resize-module", lastMessage: "3일 전" },
    { title: "Optimizing AI Model Response Time", lastMessage: "3일 전" },
    { title: "Optimizing Fine-Tuned Model Accuracy", lastMessage: "5일 전" },
  ];

  return (
    <div className="chat-history">
      <h1>Claude</h1>
      <h2>Your chat history</h2>
      <p>You have 50 previous chats with Claude </p>
      <div className="chat-list">
        {chats.map((chat, index) => (
          <div key={index} className="chat-item">
            <h3>{chat.title}</h3>
            <p>Last message {chat.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;