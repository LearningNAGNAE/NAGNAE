import React from 'react';
import { useRecentChats } from '../../hooks/chatbot/useRecent';
import '../../assets/styles/chatbot/ChatList.css';

export const ChatHistoryContent = ({ onChatSelect }) => {
  const { recentChatAll, loading, error } = useRecentChats();

  const handleChatClick = (chat) => {
    console.log('Selected chat:', chat);
    onChatSelect(chat);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='chat-historyList-all'>
      <div className="chat-historyList">
        <h2 className="chat-historyList-title">Your chat history</h2>
        <p>You have {recentChatAll.length} previous chats with NAGNAE</p>
        {recentChatAll.length > 0 ? (
          <div className="chat-list">
            {recentChatAll.map((chat, index) => (
              <div key={index} className="chat-item" onClick={() => handleChatClick(chat)}>
                <h3>{chat.question || 'Untitled'}</h3>
                <p>Last message {chat.lastMessage}</p>
                {chat.isNew && <span className="new-badge">New</span>}
              </div>
            ))}
          </div>
        ) : (
          <p>No recent chat history.</p>
        )}
      </div>
    </div>
  );
};

export default ChatHistoryContent;