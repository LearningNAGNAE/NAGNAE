import React from 'react'
import { Link } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Flex } from '@chakra-ui/react'
import '../../assets/styles/chatbot/Sidebar.css';
import ChatLegalVisaWindow from '../chatbot/ChatLegalVisaWindow';
import ChatMedicalWindow from '../chatbot/ChatMedicalWindow';
import ChatEmploymentWindow from '../chatbot/ChatEmploymentWindow';

function Sidebar() {
  return (
    <aside>
      <h2>Category</h2>
      <Tabs orientation='vertical' variant='unstyled'>
        <Flex>
          <TabList width="200px" height="500px" marginRight="50px">
              <Tab>법률/비자</Tab>
              <Tab>의료</Tab>
              <Tab>취업</Tab>
          </TabList>
          <TabIndicator ml='-1.5px' width='2px' bg='blue.500' borderRadius='1px' />
          <TabPanels flex={1}>
              <TabPanel width="1000px" height="800px">
                <ChatLegalVisaWindow />
              </TabPanel>
              <TabPanel width="1000px" height="800px">
                <ChatMedicalWindow />
              </TabPanel>
              <TabPanel width="1000px" height="800px">
                <ChatEmploymentWindow />
              </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
      <h2>Recent</h2>
      <ul>
        <li>Liên quan đến Chương trình cấp phép việc làm</li>
        <li>Liên quan đến Chương trình cấp phép việc làm</li>
        <li>Liên quan đến Chương trình cấp phép việc làm</li>
      </ul>
      <a href="#">view all →</a>
    </aside>
  )
}

export default Sidebar