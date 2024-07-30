import React from 'react'
import { Link } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Flex, Box } from '@chakra-ui/react'
import '../../assets/styles/chatbot/Sidebar.css';
import ChatLegalVisaWindow from '../chatbot/ChatLegalVisaWindow';
import ChatMedicalWindow from '../chatbot/ChatMedicalWindow';
import ChatStudyWindow from '../chatbot/ChatStudyWindow';
import ChatJobWindow from '../chatbot/ChatJobWindow';
import homePageImage from '../../assets/images/homepageimg.jpg';
import { ChatStudyProvider } from '../../contexts/chatbot/ChatStudyApi';

function Sidebar() {
  return (
    <aside>
      <h2 className='category'>Category</h2>
      <Tabs orientation='vertical' variant='unstyled'>
        <Flex direction={["column", "row"]} height={["auto", "300px"]}>
          <TabList width={["100%", "220px"]} marginRight={["0", "50px"]} marginBottom={["20px", "0"]}>
              <Tab display="flex" justifyContent="start" height="90px" paddingLeft="0px" textAlign="left" color="white" borderBottom="1px solid white"><img src={homePageImage} alt="My Image" className="image-class" />Multilingual Legal / Visa Assistant</Tab>
              <Tab display="flex" justifyContent="start" height="90px" paddingLeft="0px" textAlign="left" color="white" borderBottom="1px solid white"><img src={homePageImage} alt="My Image" className="image-class" />Medical Information / Health Consultation Service</Tab>
              <Tab display="flex" justifyContent="start" height="90px" paddingLeft="0px" textAlign="left" color="white" borderBottom="1px solid white"><img src={homePageImage} alt="My Image" className="image-class" />Academic Service</Tab>
              <Tab display="flex" justifyContent="start" height="90px" paddingLeft="0px" textAlign="left" color="white" borderBottom="1px solid white"><img src={homePageImage} alt="My Image" className="image-class" />Employment Service</Tab>
          </TabList>
          <TabIndicator ml='-1.5px' width='2px' bg='blue.500' borderRadius='1px' />
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
      <h2 className='recent'>Recent<button className='view_all'>view all  ---→</button></h2>
      <ul className='recent-ul'>
        <li>Liên quan đến Chương trình cấp phép việc làm</li>
        <li>Liên quan đến Chương trình cấp phép việc làm</li>
        <li>Liên quan đến Chương trình cấp phép việc làm</li>
      </ul>
    </aside>
  )
}

export default Sidebar