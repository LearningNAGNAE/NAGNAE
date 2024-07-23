import React from 'react'
import { Link } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'

function Sidebar() {
  return (
    <aside>
      <h2>Category</h2>
      <Tabs position='relative' variant='unstyled'>
        <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
        </TabList>
        <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
        <TabPanels>
            <TabPanel>
                <p>one!</p>
                </TabPanel>
            <TabPanel>
                <p>two!</p>
            </TabPanel>
            <TabPanel>
                <p>three!</p>
            </TabPanel>
        </TabPanels>
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