import React, { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/react';
import '../../assets/styles/chatbot/Sidebar.css';
import ChatLegalVisaWindow from '../chatbot/ChatLegalVisaWindow';
import ChatMedicalWindow from '../chatbot/ChatMedicalWindow';
import ChatAcademicWindow from '../chatbot/ChatAcademicWindow';
import ChatJobWindow from '../chatbot/ChatJobWindow';
import { ChatAcademicProvider } from '../../contexts/chatbot/ChatAcademicApi';
import { ChatLegalVisaProvider } from '../../contexts/chatbot/ChatLegalVisaApi';
import categoryOneImage from '../../assets/images/category1.png';
import categoryTwoImage from '../../assets/images/category2.png';
import categoryThreeImage from '../../assets/images/category3.png';
import categoryFourImage from '../../assets/images/category4.png';
import { useRecentChats } from '../../hooks/chatbot/useRecent';
import { Link } from 'react-router-dom';

function Sidebar({ onSelectChat, initialSelectedChat }) {
  const { recentChats, error, loadRecentChats } = useRecentChats();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    loadRecentChats();
  }, [loadRecentChats]);

  useEffect(() => {
    if (initialSelectedChat) {
      console.log('Initial selected chat in Sidebar:', initialSelectedChat);
      setSelectedChat(initialSelectedChat);
      setSelectedTab(initialSelectedChat.categoryNo - 6);
      onSelectChat(initialSelectedChat);
    }
  }, [initialSelectedChat, onSelectChat]);

  const handleChatSelect = async (chat) => {
    if (chat && chat.chatHisNo) {
      console.log('Selecting chat:', chat);
      setSelectedChat(chat);
      setSelectedTab(chat.categoryNo - 6);
      onSelectChat(chat);
    }
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
    setSelectedChat(null); // 새로운 채팅을 시작하기 위해 선택된 채팅을 초기화합니다.
    onSelectChat(null); // 부모 컴포넌트에 새로운 채팅 시작을 알립니다.
  };

  const handleViewAll = () => {
    console.log("View all clicked");
  };

  const handleNewChat = () => {
    setSelectedChat(null);
    onSelectChat(null);
  };

  return (
    <aside>
      <div className="category-header">
        <h2 className='category'>Category</h2>
        <button className='new-chat' onClick={handleNewChat}>+ New</button>
      </div>
      <Tabs orientation='vertical' variant='unstyled' index={selectedTab} onChange={handleTabChange}>   
        <Flex direction={["column", "row"]} height={["auto", "300px"]}>
          <TabList width={["100%", "220px"]} marginRight={["0", "50px"]} marginBottom={["20px", "0"]}>
            <Tab 
              display="flex" 
              justifyContent="start" 
              height="90px" 
              paddingLeft="0px" 
              textAlign="left" 
              color="white" 
              borderBottom="1px solid white"
              _selected={{ bg: 'rgba(255, 255, 255, 0.2)', fontWeight: 'bold' }}
              _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
              transition="background-color 0.3s"
            >
              <img src={categoryOneImage} alt="Legal and Visa" className="image-class" />
              Multilingual Legal / Visa Assistant
            </Tab>
            <Tab 
              display="flex" 
              justifyContent="start" 
              height="90px" 
              paddingLeft="0px" 
              textAlign="left" 
              color="white" 
              borderBottom="1px solid white"
              _selected={{ bg: 'rgba(255, 255, 255, 0.2)', fontWeight: 'bold' }}
              _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
              transition="background-color 0.3s"
            >
              <img src={categoryTwoImage} alt="Medical" className="image-class" />
              Medical Information / Health Consultation Service
            </Tab>
            <Tab 
              display="flex" 
              justifyContent="start" 
              height="90px" 
              paddingLeft="0px" 
              textAlign="left" 
              color="white" 
              borderBottom="1px solid white"
              _selected={{ bg: 'rgba(255, 255, 255, 0.2)', fontWeight: 'bold' }}
              _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
              transition="background-color 0.3s"
            >
              <img src={categoryFourImage} alt="Academic" className="image-class" />
              Academic Service
            </Tab>
            <Tab 
              display="flex" 
              justifyContent="start" 
              height="90px" 
              paddingLeft="0px" 
              textAlign="left" 
              color="white" 
              borderBottom="1px solid white"
              _selected={{ bg: 'rgba(255, 255, 255, 0.2)', fontWeight: 'bold' }}
              _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
              transition="background-color 0.3s"
            >
              <img src={categoryThreeImage} alt="Employment" className="image-class" />
              Employment Service
            </Tab>
          </TabList>
          <TabPanels flex={1} width={["100%", "auto"]}>
            <TabPanel 
              display="flex" 
              minWidth={["100%", "200px", "1280px"]} 
              height={["auto", "670px"]} 
              position="relative" 
              bottom={["0", "95px"]} 
              border="1px solid #554235" 
              borderRadius="20px"
              overflowX="auto"
              backgroundColor='#BA9F8B'
            >
              <ChatLegalVisaProvider>
                <ChatLegalVisaWindow 
                  key={selectedChat ? selectedChat.chatHisNo : `new-chat-${selectedTab}`} 
                  selectedChat={selectedChat} 
                  categoryNo={selectedTab + 6}
                  onChatComplete={loadRecentChats} 
                />
              </ChatLegalVisaProvider>
            </TabPanel>
            <TabPanel 
              display="flex" 
              minWidth={["100%", "300px", "1280px"]} 
              height={["auto", "670px"]} 
              position="relative" 
              bottom={["0", "95px"]} 
              border="1px solid #554235" 
              borderRadius="20px"
              overflowX="auto"
              backgroundColor='#BA9F8B'
            >
              {/* ChatMedicalProvider */}
              <ChatMedicalWindow />
            </TabPanel>
            <TabPanel 
              display="flex" 
              minWidth={["100%", "300px", "1280px"]} 
              height={["auto", "670px"]} 
              position="relative" 
              bottom={["0", "95px"]} 
              border="1px solid #554235" 
              borderRadius="20px"
              overflowX="auto"
              backgroundColor='#BA9F8B'
            >
              <ChatAcademicProvider>
                <ChatAcademicWindow selectedChat={selectedChat} onChatComplete={loadRecentChats}/>
              </ChatAcademicProvider>
            </TabPanel>
            <TabPanel 
              display="flex" 
              minWidth={["100%", "300px", "1280px"]} 
              height={["auto", "670px"]} 
              position="relative" 
              bottom={["0", "95px"]} 
              border="1px solid #554235" 
              borderRadius="20px"
              overflowX="auto"
              backgroundColor='#BA9F8B'
            >
              {/* ChatJobProvider */}
              <ChatJobWindow />
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
      <h2 className='recent'>
        Recent
        <Link className='view_all' to="/ChatListPage" onClick={handleViewAll}>
          view all  ---→
        </Link>
      </h2>
     
      {error && <p>오류: {error}</p>}
     
      {recentChats && recentChats.length > 0 ? (
        <ul className='recent-ul'>
          {recentChats.slice(0, 3).map((chat) => (
            <li key={chat.chatHisNo} onClick={() => handleChatSelect(chat)}>
              {chat.question}
              {chat.isNew && <span className="new-badge">New</span>}
            </li>
          ))}
        </ul>
      ) : (
        <div className='recent-ul-no'>
          <p>최근 채팅 내역이 없습니다.</p>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;