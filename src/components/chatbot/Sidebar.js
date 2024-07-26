import React from 'react'
import { Link } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Flex } from '@chakra-ui/react'
import '../../assets/styles/chatbot/Sidebar.css';
import ChatLegalVisaWindow from '../chatbot/ChatLegalVisaWindow';
import ChatMedicalWindow from '../chatbot/ChatMedicalWindow';
import ChatEmploymentWindow from '../chatbot/ChatEmploymentWindow';
import homePageImage from '../../assets/images/homepageimg.jpg';

function Sidebar() {
  return (
    <aside>
      <h2 className='category'>Category</h2>
      <Tabs orientation='vertical' variant='unstyled'>
        <Flex height="300px">
          <TabList width="220px" marginRight="50px" >
              <Tab height="90px" paddingLeft="0px" textAlign="left" color="white" borderBottom="1px solid white"><img src={homePageImage} alt="My Image" className="image-class" />Multilingual Legal / Visa Assistant</Tab>
              <Tab height="90px" paddingLeft="0px" textAlign="left" color="white" borderBottom="1px solid white"><img src={homePageImage} alt="My Image" className="image-class" />Medical Information / Health Consultation Service</Tab>
              <Tab height="90px" paddingLeft="0px" textAlign="left" color="white" borderBottom="1px solid white"><img src={homePageImage} alt="My Image" className="image-class" />Employment / Academic Services</Tab>
          </TabList>
          <TabIndicator ml='-1.5px' width='2px' bg='blue.500' borderRadius='1px' />
          <TabPanels flex={1}>
              <TabPanel minWidth="1000px" height="670px" position="relative" bottom="90px" border="1px solid #554235" borderRadius="20px">
                <ChatLegalVisaWindow />
              </TabPanel>
              <TabPanel minWidth="1000px" height="670px" position="relative" bottom="90px" border="1px solid #554235" borderRadius="20px">
                <ChatMedicalWindow />
              </TabPanel>
              <TabPanel minWidth="1000px" height="670px" position="relative" bottom="90px" border="1px solid #554235" borderRadius="20px">
                <ChatEmploymentWindow />
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