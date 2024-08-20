import React, { useEffect } from 'react';
import { useRecentAll } from '../../hooks/chatbot/useRecentAll';
import '../../assets/styles/chatbot/ChatList.css';

export const ChatHistoryContent = () => {
  const { recentChats, loading, error, fetchChats } = useRecentAll();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error.message}</div>;

  return (
    <div className='chat-historyList-all'>
      <div className="chat-historyList">
        <h2>Your chat history</h2>
        <p>You have {recentChats.length} previous chats with Claude </p>
        {recentChats.length > 0 ? (
          <div className="chat-list">
            {recentChats.map((chat, index) => (
              <div key={index} className="chat-item">
                <h3>{chat.question || 'Untitled'}</h3> {/* 링크달고 싶으면 여기에요 */}
                <p>Last message {chat.lastMessage}</p>
              </div>
            ))}
          </div>
          ) : (
            <p>최근 채팅 내역이 없습니다.</p>
          )}
      </div>
    </div>
  );
};

export default ChatHistoryContent;