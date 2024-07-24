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
          <TabList width="200px">
              <Tab>One</Tab>
              <Tab>Two</Tab>
              <Tab>Three</Tab>
          </TabList>
          <TabIndicator ml='-1.5px' width='2px' bg='blue.500' borderRadius='1px' />
          <TabPanels flex={1}>
              <TabPanel>
                <ChatLegalVisaWindow />
              </TabPanel>
              <TabPanel>
                <ChatMedicalWindow />
              </TabPanel>
              <TabPanel>
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