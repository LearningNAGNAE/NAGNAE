import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/react'
import '../../assets/styles/chatbot/Sidebar.css';
import ChatLegalVisaWindow from '../chatbot/ChatLegalVisaWindow';
import ChatMedicalWindow from '../chatbot/ChatMedicalWindow';
import ChatStudyWindow from '../chatbot/ChatStudyWindow';
import ChatJobWindow from '../chatbot/ChatJobWindow';
import { ChatStudyProvider } from '../../contexts/chatbot/ChatStudyApi';
import categoryOneImage from '../../assets/images/category1.png';
import categoryTwoImage from '../../assets/images/category2.png';
import categoryThreeImage from '../../assets/images/category3.png';
import categoryFourImage from '../../assets/images/category4.png';
import { useRecentChats } from '../../hooks/chatbot/useRecent';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const { recentChats, loading, error, selectChat } = useRecentChats();
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = async (chat) => {
    setSelectedChat(chat);
    await selectChat(chat.chatHisNo);
    navigate(`/chat/${chat.categoryNo}/${chat.chatHisNo}/chat-history/recent-detail/${chat.userNo}/${chat.chatHisNo}`);
  };

  const handleViewAll = () => {
    console.log("View all clicked");
    navigate('/recent-chats');
  };
  
  return (
    <aside>
      <h2 className='category'>Category</h2>
      <Tabs orientation='vertical' variant='unstyled'>
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
                <img src={categoryOneImage} alt="My Image" className="image-class" />
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
                <img src={categoryTwoImage} alt="My Image" className="image-class" />
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
                <img src={categoryFourImage} alt="My Image" className="image-class" />
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
                <img src={categoryThreeImage} alt="My Image" className="image-class" />
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
                <ChatLegalVisaWindow />
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
                <ChatStudyProvider>
                  <ChatStudyWindow />
                </ChatStudyProvider>
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
                <ChatJobWindow />
              </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
      <h2 className='recent'>
        Recent
        <button className='view_all' onClick={handleViewAll}>
          view all  ---→
        </button>
      </h2>
      
      {loading && <p>Loading recent chats...</p>}
      {error && <p>Error: {error}</p>}
      
      {recentChats && recentChats.length > 0 ? (
        <ul className='recent-ul'>
          {recentChats.slice(0, 3).map((chat) => (
            <li key={chat.chatHisNo} onClick={() => handleChatSelect(chat)}>
              {chat.question}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent chats available.</p>
      )}
    </aside>
  )
}

export default Sidebar