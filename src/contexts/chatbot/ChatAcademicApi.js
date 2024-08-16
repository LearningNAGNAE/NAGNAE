import React, { createContext } from 'react';
import axios from 'axios';
import store from '../../redux/Store';
const PythonbaseUrl = store.getState().url.PythonbaseUrl;

export const ChatAcademicApi = createContext();

export const ChatAcademicProvider = ({ children }) => {

  const AcademicChatBotData = async (data) => {
    console.log('Sending request data:', JSON.stringify(data));
    try {
      const AcademicChatbotResponse = await axios.post(`${PythonbaseUrl}/academic`, 
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Received response:', AcademicChatbotResponse.data);
      return AcademicChatbotResponse.data;
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
    <ChatAcademicApi.Provider value={{ AcademicChatBotData }}>
        {children}
    </ChatAcademicApi.Provider>
  );
  
};