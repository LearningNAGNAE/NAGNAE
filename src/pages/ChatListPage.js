import { RecentChatsProvider } from '../contexts/chatbot/ChatRecentApi';
import { ChatHistoryContent } from '../components/chatbot/ChatList';

function ChatListPage() {
    return (
      <RecentChatsProvider>
        <ChatHistoryContent />
      </RecentChatsProvider>
    );
  };
  
  export default ChatListPage;