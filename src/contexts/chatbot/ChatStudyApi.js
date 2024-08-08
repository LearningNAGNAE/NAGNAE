import React, { createContext } from 'react';
import axios from 'axios';
import store from '../../redux/Store';
const PythonbaseUrl = store.getState().url.PythonbaseUrl;

export const ChatStudyApi = createContext();

export const ChatStudyProvider = ({ children }) => {

  const StudyChatBotData = async (data) => {
    console.log('Sending request data:', JSON.stringify(data));
    try {
      const StudyChatbotResponse = await axios.post(`${PythonbaseUrl}/study`, 
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Received response:', StudyChatbotResponse.data);
      return StudyChatbotResponse.data;
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      throw error;
    }
  };
  return (
    <ChatStudyApi.Provider value={{ StudyChatBotData }}>
        {children}
    </ChatStudyApi.Provider>
  );
  
};