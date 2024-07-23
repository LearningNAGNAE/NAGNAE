import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'

function TestList() {
  return (
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
  )
}

export default TestList